'use client';
import Category from '@/components/atom/Category';
import ImageUploader from '@/components/atom/ImageUploader';
import { jobCategoryConst } from '@/helper/constants/categoryConst';
import { extractVideoId, makeVideoSnippet } from '@/helper/utils/youtube';
import useCreateVideoList, {
  VideoData,
  YoutubeSnippet,
} from '@/queries/video/regist/useCreateVideoList';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import VideoRegistList from './VideoRegistList';
import H3 from '@/components/atom/H3';
import useCreateFile from '@/queries/common/useCreateFile';
import useUserInfo from '@/stores/userInfo';

import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/navigation';

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

const VideoRegist = () => {
  const router = useRouter();
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
  const { userInfo } = useUserInfo(store => store);
  const { mutate: createThumbnailMutate } = useCreateFile();
  const { mutate: videoCreateMutate, isPending: isPendingCreateProduct } = useCreateVideoList();

  const [imageFile, setImageFile] = useState<File>();
  const [videoList, setVideoList] = useState<YoutubeSnippet[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    setValue('category', []);
    setValue('videoList', []);
  }, []);

  const onSubmit = (data: RegistFormData) => {
    const videoDataFormat = (fileName: string): VideoData => {
      return {
        name: data.name,
        mainImages: [fileName],
        content: data.content,
        author: userInfo.name,
        profile: userInfo.extra.profileImage.path,
        category: category,
        videoList: videoList,
      };
    };
    const formData = new FormData();
    if (imageFile) {
      formData.append('attach', imageFile);
      createThumbnailMutate(formData, {
        onSuccess: (fileName: string) => {
          videoCreateMutate(videoDataFormat(fileName), {
            onSuccess: () => {
              alert('동영상 플레이 리스트를 등록하였습니다.');
              router.push('/');
            },
          });
        },
        onError: () => {
          alert('썸네일 업로드가 실패하였습니다.');
        },
      });
    } else {
      alert('프로필 사진을 등록해주세요.');
    }
  };

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
      <section className="max-w-xl mx-auto my-16">
        <div className="mb-4">
          <label>
            <H3>썸네일 업로드</H3>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label>
              <H3>제목</H3>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                {...register('name', { required: '제목은 필수 입력입니다.' })}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label>
              <H3>내용</H3>
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
          <div>
            <label>
              <H3>직무 카테고리 선택</H3>
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
            </label>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            <label>
              <H3>동영상 리스트</H3>
              <VideoRegistList
                videos={videoList}
                deleteVideoList={deleteVideoList}
                moveVideoList={moveVideoList}
              />
              <div className="flex gap-1 mt-1">
                <input
                  type="text"
                  placeholder="Youtube 링크를 입력해주세요"
                  {...register('videoUrl')}
                  className="flex-grow p-2 border rounded "
                />
                <button
                  type="button"
                  onClick={addVideoList}
                  className="p-2 bg-red-600 text-white rounded hover:bg-stone-900"
                >
                  <FontAwesomeIcon icon={faYoutube as IconProp} /> 링크 추가
                </button>
              </div>
            </label>
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
