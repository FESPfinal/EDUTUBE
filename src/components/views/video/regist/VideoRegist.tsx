'use client';
import Category from '@/components/atom/Category';
import ImageUploader from '@/components/atom/ImageUploader';
import { jobCategoryConst } from '@/helper/constants/categoryConst';
import { extractVideoId, makeVideoSnippet } from '@/helper/utils/youtube';
import useCreateVideoList from '@/queries/video/regist/useCreateVideoList';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VideoList from './VideoList';

const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

const videoSchema = yup.object().shape({
  _id: yup.string(),
  channelId: yup.string(),
  title: yup.string(),
  description: yup.string(),
  thumbnails: yup.string(),
  channelTitle: yup.string(),
  link: yup.string(),
});

const schema = yup.object().shape({
  image: yup
    .mixed()
    .test('string', '이미지 파일이 필요합니다.', value => value !== null && value !== undefined),
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
  videoList: yup.array().of(videoSchema).min(2, '최소 2개의 동영상이 필요합니다.'),
});

type RegistFormData = yup.InferType<typeof schema>;

export type YoutubeSnippet = {
  _id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: string;
  channelTitle: string;
  link: string;
};

const VideoRegist = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { mutate: videoCreateMutate, isPending: isPendingCreateProduct } = useCreateVideoList();

  const [imageFile, setImageFile] = useState<File>();
  const [videoList, setVideoList] = useState<YoutubeSnippet[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    setValue('category', []);
    setValue('videoList', []);
  }, []);

  const onSubmit = (data: RegistFormData) => {};

  const addVideoList = async (e: React.MouseEvent) => {
    e.preventDefault();
    const videoUrl = getValues('videoUrl');
    const videoId = videoUrl && extractVideoId(videoUrl);
    if (videoId && videoUrl && youtubeRegex.test(videoUrl)) {
      if (videoList.map(video => video._id).includes(videoId)) {
        return alert('이미 추가된 영상입니다.');
      }
      const videoSnippet = await makeVideoSnippet(videoId, videoUrl);
      setVideoList(state => [...state, videoSnippet]);
      setValue('videoList', [...videoList, videoSnippet]);
      await trigger('videoList');
      setValue('videoUrl', '');
    } else {
      alert('올바른 주소를 입력해주세요.');
    }
  };

  const deleteVideoList = async (videoId: string) => {
    setVideoList(state => state.filter(video => video._id !== videoId));
    setValue(
      'videoList',
      videoList.filter(video => video._id !== videoId),
    );
    await trigger('videoList');
  };

  const moveVideoList = async (movedVideos: YoutubeSnippet[]) => {
    setVideoList(movedVideos);
    setValue('videoList', movedVideos);
    await trigger('videoList');
  };
  return (
    <>
      <section>
        <p>동영상 커리큘럼 만들기</p>
      </section>
      <section className="max-w-xl mx-auto my-16">
        <div className="mb-4">
          <label className="block text-gray-700">
            썸네일 업로드
            <ImageUploader
              onImageUpload={async e => {
                setImageFile(e);
                setValue('image', `${e}`);
                await trigger('image');
              }}
            />
          </label>
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
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
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">직무 카테고리 선택</label>
            <div className="flex mt-2 flex-wrap gap-2 ">
              {jobCategoryConst.map(jobCategory => (
                <Category
                  key={jobCategory}
                  name={jobCategory}
                  setSelectedCategory={async ({ name }) => {
                    if (category[0] == name) {
                      setCategory([]);
                      setValue('category', []);
                    } else {
                      setCategory([name]);
                      setValue('category', [name]);
                    }
                    await trigger('category');
                  }}
                  selectedCategory={category[0]}
                />
              ))}
            </div>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            동영상 리스트
            <VideoList
              videos={videoList}
              deleteVideoList={deleteVideoList}
              moveVideoList={moveVideoList}
            />
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                {...register('videoUrl')}
                className="flex-grow p-2 border rounded "
              />
              <button
                type="button"
                onClick={addVideoList}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                동영상 추가
              </button>
            </div>
            {errors.videoList && <p className="text-red-500 text-sm">{errors.videoList.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-light-main hover:bg-dark-main text-white p-2 rounded  w-full disabled:bg-dark-disabled"
            disabled={isPendingCreateProduct}
          >
            {isPendingCreateProduct ? '등록 중입니다...' : '등록'}
          </button>
        </form>
      </section>
    </>
  );
};

export default VideoRegist;
