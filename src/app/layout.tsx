import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDUTUBE",
  description: "원하는 강의만 모아서 볼 수 있어요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <h1>
          <a href="/">WEB</a>
        </h1>
        <ol>
          <li>
            <a href="/read/1">html</a>
          </li>
          <li>
            <a href="/read/2">css</a>
          </li>
        </ol>
        {children}
        <ul>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a href="/update">Update</a>
          </li>
          <input type="button" value="delete" />
        </ul>
      </body>
    </html>
  );
}
