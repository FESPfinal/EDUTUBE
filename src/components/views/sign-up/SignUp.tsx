'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Radio from '@/components/atom/Radio';
import useCheckDuplicateEmail from '@/queries/signUp/useCheckDuplicateEmail';
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('email is required'),
  password: yup.string().min(8).required('password must be 8 - 15 characters.'),
  confirmPassword: yup.string().oneOf([yup.ref('password')]),
});

const SignUp = () => {
  const { register, handleSubmit, getValues } = useForm<FormData>();
  const { mutate: mutateCheckEmail } = useCheckDuplicateEmail();

  const doCheckEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = getValues('email');
    console.log(email);

    mutateCheckEmail(email, {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error.message);
      },
    });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 여기에 회원가입 로직을 구현하세요.
  };

  return (
    <>
      <div className="text-center">
        <p className="text-2xl">회원가입</p>
        <p>에듀튜브에서 당신의 꿈을 펼쳐보세요</p>
      </div>
      <div className="flex justify-center">
        <Radio value={'user'} name={'author'}>
          일반 회원
        </Radio>
        <Radio value={'seller'} name={'author'}>
          강사 회원
        </Radio>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-sm font-medium text-gray-700 ">
          이메일
          <div className="flex items-center">
            <input
              type="text"
              {...register('email', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="min-w-fit  px-2 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none ml-3"
              onClick={doCheckEmail}
            >
              중복확인
            </button>
          </div>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          비밀번호
          <input
            type="text"
            {...register('password', { required: true })}
            className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          비밀번호 확인
          <input
            type="text"
            {...register('confirmPassword', { required: true })}
            className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
          />
        </label>
        <button
          type="submit"
          className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none"
        >
          다음
        </button>
      </form>
    </>
  );
};

export default SignUp;
