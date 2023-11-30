'use client';

import useLogin from '@/queries/login/useLogin';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  email: yup.string().email().required('이메일 형식이 잘못되었습니다.'),
  password: yup.string().required('비밀번호를 입력해 주세요'),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { mutate: loginMutate, data: loginData } = useLogin();
  const onSubmit = (data: FormData) => {
    loginMutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: data => {
          Cookies.set('accessToken', data.token.accessToken);
          Cookies.set('refreshToken', data.token.refreshToken);
          Cookies.set('user_id', String(data._id));
          router.push('/');
        },
        onError: () => {
          alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        },
      },
    );
  };

  return (
    <>
      <div className="text-center">
        <p className="text-2xl">로그인</p>
        <p>안녕하세요 :)</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-sm font-medium text-gray-700 ">
          이메일
          <div className="flex items-center">
            <input
              type="text"
              placeholder="edu@email.com"
              {...register('email', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.email?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700 ">
          비밀번호
          <div className="flex items-center">
            <input
              type="password"
              placeholder="********"
              {...register('password', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
          </div>
          <p className="text-red-400 h-2">{errors.password?.message}</p>
        </label>
        <button
          type="submit"
          className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none"
        >
          로그인{' '}
        </button>
      </form>
    </>
  );
};
export default Login;
