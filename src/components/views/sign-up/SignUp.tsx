'use client';

import { useState } from 'react';
import SignUpIdPw from './SignUpIdPw';
import SignUpUserInfo from './SignUpUserInfo';
import { Step1Data, Step2UserData } from './types';
import { USER_TYPES } from './consts';

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
  const [signUpData, setSignUpData] = useState<Step1Data | Step2UserData | UserData>();

  const goNextStep = (data: Step1Data) => {
    setSignUpStep(step => step + 1);
    setSignUpData(acc => ({ ...acc, ...data }));
  };

  const goFinStep = (data: Step2UserData) => {
    setSignUpData(acc => ({ ...acc, ...data }));
  };

  return (
    <>
      {signUpStep === STEPS.STEP1 && <SignUpIdPw nextStep={goNextStep} />}
      {signUpStep === STEPS.STEP2 && signUpData?.type === USER_TYPES.USER && (
        <SignUpUserInfo finStep={goFinStep} />
      )}
      {/* {signUpStep === STEPS.STEP2 && signUpData?.type === USER_TYPES.SELLER && <SignUpSellerInfo />} */}
    </>
  );
};

export default SignUp;
