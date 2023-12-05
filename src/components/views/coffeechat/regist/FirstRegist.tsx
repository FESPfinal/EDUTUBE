'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import BlockStepper from '@/components/block/BlockStepper';
import Image from 'next/image';


const FirstRegist = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');
  const imgValue = watch('image')
  console.log(nameValue, imgValue)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div style={{display: 'flex'}}>
      < BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} imgValue={imgValue} errors={errors}/>

      <form style={{flex: '1'}} onSubmit={handleSubmit()}>
        <div style={{margin: '152px 0'}}>

          {/* 이미지 업로드 시작 */}
          <div style={{width: '793px', margin: '0 auto 46px'}}>
            <h1 style={{marginBottom: '40px', fontSize: '45px'}}>커피챗 내용 설정</h1>
            <label htmlFor="image" style={{cursor: 'pointer'}}>
              이미지 업로드
              {selectedImage ? (
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt='커피챗 등록 이미지'
                  width={793}
                  height={369}
                  style={{objectFit: 'cover'}}
                />
              ) : (
                <Image
                  src='/images/coffeechatImg.svg'
                  alt='커피챗 등록 이미지'
                  width={793}
                  height={369}
                />
              )}
              <input
                id='image'
                type="file"
                style={{display: 'none'}}
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {/* 이미지 업로드 끝 */}

          {/* 제목, 내용, 소개글 input 시작 */}
          <div style={{width: '793px', margin: '0 auto'}}>
            <label htmlFor='name' style={{display: 'block'}}>제목</label>
            <input 
              id='name'
              type='text'
              style={{width: '792px', marginBottom: '76px'}}
              {...register('name', { 
                required: '커피챗 제목을 입력해주세요',
                minLength: {
                  message: '제목을 작성해 주세요',
                  value: 1
                }
              })}/>
            

            <label htmlFor='content' style={{display: 'block'}}>상세 내용</label>
            <input 
              id='content'
              type='text'
              style={{width: '792px', marginBottom: '76px'}}
              {...register('content', { 
                required: '커피챗 상세 내용을 입력해주세요',
                minLength: {
                  message: '상세 내용을 작성해 주세요',
                  value: 10
                }
              })}/>
            
            
            <label htmlFor='intro' style={{display: 'block'}}>소개글</label>
            <input 
              id='intro'
              type='text'
              className='active: outline-none'
              style={{width: '792px', marginBottom: '76px', outline: 'none'}}
              {...register('intro', { 
                required: '커피챗 소개해 주세요',
                minLength: {
                  message: '상세 내용을 작성해 주세요',
                  value: 1
                }
              })}/>
            <button 
              type='submit'
              className='bg-light-main py-7 rounded text-white'
              style={{width: '792px'}}>다음 설정으로 이동
            </button>
          </div>
          {/* 제목, 내용, 소개글 input 끝 */}

        </div>
      </form>
    </div>
  );
};

export default FirstRegist;