'use client';
import { useForm } from 'react-hook-form';
import BlockStepper from '@/components/block/BlockStepper';
import { jobCategoryConst, regionCategoryConst } from '@/helper/constants/categoryConst';
import Category from '@/components/atom/Category';
import { useState } from 'react';

const CoffeeChatThirdRegistPage = ({ nameValue, contentValue, introValue, imgValue }: Props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedJobCategory, setSelectedJobCategory] = useState<string[]>([]);
  const [selectedRegionCategory, setSelectedRegionCategory] = useState('');

  const peopleValue = watch('people');
  const priceValue = watch('price')

  const onSubmit = (formData, event) => {
    event.preventDefault();
    console.log(formData);
    // router.push('/coffeechat');
  }

  return (
    <div className='flex'>
      <BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} imgValue={imgValue} peopleValue={peopleValue} priceValue={priceValue}/>
      <form className='ml-[332px] my-[100px]'onSubmit={handleSubmit(onSubmit)}>
        <h1 className='mb-10 text-[45px]'>
          커피챗 내용 설정
        </h1>
        <div className='w-[792px] mx-auto'>
          <label htmlFor='name' className='block mb-0 text-[30px]'>가격 설정</label>
          <input 
            id='price'
            type='number'
            className='w-full border-b border-black border-t-0 border-r-0 border-l-0 focus:border-transparent'
            {...register('price', { 
              required: '가격을 적어주세요',
              minLength: {
                message: '1',
                value: 1
              }
            })}
          />
          {errors.price && <strong className='text-light-error'>{errors.price.message}</strong>}
          
          <label htmlFor='content' className='block mt-[76px] text-[30px]'>인원수 설정</label>
          <input 
            id='people'
            type='number'
            className='w-full border-b border-black border-t-0 border-r-0 border-l-0'
            {...register('people', { 
              required: '인원수를 입력해주세요',
              minLength: {
                message: '1인 이상 입력해주세요',
                value: 1
              }
            })}
          />
          {errors.people && <strong className='text-light-error'>{errors.people.message}</strong>}

          <div className="mb-4">
            <h2 className='text-[30px] mt-[76px] mb-[20px]'>카테고리 설정</h2>
          <label className="block text-gray-700">분야별</label>
          <div className="flex mt-2 flex-wrap gap-2 ">
            {jobCategoryConst.map(category => (
              <Category
                key={category}
                name={category}
                setSelectedCategory={({ name }) => {
                  selectedJobCategory[0] == name
                    ? setSelectedJobCategory([])
                    : setSelectedJobCategory([name]);
                }}
                selectedCategory={selectedJobCategory[0]}
              />
            ))}
          </div>
        </div>
        {/* 지역 카테고리 */}
        <div className="mb-4">
          <label className="block text-gray-700">지역별</label>
          <div className="flex mt-2 flex-wrap gap-2 ">
            {regionCategoryConst.map(category => (
              <Category
                key={category}
                name={category}
                setSelectedCategory={({ name }) => {
                  selectedRegionCategory == name
                    ? setSelectedRegionCategory('')
                    : setSelectedRegionCategory(name);
                }}
                selectedCategory={selectedRegionCategory}
              />
            ))}
          </div>
        </div>
          <button type='submit' className='bg-light-main py-7 rounded text-white w-full mt-[76px]'>등록</button>
        </div>
      </form>
    </div>
  )
}

export default CoffeeChatThirdRegistPage;