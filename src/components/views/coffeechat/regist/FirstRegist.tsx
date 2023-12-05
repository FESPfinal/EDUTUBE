'use client';
import { useForm } from 'react-hook-form';
import BlockStepper from '@/components/block/BlockStepper';
import Image from 'next/image';
import { useState } from 'react';
import Category from '@/components/atom/Category';


const FirstRegist = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');
  const imgValue = watch('uploadImg')

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

      <form onSubmit={handleSubmit()}>
        <div className='flex flex-col'>

          <h1 style={{marginTop: '100px', fontSize: '45px'}}>커피챗 내용 설정</h1>
          <h2 style={{marginTop: '46px', fontSize: '30px'}}>이미지 업로드</h2>
        
          <label 
            htmlFor="uploadImg" 
            style={{cursor: 'pointer'}}>
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
          style={{ display: 'none' }}
          onChange={handleImageChange}
          />
        </div>



          <div style={{margin: '24px 0'}}>
            <h2 style={{fontSize: '30px'}}>
              카테고리
            </h2>

          </div>

          <div>
          <label htmlFor='name'
            style={{display: 'block', marginTop: '40px'}}>제목
          <input 
            id='name'
            type='text'
            style={{ width: '782px'}}
            {...register('name', { 
              required: '커피챗 제목을 입력해주세요',
              minLength: {
                message: '10자 이상 입력해',
                value: 10
              }
            })}
          />
          </label>
          {errors.name && <strong className='text-light-error'>{errors.name.message}</strong>}

          <label htmlFor='content'
          style={{display: 'block', marginTop: '40px'}}>상세 내용</label>
          <input 
            id='content'
            type='text'
            style={{ width: '782px'}}
            {...register('content', { 
              required: '커피챗의 상세 내용을 입력해주세요', 
              minLength: {
                message: '10자 이상 입력해주세요',
                value: 10
              }
            })}
          />
          {errors.content && <strong className='text-light-error'>{errors.content.message}</strong>}

          <label htmlFor='intro'
          style={{display: 'block', marginTop: '40px'}}>소개글</label>
          <input
            id='intro'
            type='text'
            style={{ width: '782px' }}
            {...register('intro', {
              required: '커피챗을 간단하게 소개해 주세요',
              minLength: {
                message: '10자 이상 입력해주세요',
                value: 10
              }
            })}
            />
          {errors?.intro?.message && <strong className='text-light-error'>{errors.intro.message}</strong>}
            </div>

          <button type='submit'
            style={{
              margin: '40px 0 150px 0', backgroundColor: '##09CF83', textAlign: 'center' 
            }}>
              다음 설정으로 이동
          </button>
      </form>
    </div>
  );
};

export default FirstRegist;