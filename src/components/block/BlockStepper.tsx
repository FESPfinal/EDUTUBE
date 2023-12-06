'use client';
import Stepper from '../atom/Stepper';

type ErrorType = {
  name: string;
  content: string;
  intro: string;
  image: string;
}

interface Props {
  imgValue: File;
  nameValue: string;
  contentValue: string;
  introValue: string;
  errors: ErrorType;
}

const BlockStepper = ({ imgValue, nameValue, contentValue, introValue, errors }: Props) => {
  const step1Active = nameValue && contentValue && introValue;

  return (
    <div className='min-w-[285px] bg-[#eaeaea] mt-[125px] mr-[122px] py-[60px] pl-[27px] rounded-[20px] fixed'>
      <ul className='flex flex-col'>
        <li className='mb-[20px]'>
          <Stepper title='전체 강의 내용 설정' state={step1Active ? 'active' : 'default'} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[37px]'>
          <Stepper title='이미지 업로드' state={!imgValue ? 'default' : (errors.image ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[37px]'>
          <Stepper title='전체 제목 설정' state={!nameValue ? 'default' : (errors.name ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[37px]'>
          <Stepper title='전체 내용 설정' state={!contentValue ? 'default' : (errors.content ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[37px]'>
          <Stepper title='소개글 설정' state={!introValue ? 'default' : (errors.intro ? 'error' : 'active')} />
        </li>
      </ul>
    </div>
  );
};

export default BlockStepper;
