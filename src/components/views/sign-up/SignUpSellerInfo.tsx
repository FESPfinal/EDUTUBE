'use client';
import * as yup from 'yup';
import { Step1Data } from '../../../helper/types/userInfoTypes';
import ProfileImageUploader from '@/components/atom/ProfileImageUploader';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateUser from '@/queries/signUp/useCreateUser';
import { USER_TYPES } from '../../../helper/constants/userConst';
import { useRouter } from 'next/navigation';
import useCreateFile from '@/queries/common/useCreateFile';

const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

const schema = yup.object().shape({
  name: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  nickname: yup.string().min(2, '최소 2글자 이상이어야 합니다.').required('값을 입력해주세요.'),
  address: yup.string(),
  phone: yup.string().matches(phoneRegExp, '010-0000-0000 형식으로 작성해주세요.'),
  contactEmail: yup.string().email('이메일 형식이 잘못되었습니다.').required('email is required'),
  major: yup.string(),
  intro: yup.string().required('소개글을 입력해주세요.'),
  sns: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      '정확한 url을 입력해주세요.',
    )
    .required('주소를 입력해주세요.'),
});

type UserFormData = yup.InferType<typeof schema>;

const ADDRESS_LIST = ['지역1', '지역2', '지역3', '지역4', '지역5', '지역6', '지역7'];
const MAJOR_LIST = ['직무1', '직무2', '직무3', '직무4', '직무5', '직무6', '직무7'];

interface Props {
  step1Data: Step1Data;
}
const SignUpSellerInfo = ({ step1Data }: Props) => {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: yupResolver(schema) });

  const { mutate: createUserProfileMutate } = useCreateFile();
  const { mutate: createUserMutate } = useCreateUser();

  const createUser = (data: UserFormData, fileName: string) => {
    createUserMutate(
      {
        ...step1Data,
        type: USER_TYPES.SELLER,
        name: data.name,
        address: data.address || '',
        phone: data.phone || '',
        extra: {
          profileImage: fileName,
          major: data.major || '',
          nickname: data.nickname,
          contactEmail: data.contactEmail,
          intro: data.intro,
          sns: data.sns,
        },
      },
      {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다.');
          router.push('/login');
        },
      },
    );
  };

  const onSubmit = (data: UserFormData) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('attach', imageFile);
      createUserProfileMutate(formData, {
        onSuccess: (fileName: string) => {
          console.log(fileName);
          createUser(data, fileName);
        },
        onError: () => {
          alert('프로필 업로드가 실패하였습니다.');
        },
      });
    } else {
      alert('프로필 사진을 등록해주세요.');
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="text-2xl">회원가입</p>
        <p>프로필 설정</p>
      </div>
      <ProfileImageUploader onImageUpload={setImageFile} />
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
              placeholder="000-0000-0000"
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
        <label className="block text-sm font-medium text-gray-700 ">
          소개글
          <div className="flex items-center">
            <input
              type="text"
              placeholder="자신에 대한 소개글을 간단히 작성해주세요."
              {...register('intro', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.intro?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700 ">
          자신을 표현할 수 있는 SNS (https:// 형식으로 입력하세요)
          <div className="flex items-center">
            <input
              type="text"
              placeholder="https://"
              {...register('sns', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.sns?.message}</p>
        </label>
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
export default SignUpSellerInfo;
