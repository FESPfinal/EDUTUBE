'use client';
import { useState, useEffect } from 'react';
import useCreateProduct from '@/queries/coffeechat/useCreateProduct';
import axiosGet from '@/queries/coffeechat/useGetUserInfo';


interface RequestBody {
  mainImages: string[];
  name: string;
  content: string;
  price: string;
  shippingFees: number;
  show: boolean;
  active: boolean;
  extra: {
    type: string;
    category: string;
    intro: string;
    online: string;
    offline: string;
    date: string[];
    time: string[];
    person: string;
    userData: string;
  };
}

const FirstRegist = () => {
  const { mutate: mutateCreateProduct } = useCreateProduct();
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
  const [userData, setUserData] = useState('');
  const type = 'coffeechat';
  const shippingFees = 0;
  const show = true;
  const active = true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axiosGet();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUserData();
  }, []);  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody: RequestBody = {
      mainImages: image,
      name: title,
      content: content,
      price: price,
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
        userData: userData
      },
    };

    mutateCreateProduct(requestBody, {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0].name;
    setImage([file]);
  };

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
            <input type='file' onChange={handleImageUpload} />
          </label>
        </div>

        <div>
          <h2>금액</h2>
          <label>
            <input type='text' placeholder='금액' onChange={e => setPrice(e.target.value)} />
          </label>
        </div>

        <div>
          <h2>제목 및 내용</h2>
          <label>
            <input type='text' placeholder='제목' onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            <input type='text' placeholder='내용' onChange={e => setContent(e.target.value)} />
          </label>
        </div>

        {/* checkbox로 인풋 활성화 / kakaomap api 적용 */}
        <div>
          <h2>장소</h2>
          <label>
            <input type='text' placeholder='온라인' onChange={e => setOnline(e.target.value)} />
          </label>
          <label>
            <input type='text' placeholder='오프라인' onChange={e => setOffline(e.target.value)} />
          </label>
        </div>

        {/* 카테고리 버튼으로 수정 예정 */}
        <div>
          <h2>카테고리</h2>
          <label>
            <input
              type='text'
              placeholder='카테고리를 작성해주세요'
              onChange={e => setCategory(e.target.value)}
            />
          </label>
        </div>

        <div>
          <h2>인원수 & 소개글</h2>
          <label>
            <input
              type='text'
              placeholder='인원수를 작성해주세요'
              onChange={e => setPerson(e.target.value)}
            />
          </label>
          <label>
            <input
              type='text'
              placeholder='소개글을 작성해주세요'
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
                  type='text'
                  placeholder='날짜를 작성해주세요'
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
                  type='text'
                  placeholder='시간을 작성해주세요'
                  value={times[index] || ''}
                  onChange={e => handleTimeChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
        <button type='submit'>설정 완료</button>
      </form>
    </>
  );
};

export default FirstRegist;
