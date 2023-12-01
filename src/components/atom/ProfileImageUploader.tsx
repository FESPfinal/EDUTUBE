'use client';
import React, { useState } from 'react';
import BasicProfile from '../../../public/basicProfile.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onImageUpload: (image: File) => void;
}

const ProfileImageUploader: React.FC<Props> = ({ onImageUpload }) => {
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
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Profile"
            className="rounded-full h-20 w-20 object-cover"
            onClick={handleLabelClick}
          />
        ) : (
          <div className="h-20 w-20 relative">
            <BasicProfile width="5rem" height="5rem" />
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
