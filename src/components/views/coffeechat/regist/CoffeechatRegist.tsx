'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// component
import Category from '@/components/atom/Category';
import ImageUploader from '@/components/atom/ImageUploader';
import Radio from '@/components/atom/Radio';
// helper
import { jobCategoryConst, regionCategoryConst } from '@/helper/constants/categoryConst';
import { PLACE_TYPES } from '@/helper/constants/placeConst';
import { TempChildProduct, TempParentsProduct } from '@/helper/types/tempProduct';
// queries
import tempUseCreateProduct, {
  ProductResponseData,
} from '@/queries/coffeechat/tempUseCreateProduct';
import useCreateFile from '@/queries/common/useCreateFile';
// library
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm, UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';
import useUserInfo from '@/stores/userInfo';

const datetimeSchema = yup.object().shape({
  date: yup.date().required('날짜를 선택해주세요.'),
  time: yup.date().required('시간을 선택해주세요.'),
});

const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.').max(30, '최대 30자까지 입력 가능합니다.'),
  content: yup
    .string()
    .required('내용을 입력해주세요.')
    .min(10, '내용은 최소 10자 이상이어야 합니다.')
    .max(500, '최대 500자까지 입력 가능합니다.'),
  intro: yup.string().required('소개글을 입력해주세요.').max(50, '최대 50자까지 입력 가능합니다.'),
  datetimeList: yup.array().of(datetimeSchema).required('하나 이상의 날짜 및 시간을 추가해주세요.'),
  price: yup
    .number()
    .required('가격을 입력해주세요.')
    .min(0, '최소 가격은 0 이어야 합니다.')
    .typeError('숫자를 입력하세요.'),
  online: yup.string(),
  offline: yup.string(),
  onlinePlace: yup.string(),
  offlinePlace: yup.string(),
});

type RegistFormData = yup.InferType<typeof schema>;
type RegistFormDataExtend = {
  online: string;
  offline: string;
  onlinePlace: string;
  offlinePlace: string;
} & RegistFormData;

const PLACE_TYPE = 'placeType';

