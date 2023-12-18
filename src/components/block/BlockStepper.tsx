'use client';
import Stepper from '../atom/Stepper';

type ErrorType = {
  name: string;
  content: string;
  intro: string;
  image: string;
  price: number
  people: number;
  offline: string;
  online: string;
}

interface Props {
  imgValue: File;
  nameValue: string;
  contentValue: string;
  introValue: string;
  priceValue: number;
  peopleValue: number
  offlineValue: string;
  onlineValue: string;
  errors: ErrorType;
}

const BlockStepper = ({ imgValue, nameValue, contentValue, introValue, offlineValue, onlineValue, priceValue, peopleValue, errors }: Props) => {
  const step1Active = nameValue && contentValue && introValue;

  return (
    <div className='flex flex-col bg-white min-w-fit w-[200px] h-screen pt-[100px] mr-[100px] fixed shadow-[8px_0_10px_-5px_rgba(0,0,0,0.3)]'>
      <ul className='flex flex-col'>
        {/* 등록 1페이지 */}
        <li className='mb-[20px]'>
          <Stepper title='전체 내용 설정' state={step1Active ? 'active' : 'default'} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='이미지 업로드' state={!imgValue ? 'default' : (errors.image ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='제목 설정' state={!nameValue ? 'default' : (errors.name ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='내용 설정' state={!contentValue ? 'default' : (errors.content ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='소개글 설정' state={!introValue ? 'default' : (errors.intro ? 'error' : 'active')} />
        </li>

        {/* 등록 2페이지 */}
        <li className='my-[20px]'>
          <Stepper title='상세 내용 설정' state={step1Active ? 'active' : 'default'} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='장소 설정' state={(offlineValue || onlineValue) ? 'active' : ((errors.offline || errors.online)  ? 'error' : 'default')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='날짜 & 시간 설정' state={!nameValue ? 'default' : (errors.name ? 'error' : 'active')} />
        </li>

        {/* 등록 3페이지 */}
        <li className='my-[20px]'>
          <Stepper title='상세 내용 설정' state={step1Active ? 'active' : 'default'} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='가격 설정' state={!priceValue ? 'default' : (errors.price ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='인원수 설정' state={!peopleValue ? 'default' : (errors.people ? 'error' : 'active')} />
        </li>
        <li className='mt-0 mr-0 mb-[10px] ml-[20px]'>
          <Stepper title='카테고리 설정' state={!contentValue ? 'default' : (errors.content ? 'error' : 'active')} />
        </li>
      </ul>
    </div>
  );
};

export default BlockStepper;