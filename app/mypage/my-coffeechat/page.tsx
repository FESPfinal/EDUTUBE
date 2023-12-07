import Link from 'next/link';

const MypageMyCoffeechat = () => {
  return (
    <>
      <div className="m-5 ml-8">
        <p className="text-3xl my-10">내 커피챗</p>
        <section className="ml-10">
          <div className="w-[120px] h-[50px] px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
            <Link href={'/coffeechat/regist'}>커피챗 등록</Link>
          </div>
        </section>
      </div>
    </>
  );
};
export default MypageMyCoffeechat;
