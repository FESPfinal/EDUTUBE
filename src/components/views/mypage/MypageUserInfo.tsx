'use client';

import ProfileImageUploader from '@/components/atom/ProfileImageUploader';
import useSelectUserInfo from '@/queries/mypage/useSelectUserInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

export const schema = yup.object().shape({
  name: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  nickname: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  address: yup.string(),
  phone: yup.string().matches(phoneRegExp, '010-0000-0000 형식으로 작성해주세요.'),
  contactEmail: yup.string().email('이메일 형식이 잘못되었습니다.').required('email is required'),
  major: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const ADDRESS_LIST = ['지역1', '지역2', '지역3', '지역4', '지역5', '지역6', '지역7'];
const MAJOR_LIST = ['직무1', '직무2', '직무3', '직무4', '직무5', '직무6', '직무7'];

const MypageUserInfo = () => {
  const { data: userInfo } = useSelectUserInfo();
  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ resolver: yupResolver(schema), defaultValues: async () => userInfo });

  useEffect(() => {
    if (!!userInfo) {
      setValue('name', userInfo.name);
      setValue('nickname', userInfo.nickname);
      setValue('address', userInfo.address);
      setValue('phone', userInfo.phone);
      setValue('contactEmail', userInfo.contactEmail);
      setValue('major', userInfo.major);
    }
  }, [setValue, userInfo]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert('수정기능 구현 중입니다.');
  };

  return (
    <>
      <div className="mb-10">
        <ProfileImageUploader onImageUpload={setImageFile} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-sm font-medium text-gray-700 ">
          이름
          <div className="flex items-center">
            <input
              type="text"
              placeholder="김에듀"
              {...register('name', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.name?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700 ">
          닉네임
          <div className="flex items-center">
            <input
              type="text"
              placeholder="nickname"
              {...register('nickname', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.nickname?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700 ">
          연락처
          <div className="flex items-center">
            <input
              type="text"
              placeholder="010-0000-0000"
              {...register('phone', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.phone?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700 ">
          연락 이메일
          <div className="flex items-center">
            <input
              type="text"
              placeholder="example@email.com"
              {...register('contactEmail', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.contactEmail?.message}</p>
        </label>
        <select {...register('address')}>
          {ADDRESS_LIST.map(locale =>
            locale === userInfo?.address ? (
              <option key={locale} value={locale} selected>
                {locale}
              </option>
            ) : (
              <option key={locale} value={locale}>
                {locale}
              </option>
            ),
          )}
        </select>
        <select {...register('major')}>
          {MAJOR_LIST.map(major =>
            major === userInfo?.extra?.major ? (
              <option key={major} value={major} selected>
                {major}
              </option>
            ) : (
              <option key={major} value={major}>
                {major}
              </option>
            ),
          )}
        </select>
        <button
          type="submit"
          className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none"
        >
          수정 완료
        </button>
      </form>
    </>
  );
};
export default MypageUserInfo;
