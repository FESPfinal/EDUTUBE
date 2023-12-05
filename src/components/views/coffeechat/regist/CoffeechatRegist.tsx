'use client'
import { useForm, Controller, UseFormRegisterReturn } from "react-hook-form";
import * as yup from 'yup';
import React, { useState } from "react";
import Radio from '@/components/atom/Radio';
import { PLACE_TYPES } from '@/helper/constants/placeConst'
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import tempUseCreateProduct from '@/queries/coffeechat/tempUseCreateProduct';
import { useRouter } from 'next/navigation';
import { tempProductType } from '@/helper/types/tempProduct';
import useCreateFile from '@/queries/common/useCreateFile';
import ProfileImageUploader from '@/components/atom/ProfileImageUploader';

const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.').max(30, '최대 30자까지 입력 가능합니다.'),
  content: yup.string().required('내용을 입력해주세요.').min(10, '내용은 최소 10자 이상이어야 합니다.').max(500, '최대 500자까지 입력 가능합니다.'),
  intro: yup.string().required('소개글을 입력해주세요.').max(50, '최대 50자까지 입력 가능합니다.'),
  datetime: yup.array().of(
    yup.object().shape({
      date: yup.date().required('날짜를 선택해주세요.'),
      time: yup.date().required('시간을 선택해주세요.'),
    })
  ).required('하나 이상의 날짜 및 시간을 추가해주세요.'),
  maxParticipants: yup.number().required('최대 인원 수를 입력해주세요.').min(1, '최소 1명 이상이어야 합니다.').typeError('숫자를 입력하세요.'),
  price: yup.number().required('가격을 입력해주세요.').min(0, '최소 가격은 0 이어야 합니다.').typeError('숫자를 입력하세요.'),
})

type RegistFormData = yup.InferType<typeof schema>;

const PLACE_TYPE = 'placeType';

