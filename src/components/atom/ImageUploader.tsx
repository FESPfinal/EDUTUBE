'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '@/helper/constants/apiConst';

interface Props {
  onImageUpload: (image: File) => void;
  defaultImage?: string;
}

const ImageUploader = ({ onImageUpload, defaultImage }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
  }, [defaultImage])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      onImageUpload(file);
    }
  };

  const handleLabelClick = (event: React.MouseEvent) => {
    event.preventDefault();
    document.getElementById('ImageInput')?.click();
  };

  const handleCloseClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedImage(null);
  }

  return (
    <div>
      <label htmlFor="Image">
        {selectedImage ? (
          <div className="h-50 w-full relative">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Profile"
              className="h-80 w-full object-cover rounded-lg cursor-pointer"
              width={80}
              height={80}
            />
            <button
              className="text-light-main rounded-full h-12 w-12 absolute top-0 right-0"
              onClick={handleCloseClick}
            >
              <FontAwesomeIcon className="text-2xl" icon={faCircleXmark} />
            </button>
          </div>
        ) : (
          <div className="h-50 w-full ">
            {defaultImage ? (
              <div className="relative">
                <Image
                  src={`${SERVER_URL}${defaultImage}`}
                  width={80}
                  height={80}
                  className="h-80 w-full object-cover rounded-lg"
                  alt={defaultImage}
                  unoptimized={true}
                />
                <button
                  className="text-light-main rounded-full h-12 w-12 absolute top-0 right-0"
                  onClick={handleLabelClick}
                >
                  <FontAwesomeIcon className="text-2xl" icon={faImage} />
                </button>
              </div>
            ) : (
              <>
                <button type="button" onClick={handleLabelClick} className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer w-full">
                  <div className="text-center  ">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center font-semibold mx-auto ">
                      <span className="w-full">Upload a file</span>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </button>
              </>
            )}
          </div>
        )
        }
      </label >
      <input
        type="file"
        id="ImageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div >
  );
};

export default ImageUploader;
