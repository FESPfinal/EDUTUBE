import CoffeechatInfo from '@/components/views/coffeechat/info/CoffeechatInfo';

const URL = (_id: string) => `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products/${_id}`;

async function getData(_id: string) {
  const res = await fetch(URL(_id));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const CoffeechatInfoPage = async ({ params: { _id } }: { params: { _id: string } }) => {
  const data = await getData(_id);
  return (
    <>
      <CoffeechatInfo _id={_id} initData={data.item} />
    </>
  );
};
export default CoffeechatInfoPage;
