'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RatingStarGroup from '@/components/atom/RatingStarGroup';
import { useState, useEffect } from 'react';
import useCreateReply from '@/queries/coffeechat/review/useCreateReply'
import { replyData } from '@/helper/types/reply'
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  rating: yup.number().required('별점을 선택해주세요').min(1, '별점을 선택해주세요').max(5, '별점을 선택해주세요'),
  content: yup.string().required('후기 내용을 입력해주세요'),
});

type FormData = yup.InferType<typeof schema>;

const ReplyCreateModal = () => {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { mutate: mutateCreateReply } = useCreateReply();

  const [selectedRate, setSelectedRate] = useState<number>(3);

  useEffect(() => {
    // rating이 변경될 때 setValue를 사용하여 값을 설정
    setValue('rating', selectedRate);
  }, [selectedRate, setValue]);

  const onSubmit = (data: FormData) => {
    const requestBody: replyData = {
      order_id: 29, //주문번호
      product_id: 116, //product번호
      rating: data.rating,
      content: data.content,
    }
    console.log(requestBody)
    mutateCreateReply(requestBody, {
      onSuccess: () => {
        alert('리뷰가 성공적으로 등록되었습니다.');
        router.back();
      },
      onError: error => {
        console.log('error>>>>', error);
        alert('리뷰 등록이 실패하였습니다.');
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <RatingStarGroup isReadOnly={false} defaultRate={3} setSelectedRate={setSelectedRate} />
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <input type="number" {...field} value={selectedRate} readOnly className="hidden" />
              )}
            />
          </label>
          {errors.rating && <p>{errors.rating.message}</p>}
        </div>
        <div>
          <label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <textarea {...field} />
              )}
            />
          </label>
          {errors.content && <p>{errors.content.message}</p>}
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  )
}
export default ReplyCreateModal;