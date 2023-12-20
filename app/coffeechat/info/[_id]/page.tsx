import CoffeechatInfo from '@/components/views/coffeechat/info/CoffeechatInfo';
import { IMAGE_ROUTE } from '@/helper/constants/commons';
import { Metadata, ResolvingMetadata } from 'next';

const URL = (_id: string) => `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products/${_id}`;

async function getData(_id: string) {
  const res = await fetch(URL(_id));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

type Props = {
  params: { _id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const _id = params._id;

  // fetch data
  const product = await getData(_id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `EDUTUBE | ${product.item.name}`,
    description: product.item.content,
    openGraph: {
      images: [`${product.item.mainImages[0]}`, ...previousImages],
    },
  };
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