const CoffeechatRegist = () => {
  const { register, handleSubmit, control, formState: { errors }, } = useForm<RegistFormData>({
    resolver: yupResolver(schema),
  });
  const { mutate: mutateCreateProduct } = tempUseCreateProduct();
  const { mutate: createImageMutate } = useCreateFile();

  const [placeType, setPlaceType] = useState(PLACE_TYPES.ONLINE);
  const [datetime, setDatetime] = useState<{ date: Date, time: Date }[]>([]);
  const [imageFile, setImageFile] = useState<File>();


  const router = useRouter();

  const handlePlaceType = (type: string) => {
    setPlaceType(type);
  }

  const handleAddDatetime = (event: React.MouseEvent) => {
    event.preventDefault();
    setDatetime([...datetime, { date: new Date(), time: new Date() }]);
  }

  const handleRemoveDatetime = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newDatetime = [...datetime];
    newDatetime.splice(index, 1);
    setDatetime(newDatetime);
  }

  const createProduct = (data: RegistFormData, fileName: string) => {
    const requestBody: tempProductType = {
      mainImages: [fileName],
      name: data.name,
      content: data.content,
      price: data.price,
      shippingFees: 0,
      show: true,
      active: true,
      quantity: data.maxParticipants,
      extra: {
        intro: data.intro,
        place: placeType,
        online: data.onlinePlace,
        offline: data.offlinePlace,
        datetime: datetime
      },
    }
    mutateCreateProduct(requestBody, {
      onSuccess: () => {
        alert('등록되었습니다');
        router.push('/coffeechat');
      },
      onError: error => {
        alert(`등록에 실패하였습니다${error.message}`);
      },
    });
  }

  const onSubmit = (data: RegistFormData) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('attach', imageFile);
      createImageMutate(formData, {
        onSuccess: (fileName: { name: string, path: string }) => {
          createProduct(data, fileName.path);
        }, onError: () => {
          alert('이미지 업로드가 실패하였습니다.')
        }
      })
    } else {
      alert('이미지를 등록해주세요.')
    }
  }

  return (
    <>
      {/* 이미지 업로드 */}
      <div className="mb-4">
        <label className="block text-gray-700">이미지 업로드
          <ProfileImageUploader onImageUpload={setImageFile} />
        </label>
        {/* {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>} */}
      </div >
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-16">
        {/* 제목 */}
        <div className="mb-4">
          <label className="block text-gray-700">제목
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              {...register("name", { required: "제목은 필수 입력입니다." })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        {/* 내용 */}
        <div className="mb-4">
          <label className="block text-gray-700">내용
            <input
              type="text"
              placeholder="내용을 입력해주세요"
              {...register("content", {
                required: "내용은 필수 입력입니다.",
                minLength: { value: 10, message: "내용은 최소 10자 이상이어야 합니다." }
              })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        {/* 카테고리 */}
        {/* 소개글 */}
        <div className="mb-4">
          <label className="block text-gray-700">소개글
            <input
              type="text"
              placeholder="소개글을 입력해주세요"
              {...register("intro", { required: "소개글은 필수 입력입니다." })}
              className="mt-1 p-2 border rounded w-full"
            />
          </label>
          {errors.intro && <p className="text-red-500 text-sm">{errors.intro?.message}</p>}
        </div>
        {/* 장소 등록 */}
        <div className="mb-4">
          <Radio value={PLACE_TYPES.ONLINE} name={PLACE_TYPE} defaultChecked onClick={handlePlaceType}>온라인</Radio>
          <Radio value={PLACE_TYPES.OFFLINE} name={PLACE_TYPE} onClick={handlePlaceType}>오프라인</Radio>
          {placeType === PLACE_TYPES.ONLINE ?
            <label className="block text-gray-700">온라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                {...register("onlinePlace")}
                className="mt-1 p-2 border rounded w-full"
              />
            </label> :
            <label className="block text-gray-700">오프라인 장소 등록
              <input
                type="text"
                placeholder="주소를 입력해주세요."
                {...register("offlinePlace")}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>}
          {errors.onlinePlace && <p className="text-red-500 text-sm">{errors.onlinePlace.message}</p>}{
            errors.offlinePlace && <p className="text-red-500 text-sm">{errors.offlinePlace.message}</p>
          }

        </div>
        {/* 날짜 및 시간 등록 */}
        <div className="mb-4">
          <label className="block text-gray-700">날짜 및 시간 등록</label>
          {datetime.map((dt, index) => (
            <div key={index} className="flex items-center mb-2">
              <Controller
                control={control}
                name={`datetime.${index}.date`}
                defaultValue={dt.date}
                render={({ field }) => (
                  <DatePicker
                    selected={dt.date}
                    onChange={(newDate) => {
                      const newDatetime = [...datetime];
                      newDatetime[index].date = newDate as Date;
                      setDatetime(newDatetime);
                      field.onChange(newDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                    className="mr-2 p-2 border rounded"
                  />
                )}
              />
              <Controller
                control={control}
                name={`datetime.${index}.time`}
                defaultValue={dt.time}
                render={({ field }) => (
                  <DatePicker
                    selected={dt.time}
                    onChange={(newTime) => {
                      const newDatetime = [...datetime];
                      newDatetime[index].time = newTime as Date;
                      setDatetime(newDatetime);
                      field.onChange(newTime);
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

              <button type="button" onClick={(event: React.MouseEvent) => handleRemoveDatetime(index, event)} className="ml-2 text-red-500">삭제</button>
            </div>
          ))}
          {errors.datetime && <p className="text-red-500 text-sm">{errors.datetime.message}</p>}
          <button type="button" onClick={(event: React.MouseEvent) => handleAddDatetime(event)} className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">날짜 및 시간 추가</button>
        </div>
        {/* 참여인원 */}
        <div className="mb-4">
          <label className="block text-gray-700">참여인원
            <Controller
              name="maxParticipants"
              control={control}
              defaultValue="1"
              render={({ field }: { field: UseFormRegisterReturn }) => (
                <input
                  type="number"
                  {...field}
                  className="mt-1 p-2 border rounded w-full"
                />
              )}

            />
          </label>
          {errors.maxParticipants && <p className="text-red-500 text-sm">{errors.maxParticipants.message}</p>}
        </div>
        {/* 가격 */}
        <div className="mb-4">
          <label className="block text-gray-700">가격
            <Controller
              name="price"
              control={control}
              defaultValue="0"
              render={({ field }: { field: UseFormRegisterReturn }) => (
                <input
                  type="number"
                  {...field}
                  className="mt-1 p-2 border rounded w-full"
                />
              )}
            />
          </label>
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        {/* <SubmitButton content="등록하기" /> */}
        <button type="submit" className="bg-light-main hover:bg-dark-main text-white p-2 rounded  w-full" >등록</button>
      </form>
    </>
  )

}

export default CoffeechatRegist;