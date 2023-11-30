'use client';

import useSelectCoffeechatInfo from '@/queries/coffeechat/info/useSelectCoffeechatInfo';
import useUpdateCoffeeChat from '@/queries/coffeechat/update/usePatchCoffeeChat';
import { useForm } from 'react-hook-form';
import { ProductType } from '@/helper/types/product';
import { useRouter } from 'next/navigation';

// id불러오기 -> 데이터 불러오기 -> input에 넣기 -> 수정 -> patch
const CoffeeChatUpdate = ({ _id }: { _id: string }) => {
  const { mutate: mutateUpdateCoffeeChat } = useUpdateCoffeeChat();
  const { register, handleSubmit, setValue, getValues } = useForm()
  const router = useRouter();

  const onSubmit = () => {
    const updatedData: ProductType = {
      mainImages: [],
      name: getValues('name'),
      content: getValues('content'),
      price: getValues('price'),
      shippingFees: 0,
      show: true,
      active: true,
      extra: {
        type: 'coffeechat',
        category: getValues('category'),
        intro: getValues('intro'),
        online: getValues('online'),
        offline: getValues('offline'),
        date: getValues(['date']),
        time: getValues(['time']),
        person: getValues('person'),
      },
    };

    mutateUpdateCoffeeChat({_id, requestBody: updatedData}, {
      onSuccess: (data) => {
        console.log(data)
        alert('수정되었습니다');
        router.push(`/coffeechat/info/${_id}`)
        
      },
      onError: (error) => {
        alert('수정에 실패하였습니다');
      },
    });
  }



  const { data: coffeechatDetailData } = useSelectCoffeechatInfo(_id);

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  return (
    <>
      <h1>커피챗 내용 설정</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>이미지 등록</h2>
          <label>
            <input type='text' 
              {...register('mainImages')}
              defaultValue={coffeechatDetailData?.item.mainImages}
              value={getValues('mainImages')}
              onChange={handleInputChange}
              name="mainImages"/>
          </label>
        </div>

        <div>
          <h2>금액</h2>
          <label>
          <input
              type="text"
              placeholder="금액"
              {...register('price')}
              defaultValue={coffeechatDetailData?.item.price}
              value={getValues('price')}
              onChange={handleInputChange}
              name="price"
            />
          </label>
        </div>

        <div>
          <h2>제목 및 내용</h2>
          <label>
            <input
              type="text"
              placeholder="제목"
              {...register('name')}
              defaultValue={coffeechatDetailData?.item.name}
              value={getValues('name')}
              onChange={handleInputChange}
              name="name"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="내용"
              {...register('content')}
              defaultValue={coffeechatDetailData?.item.content}
              value={getValues('content')}
              onChange={handleInputChange}
              name="content"
            />

          </label>
        </div>

        {/* checkbox로 인풋 활성화 / kakaomap api 적용 */}
        <div>
          <h2>장소</h2>
          <label>
            <input 
            type='text' 
            placeholder='온라인' 
            {...register('online')}
            defaultValue={coffeechatDetailData?.item.extra.online}
            value={getValues('online')}
            onChange={handleInputChange}
            name="online"
            />
          </label>
          <label>
            <input 
            type='text' 
            placeholder='오프라인' 
            {...register('offline')}
            defaultValue={coffeechatDetailData?.item.extra.offline}
            value={getValues('offline')}
            onChange={handleInputChange}
            name="offline"
            />
          </label>
        </div>

        {/* 카테고리 버튼으로 수정 예정 */}
        <div>
          <h2>카테고리</h2>
          <label>
            <input
              type='text'
              placeholder='카테고리를 작성해주세요' 
              {...register('category')}
              defaultValue={coffeechatDetailData?.item.extra.category}
              value={getValues('category')}
              onChange={handleInputChange}
              name="category"
              />
          </label>
        </div>

        <div>
          <h2>인원수 & 소개글</h2>
          <label>
            <input
              type='text'
              placeholder='인원수를 작성해주세요'
              {...register('person')}
              defaultValue={coffeechatDetailData?.item.extra.person}
              value={getValues('person')}
              onChange={handleInputChange}
              name="person"
              />
          </label>
          <label>
            <input
              type='text'
              placeholder='소개글을 작성해주세요'
              {...register('intro')}
              defaultValue={coffeechatDetailData?.item.extra.intro}
              value={getValues('intro')}
              onChange={handleInputChange}
              name="intro" />
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
                  placeholder='날짜를 작성해주세요' />
              </label>
            </div>
          ))}

          {[0, 1, 2].map(index => (
            <div key={index}>
              <label>
                <input
                  type='text'
                  placeholder='시간을 작성해주세요' />
              </label>
            </div>
          ))}
        </div>
        <button type='submit'>설정 완료</button>
      </form>
    </>
  );
};


export default CoffeeChatUpdate;