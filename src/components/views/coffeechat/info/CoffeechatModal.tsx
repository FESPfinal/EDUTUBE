'use client'
import { useParams, useRouter } from 'next/navigation';

const CoffeechatModal = () => {
  const router = useRouter();
  const params = useParams();
  console.log(params)
  return (
    <>
      <div className="bg-white">
        <span onClick={() => router.back()}>Close modal</span>
        <p>예약 페이지</p>
      </div>
    </>
  )
}
export default CoffeechatModal;