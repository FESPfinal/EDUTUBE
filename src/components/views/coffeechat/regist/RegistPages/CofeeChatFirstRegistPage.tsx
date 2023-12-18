import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Step1RegistData } from '@/helper/types/product';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BlockStepper from '@/components/block/BlockStepper';

// validate
const schema = yup.object().shape({
  image: yup.mixed().required('이미지를 등록해주세요'),

  name: yup.string().min(1, '1자 이상 입력하세요').required('커피챗 제목을 작성해주세요'),

  content: yup.string().min(10, '10자 이상 입력하세요').required('커피챗 상세 내용을 작성해주세요'),

  intro: yup.string().min(1, '1자 이상 입력하세요').required('커피챗 소개글을 작성해주세요'),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  getData: (data: Step1RegistData) => void;
}

const CoffeeChatFirstRegistPage = ({ getData }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [selectedImage, setSelectedImage] = useState<string | null>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue('image', file);
    }
  };

  const nameValue = watch('name');
  const contentValue = watch('content');
  const introValue = watch('intro');
  const imgValue = watch('image');

  const onSubmit = (data: FormData) => {
    getData({
      image: [data.image],
      name: data.name,
      content: data.content,
      shippingFees: 0,
      show: true,
      active: true,
      extra: {
        intro: data.intro,
      },
    });
    console.log(data)
  };

  return (
    <div className="flex">
      <BlockStepper nameValue={nameValue} contentValue={contentValue} introValue={introValue} imgValue={imgValue} errors={errors} />
      <form className="ml-[332px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-[100px]">
          {/* 이미지 업로드 시작 */}
          <div className="w-[793px] mx-auto mb-11">
            <h1 className="mb-10 text-[45px]">커피챗 내용 설정</h1>
            <label htmlFor="image" className="text-[30px] cursor-pointer">
              이미지 업로드
              <input
                id="image"
                type="file"
                className="hidden"
                {...register('image', {
                  required: '이미지를 등록해주세요',
                })}
                onChange={handleImageUpload}
              />
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="커피챗 등록 이미지"
                  width={793}
                  height={369}
                  className="rounded-[20px] w-[793px] h-[369px] object-cover"
                />
              ) : (
                <Image
                  src="/images/coffeechatImg.svg"
                  alt="커피챗 등록 이미지"
                  width={793}
                  height={369}
                  className="rounded-[20px] w-[793px] h-[369px] object-cover"
                />
              )}
            </label>
            <strong className="text-light-error">{errors.image?.message}</strong>
          </div>
          {/* 이미지 업로드 끝 */}

          {/* 제목, 내용, 소개글 input 시작 */}
          <div className="w-[792px] mx-auto">
            <label htmlFor="name" className="block mb-0 text-[30px]">
              제목
            </label>
            <input
              id="name"
              type="text"
              className="w-full border-b border-black border-t-0 border-r-0 border-l-0 focus:border-transparent"
              {...register('name', { required: '커피챗 제목을 작성해주세요' })}
            />
            <strong className="text-light-error">{errors.name?.message}</strong>

            <label htmlFor="content" className="block mt-[76px] text-[30px]">
              상세 내용
            </label>
            <input
              id="content"
              type="text"
              className="w-full border-b border-black border-t-0 border-r-0 border-l-0"
              {...register('content', { required: '커피챗 상세 내용을 작성해주세요' })}
            />
            <strong className="text-light-error">{errors.content?.message}</strong>

            <label htmlFor="intro" className="block mt-[76px] text-[30px]">
              소개글
            </label>
            <input
              id="intro"
              type="text"
              className="w-full border-b border-black border-t-0 border-r-0 border-l-0"
              {...register('intro', { required: '커피챗 소개글을 작성해주세요' })}
            />
            <strong className="text-light-error">{errors.intro?.message}</strong>

            <button type="submit" className="bg-light-main py-7 rounded text-white w-full mt-[76px]">
              다음 설정으로 이동
            </button>
          </div>
          {/* 제목, 내용, 소개글 input 끝 */}
        </div>
      </form>
    </div>
  );
};

export default CoffeeChatFirstRegistPage;
