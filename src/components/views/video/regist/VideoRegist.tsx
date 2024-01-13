'use client';
import Category from '@/components/atom/Category';
import ImageUploader from '@/components/atom/ImageUploader';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VideoList from './VideoList';

const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, '최소 2글자 이상이어야 합니다.')
    .max(30, '최대 30자까지 입력 가능합니다.')
    .required('값을 입력해주세요.'),
  content: yup
    .string()
    .required('내용을 입력해주세요.')
    .min(10, '내용은 최소 10자 이상이어야 합니다.')
    .max(500, '최대 500자까지 입력 가능합니다.'),
  category: yup.array().of(yup.string()).min(1, '최소 1개의 카테고리가 필요합니다.'),
  videoUrl: yup.string(),
});

type RegistFormData = yup.InferType<typeof schema>;

const VideoRegist = () => {
  const { register, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File>();
  const [videoList, setVideoList] = useState<string[]>([]);

  const onSubmit = (data: RegistFormData) => {};

  const handleVideoList = (e: React.MouseEvent) => {
    e.preventDefault();
    const videoUrl = getValues('videoUrl');
    if (videoUrl && youtubeRegex.test(videoUrl)) {
      if (videoList.includes(videoUrl)) {
        return alert('이미 추가된 영상입니다.');
      }
      setVideoList(state => [...state, videoUrl]);
      setValue('videoUrl', '');
    } else {
      alert('올바른 주소를 입력해주세요.');
    }
  };

  return (
    <>
      <section>
        <p>동영상 커리큘럼 만들기</p>
      </section>
      <section className="max-w-md mx-auto my-16">
        <div className="mb-4">
          <label className="block text-gray-700">
            썸네일 업로드
            <ImageUploader onImageUpload={setImageFile} />
          </label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">
              제목
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                {...register('name', { required: '제목은 필수 입력입니다.' })}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              내용
              <input
                type="text"
                placeholder="내용을 입력해주세요"
                {...register('content', {
                  required: '내용은 필수 입력입니다.',
                  minLength: { value: 10, message: '내용은 최소 10자 이상이어야 합니다.' },
                })}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            {/* {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>} */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">직무 카테고리 선택</label>
            <div className="flex mt-2 flex-wrap gap-2 ">
              {/* {jobCategoryConst.map(category => (
                <Category
                  key={category}
                  name={category}
                  setSelectedCategory={({ name }) => {
                    selectedJobCategory[0] == name
                      ? setSelectedJobCategory([])
                      : setSelectedJobCategory([name]);
                  }}
                  selectedCategory={selectedJobCategory[0]}
                />
              ))} */}
            </div>
            {/* [TODO] 카테고리 유효성 검사 추가 */}
          </div>
          <div>
            동영상 리스트
            <VideoList data={videoList} />
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                {...register('videoUrl')}
                className="flex-grow p-2 border rounded "
              />
              <button
                type="button"
                onClick={handleVideoList}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                동영상 추가
              </button>
            </div>
          </div>
          {/* <button
            type="submit"
            className="bg-light-main hover:bg-dark-main text-white p-2 rounded  w-full disabled:bg-dark-disabled"
            disabled={isPendingCreateProduct}
          >
            {isPendingCreateProduct ? '등록 중입니다...' : '등록'}
          </button> */}
        </form>
      </section>
    </>
  );
};

export default VideoRegist;
