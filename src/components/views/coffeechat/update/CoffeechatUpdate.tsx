'use client';
import React, { useState } from 'react';
// component
import Category from '@/components/atom/Category';
import ImageUploader from '@/components/atom/ImageUploader';
import Radio from '@/components/atom/Radio';
// helper
import { jobCategoryConst, regionCategoryConst } from '@/helper/constants/categoryConst';
import { PLACE_TYPES } from '@/helper/constants/placeConst';
// queries
import useUpdateCoffeechat, {
  UpdateResponseData,
} from '@/queries/coffeechat/update/useUpdateCoffeechat';
import useCreateFile from '@/queries/common/useCreateFile';
import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
// library
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm, UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';
import useUserInfo from '@/stores/userInfo';
import { useParams, useRouter } from 'next/navigation';
import { formatDate, formatTime } from '@/helper/utils/datetime';

const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.').max(30, '최대 30자까지 입력 가능합니다.'),
  content: yup
    .string()
    .required('내용을 입력해주세요.')
    .min(10, '내용은 최소 10자 이상이어야 합니다.')
    .max(500, '최대 500자까지 입력 가능합니다.'),
  intro: yup.string().required('소개글을 입력해주세요.').max(50, '최대 50자까지 입력 가능합니다.'),
  price: yup
    .number()
    .required('가격을 입력해주세요.')
    .min(0, '최소 가격은 0 이어야 합니다.')
    .typeError('숫자를 입력하세요.'),
});

type RegistFormData = yup.InferType<typeof schema>;
type RegistFormDataExtend = {
  online: string;
  offline: string;
  onlinePlace: string;
  offlinePlace: string;
} & RegistFormData;

const PLACE_TYPE = 'placeType';

const CoffeechatUpdate = () => {
  const router = useRouter();
  const params = useParams();
  const _id = params?._id as string;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistFormData>({
    resolver: yupResolver(schema),
  });
  const { mutate: mutateUpdateCoffeechat } = useUpdateCoffeechat();
  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);
  const { mutate: createImageMutate } = useCreateFile();
  const { userInfo } = useUserInfo(store => store);
  const [placeType, setPlaceType] = useState(`${coffeechatDetailData?.extra.place}`);
  const [imageFile, setImageFile] = useState<File>();
  const [selectedJobCategory, setSelectedJobCategory] = useState<string[]>([`${coffeechatDetailData?.extra.jobCategory[0]}`]);
  const [selectedRegionCategory, setSelectedRegionCategory] = useState(`${coffeechatDetailData?.extra.regionCategory}`);

  const handlePlaceType = (type: string) => {
    setPlaceType(type);
  };

  const updateParentsProduct = ({ formSubmitData, fileName }: { formSubmitData: RegistFormData; fileName: string }) => {
    const updateData = {
      mainImages: [fileName],
      name: formSubmitData.name,
      content: formSubmitData.content,
      price: formSubmitData.price,
      shippingFees: 0,
      show: true,
      active: true,
      extra: {
        intro: formSubmitData.intro,
        place: placeType,
        online: coffeechatDetailData?.extra?.online || '',
        offline: coffeechatDetailData?.extra?.offline || '',
        datetimeList: coffeechatDetailData?.extra?.datetimeList,
        author: userInfo.extra.nickname,
        authorImage: userInfo.extra.profileImage.path,
        jobCategory: selectedJobCategory,
        regionCategory: selectedRegionCategory,
        productType: 'parents',
        depth: 1
      }
    }
    mutateUpdateCoffeechat({ updateData, _id }, {
      onSuccess: () => {
        alert('성공')
      },
      onError: error => {
        alert(`${error.message}`)
      }
    })
  }

  const onSubmit = (data: RegistFormData) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('attach', imageFile);
      alert('여기 통과')
      createImageMutate(formData, {
        onSuccess: (fileName: { name: string; path: string }) => {
          const imagePath = fileName.path;
          console.log('path>>>>', imagePath);
          updateParentsProduct({ formSubmitData: data, fileName: imagePath });
          console.log('forSubmitData', data)
        },
        onError: error => {
          console.log('error>>>>', error);
          alert('이미지 업로드가 실패하였습니다.');
        },
      });
    } else {
      coffeechatDetailData?.mainImages[0] && updateParentsProduct({ formSubmitData: data, fileName: coffeechatDetailData.mainImages[0] })
      alert('이미지 그대로')
    }
  };
  return (
    <div className="max-w-md mx-auto my-16">
      {/* 이미지 업로드 */}
      <div className="mb-4">
        <label className="block text-gray-700">
          이미지 업로드
          <ImageUploader onImageUpload={setImageFile} defaultImage={coffeechatDetailData?.mainImages[0]} />
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
              defaultValue={coffeechatDetailData?.name}
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
              defaultValue={coffeechatDetailData?.content}
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
                disabled={true}
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
                disabled={true}
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
              defaultValue={coffeechatDetailData?.extra?.intro}
            />
          </label>
          {errors.intro && <p className="text-red-500 text-sm">{errors.intro?.message}</p>}
        </div>
        {/* 장소 등록 */}
        <div className="mb-4">
          <Radio
            value={PLACE_TYPES.ONLINE}
            name={PLACE_TYPE}
            onClick={handlePlaceType}
            disabled={true}
          >
            온라인
          </Radio>
          <Radio value={PLACE_TYPES.OFFLINE} name={PLACE_TYPE} onClick={handlePlaceType} disabled={true}>
            오프라인
          </Radio>
          {placeType === PLACE_TYPES.ONLINE ? (
            <label className="block text-gray-700">
              온라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                className="mt-1 p-2 border rounded w-full bg-gray-200 text-gray-500"
                defaultValue={coffeechatDetailData?.extra?.online}
                disabled={true}
              />
            </label>
          ) : (
            <label className="block text-gray-700">
              오프라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                className="mt-1 p-2 border rounded w-full bg-gray-200 text-gray-500"
                defaultValue={coffeechatDetailData?.extra?.offline}
                disabled={true}
              />
            </label>
          )}
        </div>
        {/* 날짜 및 시간 등록 */}
        <div className="mb-4">
          <label className="block text-gray-700">날짜 및 시간 등록</label>
          <div className="flex gap-2 flex-wrap mb-6 mt-6">
            {coffeechatDetailData?.options?.item
              .map((item, index: number) => (
                <p
                  key={index}
                  className={` border-2 border-solid border-gray-400 rounded-lg p-2 minWidth-48 flex bg-gray-200 `}
                >
                  <p
                    className={`text-gray-700 leading-6 mr-2 text-gray-400 
                      `}
                  >
                    {formatDate(item.extra.datetime.date)}&nbsp;
                  </p>
                  <p
                    className={`text-gray-700 leading-6 text-gray-400
                      `}
                  >
                    {formatTime(item.extra.datetime.time)}
                  </p>
                </p>
              ))}
          </div>
          {/* [TODO] 날짜 시간 유효성 검사 수정 */}
        </div>
        {/* 가격 */}
        <div className="mb-4">
          <label className="block text-gray-700">
            가격
            <Controller
              name="price"
              control={control}
              defaultValue={coffeechatDetailData?.price}
              render={({ field }) => (
                <input type="number" {...field} className="mt-1 p-2 border rounded w-full" />
              )}
            />
          </label>
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-light-main hover:bg-dark-main text-white p-2 rounded  w-full"
        >
          등록
        </button>
      </form>
    </div>
  )
}
export default CoffeechatUpdate;