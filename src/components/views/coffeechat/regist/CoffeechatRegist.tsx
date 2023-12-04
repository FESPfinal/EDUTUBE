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

const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.').min(10, '내용은 최소 10자 이상이어야 합니다.'),
  intro: yup.string().required('소개글을 입력해주세요.'),
  // 장소입력
  date: yup.date().required('날짜를 입력해주세요.'),
  time: yup.date().required('시간을 입력해주세요.'),
  maxParticipants: yup.number().required('최대 인원 수를 입력해주세요.').typeError('숫자를 입력하세요.'),
  price: yup.number().required('가격을 입력해주세요.').typeError('숫자를 입력하세요.')
})

type FormData = yup.InferType<typeof schema>;

const PLACE_TYPE = 'placeType';

const CoffeechatRegist = () => {
  const { register, handleSubmit, control, formState: { errors }, } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { mutate: mutateCreateProduct, data } = tempUseCreateProduct();
  const [placeType, setPlaceType] = useState(PLACE_TYPES.ONLINE);

  const handlePlaceType = (type: string) => {
    setPlaceType(type);
  }

  const onSubmit = (data: FormData) => {
    const requestBody: tempProductType = {
      mainImages: [],
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
        date: data.date,
        time: data.time,
      },
    }
    console.log(`req`, requestBody)
    mutateCreateProduct(requestBody, {
      onSuccess: data => {
        alert('등록되었습니다');
        router.push('/coffeechat');
      },
      onError: error => {
        alert(`등록에 실패하였습니다${error.message}`);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-16">
      {/* 이미지 업로드 */}
      <div className="mb-4">
        <label className="block text-gray-700">이미지 업로드
          <input
            type="file"
            accept="image/*"
            {...register("image")} // 이미지 파일을 "image"라는 이름으로 등록
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>
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
        {errors.image && <p className="text-red-500 text-sm">{errors.intro?.message}</p>}
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
      </div>
      {/* 날짜등록 */}
      <div className="mb-4">
        <label className="block text-gray-700">날짜 등록
          <input
            type="date"
            {...register("date")}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
        {errors?.date && <p className="text-red-500 text-sm">날짜를 입력해주세요.</p>}
      </div>
      {/* 시간등록 */}
      <div className="mb-4">
        <label className="block text-gray-700">시간 등록
          <Controller
            name="time"
            control={control}
            defaultValue=""
            render={({ field }: { field: UseFormRegisterReturn }) => (
              <DatePicker
                selected={field.value as Date}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="w-full p-2 border rounded"
              />
            )}
          />
        </label>
        {errors.time && <p className="text-red-500 text-sm">시간을 입력해주세요</p>}
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
        {errors.maxParticipants && <p className="text-red-500 text-sm">{errors.numericValue.message}</p>}
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
  )

}

export default CoffeechatRegist;