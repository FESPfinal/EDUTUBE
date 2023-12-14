'use client';
import { useState } from 'react';
import useCreateProduct from '@/queries/coffeechat/useCreateProduct';
import useGetUserInfo from '@/queries/coffeechat/useGetUserInfo';
import { ProductType } from '@/helper/types/product';
import { useRouter } from 'next/navigation';

const FirstRegist = () => {
  const router = useRouter();
  const { mutate: mutateCreateProduct } = useCreateProduct();
  const { data: userData } = useGetUserInfo('');
  const [image, setImage] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [online, setOnline] = useState('');
  const [offline, setOffline] = useState('');
  const [category, setCategory] = useState('');
  const [intro, setIntro] = useState('');
  const [person, setPerson] = useState('');
  const type = 'coffeechat';
  const shippingFees = 0;
  const show = true;
  const active = true;

  // react-hook-form으로 변경
  const handleSubmit = async () => {
    const requestBody: ProductType = {
      mainImages: image,
      name: title,
      content: content,
      price: parseInt(price),
      shippingFees: shippingFees,
      show: show,
      active: active,
      extra: {
        type: type,
        category: category,
        intro: intro,
        online: online,
        offline: offline,
        date: dates,
        time: times,
        person: person,
        userData: userData || '',
      },
    };

    // mutateCreateProduct(requestBody, {
    //   onSuccess: data => {
    //     alert('등록되었습니다');
    //     router.push('/coffeechat');
    //   },
    //   onError: error => {
    //     alert('등록에 실패하였습니다');
    //   },
    // });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0].name;
      setImage([file]);
    }

    // react 캘린더 적용후 삭제 에정
    const handleDateChange = (index: number, value: string) => {
      const newDates = [...dates];
      newDates[index] = value;
      setDates(newDates);
    };

    const handleTimeChange = (index: number, value: string) => {
      const newTimes = [...times];
      newTimes[index] = value;
      setTimes(newTimes);
    };
    // react 캘린더 적용후 삭제 에정 //

    return (
      <>
        <h1>커피챗 내용 설정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>이미지 등록</h2>
            <label>
              <input type="file" onChange={handleImageUpload} />
            </label>
          </div>

          <div>
            <h2>금액</h2>
            <label>
              <input type="text" placeholder="금액" onChange={e => setPrice(e.target.value)} />
            </label>
          </div>

          <div>
            <h2>제목 및 내용</h2>
            <label>
              <input type="text" placeholder="제목" onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
              <input type="text" placeholder="내용" onChange={e => setContent(e.target.value)} />
            </label>
          </div>

          {/* checkbox로 인풋 활성화 / kakaomap api 적용 */}
          <div>
            <h2>장소</h2>
            <label>
              <input type="text" placeholder="온라인" onChange={e => setOnline(e.target.value)} />
            </label>
            <label>
              <input
                type="text"
                placeholder="오프라인"
                onChange={e => setOffline(e.target.value)}
              />
            </label>
          </div>

          {/* 카테고리 버튼으로 수정 예정 */}
          <div>
            <h2>카테고리</h2>
            <label>
              <input
                type="text"
                placeholder="카테고리를 작성해주세요"
                onChange={e => setCategory(e.target.value)}
              />
            </label>
          </div>

          <div>
            <h2>인원수 & 소개글</h2>
            <label>
              <input
                type="text"
                placeholder="인원수를 작성해주세요"
                onChange={e => setPerson(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="소개글을 작성해주세요"
                onChange={e => setIntro(e.target.value)}
              />
            </label>
          </div>

          {/* react calendar로 수정예정 */}
          <div>
            <h2>날짜 & 시간</h2>
            {[0, 1, 2].map(index => (
              <div key={index}>
                <label>
                  <input
                    type="text"
                    placeholder="날짜를 작성해주세요"
                    value={dates[index] || ''}
                    onChange={e => handleDateChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}

            {[0, 1, 2].map(index => (
              <div key={index}>
                <label>
                  <input
                    type="text"
                    placeholder="시간을 작성해주세요"
                    value={times[index] || ''}
                    onChange={e => handleTimeChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
          <button type="submit">설정 완료</button>
        </form>
      </>
    );
  };
};
export default FirstRegist;
