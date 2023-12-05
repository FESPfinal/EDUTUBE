'use client';
import { useForm } from 'react-hook-form';
import BlockStepper from '@/components/block/BlockStepper';
import Image from 'next/image';
import { useState } from 'react';

const FirstRegist = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex'>
      < BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} errors={errors}/>

      <h1>커피챗 내용 설정</h1>
      <form onSubmit={handleSubmit()}>
      <div className='flex flex-col'>
      <h2>이미지 업로드</h2>
      <label htmlFor="uploadImg">
        {selectedImage ? (
          <Image 
            src={selectedImage}
            alt='선택한 이미지'
            width={793} 
            height={369} 
            style={{objectFit: 'cover', borderRadius: '20px'}}/>
        ) : (
          <Image src='/images/coffeechatImg.svg' alt='커피챗 이미지' width={793} height={369}
          />
        )}
      </label>
      <input 
        id='uploadImg'
        type='file'
        style={{ display: 'none', cursor: 'pointer' }}
        onChange={handleImageChange}
      />
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
      </form>
    </div>
  );
};

export default FirstRegist;