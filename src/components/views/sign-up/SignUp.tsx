'use client';

import { useState } from 'react';
import SignUpIdPw from './SignUpIdPw';
// import SignUpUserInfo from './SignUpUserInfo';
import { Step1Data } from './types';

const STEPS = {
  STEP1: 1,
  STEP2: 2,
};

const SignUp = () => {
  const [signUpStep, setSignUpStep] = useState(STEPS.STEP1);
  const [signUpData, setSignUpData] = useState({});

  const goNextStep = (data: Step1Data) => {
    setSignUpStep(step => step + 1);
    setSignUpData(data);
  };

  console.log(signUpData);

  return (
    <>
      {signUpStep === STEPS.STEP1 && <SignUpIdPw nextStep={goNextStep} />}
      {/* {signUpStep === STEPS.STEP2 && <SignUpUserInfo />} */}
    </>
  );
};

export default SignUp;
