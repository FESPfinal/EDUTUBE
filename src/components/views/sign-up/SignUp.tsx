'use client';

import { useState } from 'react';
import SignUpIdPw from './SignUpIdPw';

const STEPS = {
  STEP1: 'step1',
  STEP2: 'step2',
};

const SignUp = () => {
  const [signUpStep, setSignUpStep] = useState(STEPS.STEP1);

  return (
    <>
      {signUpStep === STEPS.STEP1 && <SignUpIdPw />}
      {signUpStep === STEPS.STEP2}
    </>
  );
};

export default SignUp;
