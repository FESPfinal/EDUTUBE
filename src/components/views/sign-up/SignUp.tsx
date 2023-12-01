'use client';

import { useState } from 'react';
import SignUpIdPw from './SignUpIdPw';
import SignUpUserInfo from './SignUpUserInfo';
import { Step1Data, Step2UserData } from '../../../helper/types/userInfoTypes';
import { USER_TYPES } from '../../../helper/constants/userConst';
import useCreateUser, { SignUpData } from '@/queries/signUp/useCreateUser';
import SignUpSellerInfo from './SignUpSellerInfo';
import Link from 'next/link';

type DefaultUserData = {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: string;
};

type UserData = {
  extra: {
    profileImage: File | undefined;
    major: string;
    contactEmail: string;
    profile: string;
  };
} & DefaultUserData;

type SellerData = {};

const STEPS = {
  STEP1: 1,
  STEP2: 2,
};

const SignUp = () => {
  const [signUpStep, setSignUpStep] = useState(STEPS.STEP1);
  const [step1Data, setStep1Data] = useState<Step1Data>();

  const goNextStep = (data: Step1Data) => {
    setSignUpStep(step => step + 1);
    setStep1Data(acc => ({ ...acc, ...data }));
  };

  return (
    <>
      {signUpStep === STEPS.STEP1 && <SignUpIdPw getData={goNextStep} />}
      {signUpStep === STEPS.STEP2 && step1Data?.type === USER_TYPES.USER && (
        <SignUpUserInfo step1Data={step1Data} />
      )}
      {signUpStep === STEPS.STEP2 && step1Data?.type === USER_TYPES.SELLER && (
        <SignUpSellerInfo step1Data={step1Data} />
      )}
      <div className="flex justify-center mt-10">
        <Link href="/login">로그인</Link>
        <p className="mx-3">|</p>
        <Link href="/">홈으로</Link>
      </div>
    </>
  );
};

export default SignUp;
