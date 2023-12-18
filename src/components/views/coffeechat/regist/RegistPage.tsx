'use client';

import { useState } from 'react';
import CoffeeChatFirstRegistPage from './RegistPages/CofeeChatFirstRegistPage';
import CoffeeChatSecondRegistPage from './RegistPages/CoffeeChatSecondRegistPage';
import CoffeeChatThirdRegistPage from './RegistPages/CoffeeChatThirdRegistPage';
import { Step1RegistData, Step2RegistData } from '@/helper/types/product';

const STEPS = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3,
}

const RegistPage = () => {
  const [registStep, setRegistStep] = useState(STEPS.STEP1);
  const [step1RegistData, setStep1RegistData] = useState<Step1RegistData>();
  const [step2RegistData, setStep2RegistData] = useState<Step2RegistData>();

  const [nameValue, setNameValue] = useState<string>("");
  const [contentValue, setContentValue] = useState<string>("");
  const [introValue, setIntroValue] = useState<string>("");
  const [imgValue, setImgValue] = useState<string | null>(null);

  const firstNextStep = (data: Step1RegistData) => {
    setStep1RegistData(data);
    setNameValue(data.name);
    setContentValue(data.content);
    setIntroValue(data.extra?.intro || "");
    setImgValue(data.image?.[0] || null);

    setRegistStep(STEPS.STEP2);
  }

  const secondNextStep = (data: Step2RegistData) => {
    setStep2RegistData(data);

    setRegistStep(STEPS.STEP3);
  }

  return (
    <>
      {registStep === STEPS.STEP1 && (
        <CoffeeChatFirstRegistPage getData={firstNextStep} />
      )}
      {registStep === STEPS.STEP2 && (
        <CoffeeChatSecondRegistPage
          nameValue={nameValue}
          contentValue={contentValue}
          introValue={introValue}
          imgValue={imgValue}
          getData={secondNextStep}
        />
      )}
      {registStep === STEPS.STEP3 && <CoffeeChatThirdRegistPage />}
    </>
  );
}

export default RegistPage;