const CoffeechatRegist = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistFormData>({
    resolver: yupResolver(schema),
  });
  const { mutate: mutateCreateProduct, isPending: isPendingCreateProduct } = tempUseCreateProduct();
  const { mutate: createImageMutate } = useCreateFile();
  const { userInfo } = useUserInfo(store => store);
  const [placeType, setPlaceType] = useState(PLACE_TYPES.ONLINE);
  const [datetimeList, setDatetimeList] = useState<{ date: Date; time: Date }[]>([]);
  const [imageFile, setImageFile] = useState<File>();
  const [selectedJobCategory, setSelectedJobCategory] = useState<string[]>([]);
  const [selectedRegionCategory, setSelectedRegionCategory] = useState('');

  const handlePlaceType = (type: string) => {
    setPlaceType(type);
  };

  const handleAddDatetime = (event: React.MouseEvent) => {
    event.preventDefault();
    setDatetimeList([...datetimeList, { date: new Date(), time: new Date() }]);
  };

  const handleRemoveDatetime = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newDatetime = [...datetimeList];
    newDatetime.splice(index, 1);
    setDatetimeList(newDatetime);
  };

  const createChildProduct = (
    data: ProductResponseData,
    formSubmitData: RegistFormData,
    fileName: string,
    date: { date: Date; time: Date },
  ) => {
    const requestBody: TempChildProduct = {
      mainImages: [fileName],
      name: formSubmitData.name,
      content: JSON.stringify(date), //datetime
      price: formSubmitData.price,
      shippingFees: 0,
      show: true,
      active: true,
      quantity: 1,
      buyQuantity: 0,
      extra: {
        intro: formSubmitData.intro,
        place: placeType,
        online: formSubmitData.online || '',
        offline: formSubmitData.offline || '',
        datetime: date,
        author: userInfo.extra.nickname,
        type: 'coffeechat',
        jobCategory: selectedJobCategory,
        regionCategory: selectedRegionCategory,
        productType: 'child',
        depth: 2,
        parent: data._id,
      },
    };
    mutateCreateProduct(requestBody, {
      onSuccess: () => {
        alert('등록되었습니다');
        router.push('/coffeechat');
      },
      onError: error => {
        alert(`child 등록에 실패하였습니다${error.message}`);
      },
    });
  };

  const createParentsProduct = ({
    formSubmitData,
    fileName,
  }: {
    formSubmitData: RegistFormData;
    fileName: string;
  }) => {
    const requestBody: TempParentsProduct = {
      mainImages: [fileName],
      name: formSubmitData.name,
      content: formSubmitData.content,
      price: formSubmitData.price,
      shippingFees: 0,
      show: true,
      active: true,
      quantity: datetimeList.length,
      buyQuantity: 0,
      extra: {
        intro: formSubmitData.intro,
        place: placeType,
        online: formSubmitData.onlinePlace || '',
        offline: formSubmitData.offlinePlace || '',
        datetimeList: datetimeList,
        author: userInfo.extra.nickname,
        authorImage: userInfo.extra.profileImage?.path,
        type: 'coffeechat',
        jobCategory: selectedJobCategory,
        regionCategory: selectedRegionCategory,
        productType: 'parents',
        depth: 1,
      },
    };
    mutateCreateProduct(requestBody, {
      onSuccess: (data: ProductResponseData) => {
        datetimeList.map(date => createChildProduct(data, formSubmitData, fileName, date));
      },
      onError: error => {
        alert(`parents 등록에 실패하였습니다${error.message}`);
      },
    });
  };

  const onSubmit = (data: RegistFormData) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('attach', imageFile);
      createImageMutate(formData, {
        onSuccess: response => {
          const imagePath = response.path;
          createParentsProduct({ formSubmitData: data, fileName: imagePath });
        },
        onError: error => {
          alert('이미지 업로드가 실패하였습니다.');
        },
      });
    } else {
      alert('이미지를 등록해주세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16">
      {/* 이미지 업로드 */}
      <div className="mb-4">
        <label className="block text-gray-700">
          이미지 업로드
          <ImageUploader onImageUpload={setImageFile} />
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 제목 */}
        <div className="mb-4">
          <label className="block text-gray-700">
            제목
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              {...register('name', { required: '제목은 필수 입력입니다.' })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        {/* 내용 */}
        <div className="mb-4">
          <label className="block text-gray-700">
            내용
            <input
              type="text"
              placeholder="내용을 입력해주세요"
              {...register('content', {
                required: '내용은 필수 입력입니다.',
                minLength: { value: 10, message: '내용은 최소 10자 이상이어야 합니다.' },
              })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        {/* 카테고리 */}
        <div className="mb-4">
          <label className="block text-gray-700">직무 카테고리 선택</label>
          <div className="flex mt-2 flex-wrap gap-2 ">
            {jobCategoryConst.map(category => (
              <Category
                key={category}
                name={category}
                setSelectedCategory={({ name }) => {
                  selectedJobCategory[0] == name
                    ? setSelectedJobCategory([])
                    : setSelectedJobCategory([name]);
                }}
                selectedCategory={selectedJobCategory[0]}
              />
            ))}
          </div>
          {/* [TODO] 카테고리 유효성 검사 추가 */}
        </div>
        {/* 지역 카테고리 */}
        <div className="mb-4">
          <label className="block text-gray-700">지역 카테고리 선택</label>
          <div className="flex mt-2 flex-wrap gap-2 ">
            {regionCategoryConst.map(category => (
              <Category
                key={category}
                name={category}
                setSelectedCategory={({ name }) => {
                  selectedRegionCategory == name
                    ? setSelectedRegionCategory('')
                    : setSelectedRegionCategory(name);
                }}
                selectedCategory={selectedRegionCategory}
              />
            ))}
          </div>
          {/* [TODO] 카테고리 유효성 검사 추가 */}
        </div>
        {/* 소개글 */}
        <div className="mb-4">
          <label className="block text-gray-700">
            소개글
            <input
              type="text"
              placeholder="소개글을 입력해주세요"
              {...register('intro', { required: '소개글은 필수 입력입니다.' })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.intro && <p className="text-red-500 text-sm">{errors.intro?.message}</p>}
        </div>
        {/* 장소 등록 */}
        <div className="mb-4">
          <Radio
            value={PLACE_TYPES.ONLINE}
            name={PLACE_TYPE}
            defaultChecked
            onClick={handlePlaceType}
          >
            온라인
          </Radio>
          <Radio value={PLACE_TYPES.OFFLINE} name={PLACE_TYPE} onClick={handlePlaceType}>
            오프라인
          </Radio>
          {placeType === PLACE_TYPES.ONLINE ? (
            <label className="block text-gray-700">
              온라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                {...register('onlinePlace')}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          ) : (
            <label className="block text-gray-700">
              오프라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                {...register('offlinePlace')}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          )}
          {errors.onlinePlace && (
            <p className="text-red-500 text-sm">{errors.onlinePlace.message}</p>
          )}
          {errors.offlinePlace && (
            <p className="text-red-500 text-sm">{errors.offlinePlace.message}</p>
          )}
        </div>
        {/* 날짜 및 시간 등록 */}
        <div className="mb-4">
          <label className="block text-gray-700">날짜 및 시간 등록</label>
          {datetimeList.map((dt, index) => (
            <div key={index} className="flex items-center mb-2">
              <Controller
                control={control}
                name={`datetimeList.${index}.date`}
                defaultValue={dt.date}
                render={() => (
                  <DatePicker
                    selected={dt.date}
                    onChange={newDate => {
                      const newDatetime = [...datetimeList];
                      newDatetime[index].date = newDate as Date;
                      setDatetimeList(newDatetime);
                    }}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                    className="mr-2 p-2 border rounded"
                  />
                )}
              />
              <Controller
                control={control}
                name={`datetimeList.${index}.time`}
                defaultValue={dt.time}
                render={() => (
                  <DatePicker
                    selected={dt.time}
                    onChange={newTime => {
                      const newDatetime = [...datetimeList];
                      newDatetime[index].time = newTime as Date;
                      setDatetimeList(newDatetime);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    placeholderText="시간을 선택하세요"
                    className="p-2 border rounded"
                  />
                )}
              />
              <button
                type="button"
                onClick={(event: React.MouseEvent) => handleRemoveDatetime(index, event)}
                className="ml-2 text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
          {/* [TODO] 날짜 시간 유효성 검사 수정 */}
          {errors.datetimeList && (
            <p className="text-red-500 text-sm">{errors.datetimeList.message}</p>
          )}
          <button
            type="button"
            onClick={(event: React.MouseEvent) => handleAddDatetime(event)}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            날짜 및 시간 추가
          </button>
        </div>
        {/* 가격 */}
        <div className="mb-4">
          <label className="block text-gray-700">
            가격
            <Controller
              name="price"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <input type="number" {...field} className="mt-1 p-2 border rounded w-full" />
              )}
            />
          </label>
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-light-main hover:bg-dark-main text-white p-2 rounded  w-full disabled:bg-dark-disabled"
          disabled={isPendingCreateProduct}
        >
          {isPendingCreateProduct ? '등록 중입니다...' : '등록'}
        </button>
      </form>
    </div>
  );
};

export default CoffeechatRegist;
