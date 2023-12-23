'use client';

import useLogin from '@/queries/login/useLogin';
import useSelectCartMutate from '@/queries/login/useSelectCartMutate';
import useUserCartInfo from '@/stores/cart';
import useUserInfo from '@/stores/userInfo';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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

  const { deleteUserInfo } = useUserInfo(store => store);
  const { setUserCartCount, deleteUserCartCount } = useUserCartInfo(store => store);
  const { mutate: loginMutate } = useLogin();
  const { mutate: cartMutate } = useSelectCartMutate();
  const onSubmit = (data: FormData) => {
    loginMutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: data => {
          router.push('/');
          cartMutate(undefined, {
            onSuccess: cartInfo => {
              setUserCartCount(cartInfo.length);
            },
          });
        },
        onError: () => {
          alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        },
      },
    );
  };

  useEffect(() => {
    //로그인페이지 접속시 데이터 리셋
    deleteUserInfo();
    deleteUserCartCount();
    Cookies.remove('refreshToken');
    Cookies.remove('userType');
  }, []);

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
      <div className="flex justify-center mt-10">
        <Link href={'/sign-up'}>회원가입</Link>
      </div>
    </>
  );
};
export default Login;
