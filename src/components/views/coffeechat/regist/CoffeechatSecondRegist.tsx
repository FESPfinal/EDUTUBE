'use client';
import BlockStepper from '@/components/block/navbar/BlockStepper';

const CoffeechatSecondRegist = () => {
  return (
    <div className='flex relative'>
      <BlockStepper />
      <form className='flex-1'>
        <div style={{margin: '152px 0'}}>

          <div className='w-[793px] mx-auto mb-11'>
            <h1 className='mb-10 text-[45px]'>
              커피챗 내용 설정
            </h1>
            <h2 className='text-[30px]'>장소 등록</h2>
                <label htmlFor='online'>온라인
                  <input type="checkbox" />
                </label>
                <label htmlFor='offline'>오프라인
                  <input type="checkbox" />
                </label>

              <div className='flex flex-col'>
                <label htmlFor="online">
                  <input type="text" />
                </label>
                <label htmlFor="offline">
                  <input type="text" />
                </label>
              </div>

              <div>
                <h2 className='text-[30px]'>날짜 등록</h2>
              </div>

              <div>
                <h2 className='text-[30px]'>시간 등록</h2>
              </div>

              <div>
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