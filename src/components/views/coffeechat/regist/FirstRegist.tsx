'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import BlockStepper from '@/components/block/BlockStepper';
import Image from 'next/image';

const FirstRegist = () => {
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');
  const imgValue = watch('image');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className='flex relative'>
      < BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} imgValue={imgValue} errors={errors}/>

      <form className='flex-1' onSubmit={handleSubmit()}>
        <div style={{margin: '152px 0'}}>

          {/* 이미지 업로드 시작 */}
          <div className='w-[793px] mx-auto mb-11'>
            <h1 className='mb-10 text-[45px]'>커피챗 내용 설정</h1>
            <label htmlFor='image' className='text-[30px] cursor-pointer'>
              이미지 업로드
              {selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt='커피챗 등록 이미지'
                  width={793}
                  height={369}
                  className='rounded-[20px] w-[793px] h-[369px] object-cover'
                />
              ) : (
                <Image
                  src='/images/coffeechatImg.svg'
                  alt='커피챗 등록 이미지'
                  width={793}
                  height={369}
                  className='rounded-[20px] w-[793px] h-[369px] object-cover'
                />
              )}
                <input
                  id='image'
                  type="file"
                  className='hidden'
                  {...register('image', {
                    required: '이미지를 등록해주세요',
                  })}
                  onChange={handleImageUpload}
                />
            </label>
            {errors.image && <strong className='text-light-error'>{errors.image.message}</strong>}
          </div>
          {/* 이미지 업로드 끝 */}

          {/* 제목, 내용, 소개글 input 시작 */}
          <div className='w-[792px] mx-auto'>
            <label htmlFor='name' className='block mb-0 text-[30px]'>제목</label>
            <input 
              id='name'
              type='text'
              className='w-full border-b border-black border-t-0 border-r-0 border-l-0 active: outline-none'
              {...register('name', { 
                required: '커피챗 제목을 입력해주세요',
                minLength: {
                  message: '10자 이상 작성해 주세요',
                  value: 10
                }
              })}
            />
            {errors.name && <strong className='text-light-error'>{errors.name.message}</strong>}

            <label htmlFor='content' className='block mt-[76px] text-[30px]'>상세 내용</label>
            <input 
              id='content'
              type='text'
              className='w-full border-b border-black border-t-0 border-r-0 border-l-0'
              {...register('content', { 
                required: '커피챗 상세 내용을 입력해주세요',
                minLength: {
                  message: '10자 이상 작성해 주세요',
                  value: 10
                }
              })}
            />
            {errors.content && <strong className='text-light-error'>{errors.content.message}</strong>}

            <label htmlFor='intro' className='block mt-[76px] text-[30px]'>소개글</label>
            <input 
              id='intro'
              type='text'
              className='w-full border-b border-black border-t-0 border-r-0 border-l-0'
              {...register('intro', { 
                required: '커피챗 소개해 주세요',
                minLength: {
                  message: '10자 이상 작성해 주세요',
                  value: 10
                }
              })}
            />
            {errors.intro && <strong className='text-light-error'>{errors.intro.message}</strong>}

            <button 
              type='submit'
              className='bg-light-main py-7 rounded text-white w-full mt-[76px]'
            >다음 설정으로 이동
            </button>
          </div>
          {/* 제목, 내용, 소개글 input 끝 */}

        </div>
      </form>
    </div>
  );
};

export default FirstRegist;