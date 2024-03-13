import CoffeechatLists from '@/components/views/coffeechat/CoffeechatLists';

const URL = `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products`;

async function getData() {
  const res = await fetch(URL, { cache: 'no-store' });
  if (!res.ok) {
    return { item: [] };
  }
  return res.json();
}

const Home = async () => {
  const data = await getData();
  console.log(data.item);
  return <CoffeechatLists initData={data.item} />;
};

export default Home;
