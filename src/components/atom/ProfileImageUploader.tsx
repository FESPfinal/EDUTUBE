'use client';
import React, { useState } from 'react';
import BasicProfile from '../../../public/basicProfile.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { IMAGE_ROUTE } from '@/helper/constants/commons';

interface Props {
  onImageUpload: (image: File) => void;
  defaultImage?: { path: string | StaticImport; name: string };
}

const ProfileImageUploader: React.FC<Props> = ({ onImageUpload, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      onImageUpload(file);
    }
  };

  const handleLabelClick = () => {
    document.getElementById('profileImageInput')?.click();
  };

  return (
    <div>
      <label htmlFor="profileImage">
        {selectedImage ? (
          <div className="h-20 w-20 relative">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Profile"
              className="rounded-full h-20 w-20 object-cover"
              onClick={handleLabelClick}
              width={80}
              height={80}
            />
            <button
              className="bg-light-main text-white rounded-full h-8 w-8 absolute bottom-0 right-0"
              onClick={handleLabelClick}
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
        ) : (
          <div className="h-20 w-20 relative">
            {defaultImage ? (
              <Image
                src={`${IMAGE_ROUTE}${defaultImage.path}`}
                width={80}
                height={80}
                className="rounded-full h-20 w-20 object-cover"
                alt={defaultImage.name}
                unoptimized={true} //TODO: 2023.12.04 이미지 최적화 할 수 있는 방법 찾아야함
              />
            ) : (
              <BasicProfile width="5rem" height="5rem" />
            )}
            <button
              className="bg-light-main text-white rounded-full h-8 w-8 absolute bottom-0 right-0"
              onClick={handleLabelClick}
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
        )}
      </label>
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImageUploader;
