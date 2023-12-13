'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RatingStarGroup from '@/components/atom/RatingStarGroup';
import { useState, useEffect } from 'react';

interface IFormInput {
  rating: number;
  review: string;
}

const CoffeechatReplyCreate = () => {
  const schema = Yup.object().shape({
    rating: Yup.number().required('별점을 선택해주세요').min(1, '별점을 선택해주세요').max(5, '별점을 선택해주세요'),
    review: Yup.string().required('후기 내용을 입력해주세요'),
  });

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [selectedRate, setSelectedRate] = useState<number>(3);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {

    console.log('data', data);
  };

  useEffect(() => {
    // rating이 변경될 때 setValue를 사용하여 값을 설정
    setValue('rating', selectedRate);
  }, [selectedRate, setValue]);

  return (
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
            name="review"
            render={({ field }) => (
              <textarea {...field} />
            )}
          />
        </label>
        {errors.review && <p>{errors.review.message}</p>}
      </div>

      <button type="submit">등록</button>
    </form>
  );
}

export default CoffeechatReplyCreate;