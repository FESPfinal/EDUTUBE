'use client';
import { useState } from 'react';
import KakaoMap from '../../../../../helper/utils/kakaoMap/SearchMap';
import RegistCalendar from '../ReactCalendar/RegistCalendar';
import { useForm } from 'react-hook-form';
import Radio from '@/components/atom/Radio';
import Skeleton from '@/components/atom/Skeleton';
import { PLACE_TYPES } from '../../../../../helper/constants/placeConst'
import BlockStepper from '@/components/block/BlockStepper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const PLACE_TYPE = 'placeType';

const schema = yup.object().shape({  

});

type FormData = yup.InferType<typeof schema>;

const CoffeeChatSecondRegistPage = ({ nameValue, contentValue, introValue, imgValue }: Props) => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    formState: { errors } 
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [placeType, setPlaceType] = useState(PLACE_TYPES.PLACE);
  
  const offlineValue = watch('offlineAddress');
  const onlineValue = watch('onlineAddress');
  const dateValue = watch('')

  const searchClicked = watch('searchClicked', false);

  const handlePlaceCheck = (type: string) => {
    setPlaceType(type)
  }

  const handleSearchClick = () => {
    setValue('searchClicked', true);
  }

  const onSubmit = (data: FormData) => {
  };

  return (
    <div className='flex relative'>
      <BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} imgValue={imgValue} errors={errors} offlineValue={offlineValue} onlineValue={onlineValue} />

      <form className='ml-[322px]' onSubmit={handleSubmit(onSubmit)}>
        <div style={{margin: '152px 0'}}>

          <div className='w-[793px] mx-auto mb-11'>
            <h1 className='mb-10 text-[45px]'>
              커피챗 내용 설정
            </h1>
            <h2 className='text-[30px]'>장소 등록</h2>
              <div className='flex gap-[20px] mt-[20px]'>
                <Radio value={PLACE_TYPES.ONLINE} name={PLACE_TYPE} onClick={handlePlaceCheck}>
                  온라인
                </Radio>
                <Radio value={PLACE_TYPES.OFFLINE} name={PLACE_TYPE} onClick={handlePlaceCheck}>
                  오프라인
                </Radio>
              </div>


              <div className='flex flex-col relative'>
              <label htmlFor="online" className='block mt-[30px] text-[30px]' style={{ display: placeType === PLACE_TYPES.ONLINE ? 'block' : 'none' }}>
              온라인 주소
              <input
                id='onlineAddress'
                type="text"
                className={`w-full border-b border-black border-t-0 border-r-0 border-l-0`}
                hidden={placeType !== PLACE_TYPES.ONLINE}
              />
            </label>
            <strong className="text-light-error">{errors.onlineAddress?.message}</strong>

            <label htmlFor="offline" className='block mt-[30px] text-[30px]' style={{ display: placeType === PLACE_TYPES.OFFLINE ? 'block' : 'none' }}>
              오프라인 주소
              <input
                id='offlineAddress'
                type="text"
                className={`w-full border-b border-black border-t-0 border-r-0 border-l-0`}
                {...register('offlineAddress')}
                hidden={placeType !== PLACE_TYPES.OFFLINE}
              />
            </label>
            <strong className="text-light-error">{errors.offlineAddress?.message}</strong>
            <button type='button' className='text-white bg-light-main absolute bottom-[3px] right-[10px] p-[6px] rounded' hidden={placeType !== PLACE_TYPES.OFFLINE} onClick={handleSearchClick}>검색</button>
            </div>

            {searchClicked && placeType !== PLACE_TYPES.ONLINE && (
              <KakaoMap offlineAddress={offlineValue} />
            )}


              <div className="mt-[60px] relative">
                <h2 className="text-[30px] mb-[60px]">날짜 & 시간 등록</h2>
                <strong className='text-light-error font-normal absolute top-[100px] right-[150px]'>※단일로 시간을 등록하세요</strong>
                <RegistCalendar />
              </div>

              <button 
              type='submit'
              className='bg-light-main py-7 rounded text-white w-full mt-[76px]'
              >다음 설정으로 이동
              </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CoffeeChatSecondRegistPage;