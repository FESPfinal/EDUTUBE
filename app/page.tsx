import CoffeechatLists from '@/components/views/coffeechat/CoffeechatLists';

const URL = `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products`;

async function getData() {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home = async () => {
  const data = await getData();
  return (
    <>
      <CoffeechatLists initData={data.item} />
    </>
  );
};

export default Home;
