'use client';
import Link from 'next/link';

import ThemeButton from '../src/components/atom/ThemeButton';
import ProfileImageUploader from '../src/components/atom/ProfileImageUploader';

export default function Home() {
  const handleImageUpload = (image: File) => {
    // 이 함수를 사용하여 업로드된 이미지를 처리합니다.
    console.log('Uploaded image:', image);
  };
  return (
    <>
      <ThemeButton />
      <ProfileImageUploader onImageUpload={handleImageUpload} />
      <h2>홈 동영상</h2>
      Hello, Web!
      <br />
      <Link href="/video/info/1/1">video info</Link>
      <br />
      <Link href="/coffeechat/info/1">coffee info</Link>
    </>
  );
}
