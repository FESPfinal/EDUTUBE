'use client';

import Modal from '@/components/block/modal/Modal';
import { useRouter } from 'next/navigation';

const CoffeechatReservePage = () => {
  const router = useRouter();
  return (
    <>
      <Modal>
        <div className="bg-white">
          <span onClick={() => router.back()}>Close modal</span>
          <p>예약 페이지</p>
        </div>
      </Modal>
    </>
  );
};
export default CoffeechatReservePage;
