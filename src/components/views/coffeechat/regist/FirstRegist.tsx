'use client';
import { useForm } from 'react-hook-form';
import Stepper from '@/components/atom/Stepper';
import Button from '@/components/atom/Button';
import BlockStepper from '@/components/block/BlockStepper';



const FirstRegist = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');

  return (
    <div>
      < BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} errors={errors}/>

      <h1>커피챗 내용 설정</h1>
      <form onSubmit={handleSubmit()}>
        <div className='flex flex-col'>
          <h2>이미지 업로드</h2>

          <div style={{width: '793px', height: '369px', backgroundColor:'#f0f0f0', borderRadius: '20px'}}>
          </div>

          <div>
            <h2>카테고리</h2>
          </div>


          <label htmlFor='name'>제목</label>
          <input 
            id='name'
            type='text'
            style={{ width: '100%' }}
            {...register('name', { 
              required: '커피챗 제목을 입력해주세요',
              minLength: {
                message: '10자 이상 입력해',
                value: 10
              }
            })}
          />
          {errors.name && <strong className='text-light-error'>{errors.name.message}</strong>}

          <label htmlFor='content'>상세 내용</label>
          <input 
            id='content'
            type='text'
            {...register('content', { 
              required: '커피챗의 상세 내용을 입력해주세요', 
              minLength: {
                message: '10자 이상 입력해주세요',
                value: 10
              }
            })}
          />
          {errors.content && <strong className='text-light-error'>{errors.content.message}</strong>}

          <label htmlFor='intro'>소개글</label>
          <input
            id='intro'
            type='text'
            {...register('intro', {
              required: '커피챗을 간단하게 소개해 주세요',
              minLength: {
                message: '10자 이상 입력해주세요',
                value: 10
              }
            })}
          />
          {errors?.intro?.message && <strong className='text-light-error'>{errors.intro.message}</strong>}

          <button type='submit'>다음 설정으로</button>
        </div>
      </form>
    </div>
  );
};

export default FirstRegist;