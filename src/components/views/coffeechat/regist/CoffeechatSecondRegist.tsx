'use client';
import CheckBox from '@/components/atom/CheckBox';
import KakaoMap from './SearchMap';
import { useForm } from 'react-hook-form';





const CoffeechatSecondRegist = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const onlineCheck = watch('onlineCheck', false);
  const offlineCheck = watch('offlineCheck', false);
  const offlineAddress = watch('offlineAddress', '');
  const searchClicked = watch('searchClicked', false);

  const handleOnlineCheck = () => {
    setValue('onlineCheck', !onlineCheck);
  }

  const handleOfflineCheck = () => {
    setValue('offlineCheck', !offlineCheck);
  }

  const handleSearchClick = () => {
    setValue('searchClicked', true);
  }

  return (
    <div className='flex relative'>
      <form className='flex-1'>
        <div style={{margin: '152px 0'}}>

          <div className='w-[793px] mx-auto mb-11'>
            <h1 className='mb-10 text-[45px]'>
              커피챗 내용 설정
            </h1>
            <h2 className='text-[30px]'>장소 등록</h2>
              <div className='flex gap-[20px] mt-[20px]'>
                <CheckBox label='온라인' size='large'  onChange={handleOnlineCheck} isChecked={onlineCheck}/>
                <CheckBox label='오프라인' size='large'  onChange={handleOfflineCheck} isChecked={offlineCheck}/>
              </div>


              <div className='flex flex-col relative'>
                <label htmlFor="online" 
                  className='block mt-[30px] text-[30px]'>온라인 주소
                  <input 
                    type="text" 
                    className={`w-full border-b border-black border-t-0 border-r-0 border-l-0 ${!onlineCheck ? 'bg-gray-300' : ''}`}
                    id='온라인' 
                    disabled={!onlineCheck} />
                </label>

                <label htmlFor="offline" 
                  className='block mt-[30px] text-[30px]'>오프라인 주소
                  <input 
                    type="text" 
                    className={`w-full border-b border-black border-t-0 border-r-0 border-l-0 ${!offlineCheck ? 'bg-gray-300' : ''}`}
                    id='offlineAddress' 
                    disabled={!offlineCheck}
                    {...register('offlineAddress')}/>
                </label>
                {offlineCheck && (
                  <button type='button' className='text-white bg-light-main absolute bottom-[3px] right-[10px] p-[6px]' onClick={handleSearchClick}>검색</button>
                )}
              </div>

              {offlineCheck && searchClicked && (
                <KakaoMap offlineAddress={offlineAddress} />
              )}


              <div>
                <h2 className='text-[30px]'>날짜 등록</h2>
              </div>

              <div>
                <h2 className='text-[30px]'>시간 등록</h2>
              </div>

              <div className='flex gap-[20px]'>
                <button type='button' className='bg-light-main py-7 rounded text-white w-full mt-[76px]'>뒤로가기</button>
                <button type='submit' className='bg-light-main py-7 rounded text-white w-full mt-[76px]'>다음 설정으로 이동</button>
              </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CoffeechatSecondRegist;