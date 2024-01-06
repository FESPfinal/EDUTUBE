import VideoMain from '@/components/views/video/VideoMain';

const URL = `${process.env.NEXT_PUBLIC_EDUTUBE_API}/products`;

async function getData() {
  const res = await fetch(URL, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home = async () => {
  const data = await getData();
  return <VideoMain initData={data.item} />;
};

export default Home;
