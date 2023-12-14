'use client'
import RegistButton from '@/components/atom/Button';
import RatingStarGroup from '@/components/atom/RatingStarGroup';
import { replyData } from '@/helper/types/reply';
import useCreateReply from '@/queries/coffeechat/review/useCreateReply';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  rating: yup.number().required('별점을 선택해주세요').min(1, '별점을 선택해주세요').max(5, '별점을 선택해주세요'),
  content: yup.string().required('후기 내용을 입력해주세요'),
});

type FormData = yup.InferType<typeof schema>;

const ReplyCreateModal = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams()
  const orderId = parseInt(params?._id as string);
  const productId = parseInt(searchParams?.get('parents_id') || '0');
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { mutate: mutateCreateReply } = useCreateReply();
  const [selectedRate, setSelectedRate] = useState<number>(0);

  useEffect(() => {
    setValue('rating', selectedRate);
  }, [selectedRate, setValue]);

  const onSubmit = (data: FormData) => {
    if (productId == 0) {
      alert('전송에 실패하였습니다. 상품을 불러오지 못했습니다.');
      return;
    }
    const requestBody: replyData = {
      order_id: orderId, //주문번호
      product_id: productId, //product번호
      rating: data.rating,
      content: data.content,
    }
    mutateCreateReply(requestBody, {
      onSuccess: () => {
        alert('리뷰가 성공적으로 등록되었습니다.');
        router.back();
      },
      onError: error => {
        //@ts-ignore
        alert('리뷰 등록이 실패하였습니다.');
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className=" flex justify-end items-center" ><FontAwesomeIcon onClick={() => router.back()} icon={faCircleXmark} size="xl" className="cursor-pointer text-light-main " /></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 text-center">
        <h2 className="font-bold text-xl mb-6">리뷰를 남겨주세요</h2>
        <div className="flex justify-start gap-4">
          <label>
            <RatingStarGroup isReadOnly={false} defaultRate={0} setSelectedRate={setSelectedRate} />
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <input type="number" {...field} value={selectedRate} readOnly className="hidden" />
              )}
            />
          </label>
          {errors.rating && <p className="text-light-error text-sm leading-6">{errors.rating.message}</p>}
        </div>
        <div className="text-left">
          <label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <textarea className="w-full rounded-lg h-20" {...field}
                  placeholder="여기에 후기를 작성해주세요." />
              )}
            />
          </label>
          {errors.content && <p className="text-light-error text-sm">{errors.content.message}</p>}
        </div>
        <RegistButton content="후기 등록하기" size="medium" type="submit" />
      </form>
    </div>
  )
}
export default ReplyCreateModal;