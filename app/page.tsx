import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2>홈 동영상</h2>
      Hello, Web!
      <br />
      <Link href="/video/info/1/1">video info</Link>
      <br />
      <Link href="/coffeechat/info/1">coffee info</Link>
    </>
  );
}
