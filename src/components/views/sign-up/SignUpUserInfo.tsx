'use client';

import ProfileImageUploader from '@/components/atom/ProfileImageUploader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Step2UserData } from './types';
import { USER_TYPES } from './consts';

const schema = yup.object().shape({
  name: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  nickname: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  address: yup.string(),
  contactEmail: yup.string().email('이메일 형식이 잘못되었습니다.').required('email is required'),
  major: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const ADDRESS_LIST = ['지역1', '지역2', '지역3', '지역4', '지역5', '지역6', '지역7'];
const MAJOR_LIST = ['직무1', '직무2', '직무3', '직무4', '직무5', '직무6', '직무7'];

interface Props {
  finStep: (data: Step2UserData) => void;
}

const SignUpUserInfo = ({ finStep }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    finStep({
      type: USER_TYPES.USER,
      name: data.name,
      nickname: data.nickname,
      address: data.address || '',
      contactEmail: data.contactEmail,
      major: data.major || '',
    });
  };

  return (
    <>
      <div className="text-center">
        <p className="text-2xl">회원가입</p>
        <p>프로필 설정</p>
      </div>
      {/* <ProfileImageUploader /> */}
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
          {ADDRESS_LIST.map(locale => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
        <select {...register('major')}>
          {MAJOR_LIST.map(major => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none"
        >
          회원가입 완료
        </button>
      </form>
    </>
  );
};
export default SignUpUserInfo;
