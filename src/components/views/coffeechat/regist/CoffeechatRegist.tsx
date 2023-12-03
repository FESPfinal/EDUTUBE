'use client'
import { useForm, Controller } from "react-hook-form";
import { FieldValues, FieldPathValue, UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';
import React, { useState } from "react";
import Radio from '@/components/atom/Radio';
import { PLACE_TYPES } from '@/helper/constants/placeConst'
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import SubmitButton from "@/components/atom/Button";
import useCreateProduct from '@/queries/coffeechat/useCreateProduct';
import useGetUserInfo from '@/queries/coffeechat/useGetUserInfo';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('제목을 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.'),
  intro: yup.string().required('소개글을 입력해주세요.'),
  // 장소입력
  date: yup.date().required('날짜를 입력해주세요.'),
  time: yup.date().required('시간을 입력해주세요.'),
  maxParticipants: yup.number().required('최대 인원 수를 입력해주세요.').typeError('숫자를 입력하세요.'),
  price: yup.number().required('가격을 입력해주세요.').typeError('숫자를 입력하세요.')
})



const PLACE_TYPE = 'placeType';

const CoffeechatRegist = () => {
  const { register, handleSubmit, control, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { mutate: mutateCreateProduct } = useCreateProduct();
  const [placeType, setPlaceType] = useState(PLACE_TYPES.OFFLINE);

  const handlePlaceType = (type: string) => {
    setPlaceType(type);
  }

  const onSubmit = (data: FormData) => {

    mutateCreateProduct(data, {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 제목 */}
      <div>
        <label>제목
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            {...register("name", { required: "제목은 필수 입력입니다." })}
          />
        </label>
        <p>{errors.name?.message}</p>
      </div>
      {/* 내용 */}
      <div>
        <label>내용
          <input
            type="text"
            placeholder="내용을 입력해주세요"
            {...register("content", { required: "내용은 필수 입력입니다." })}
          />
        </label>
        <p>{errors.content?.message}</p>
      </div>
      {/* 카테고리 */}
      {/* 소개글 */}
      <div>
        <label>소개글
          <input
            type="text"
            placeholder="소개글을 입력해주세요"
            {...register("intro", { required: "소개글은 필수 입력입니다." })}
          />
        </label>
        <p>{errors.intro?.message}</p>
      </div>
      {/* 장소 등록 */}
      <div>
        <Radio value={PLACE_TYPES.ONLINE} name={PLACE_TYPE} defaultChecked onClick={handlePlaceType}>온라인</Radio>
        <Radio value={PLACE_TYPES.OFFLINE} name={PLACE_TYPE} onClick={handlePlaceType}>오프라인</Radio>
        {placeType == 'online' ?
          <label>온라인 장소 등록
            <input
              type="text"
              placeholder="온라인 장소 주소를 입력해주세요."
              {...register("onlinePlace")}
            />
          </label> :
          <label>오프라인 장소 등록
            <input
              type="text"
              placeholder="오프라인 장소 주소를 입력해주세요."
              {...register("offlinePlace")}
            />
          </label>}
      </div>
      {/* 날짜등록 */}
      <div>
        <label>날짜 등록
          <input
            type="date"
            {...register("date")}
          />
        </label>
        <p>{errors.date?.message}</p>
      </div>
      {/* 시간등록 */}
      <div>
        <label>시간 등록
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
        {errors.time && <p>{errors.date?.message}</p>}
      </div>
      {/* 참여인원 */}
      <div>
        <label>참여인원
          <Controller
            name="maxParticipants"
            control={control}
            defaultValue="1"
            render={({ field }: { field: UseFormRegisterReturn }) => (
              <input
                type="number"
                {...field}
              />
            )}
          />
        </label>
        {errors.maxParticipants && <p>{errors.numericValue.message}</p>}
      </div>
      {/* 가격 */}
      <div>
        <label>가격
          <Controller
            name="price"
            control={control}
            defaultValue="0"
            render={({ field }: { field: UseFormRegisterReturn }) => (
              <input
                type="number"
                {...field}
              />
            )}
          />
        </label>
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <button type="submit">등록하기</button>
    </form>
  )

}

export default CoffeechatRegist;