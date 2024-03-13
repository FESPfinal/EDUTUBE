import CoffeechatLists from '../../src/components/views/coffeechat/CoffeechatLists';

const URL = `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products`;

async function getData() {
  const res = await fetch(URL, { cache: 'no-store' });
  if (!res.ok) {
    return { item: [] };
  }

  return res.json();
}

const CoffeechatListPage = async () => {
  const data = await getData();

  return (
    <div className="mb-20">
      <CoffeechatLists initData={data.item} />
    </div>
  );
};
export default CoffeechatListPage;
