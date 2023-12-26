'use client';

import { useState } from 'react';

interface Props {
  type: string;
  message: string;
  isShow: boolean;
}

function ToastBar({ type, message, isShow = false }: Props) {
  const [showAlert, setShowAlert] = useState(isShow);

  if (!showAlert) {
    return null;
  }

  const toastTypes = {
    OK: 'bg-green-100 text-green-900',
    INFO: 'bg-sky-100 text-sky-900',
    ALERT: 'bg-red-100 text-red-900',
    WARNING: 'bg-orange-100 text-orange-900',
  } as { [key in string]: string };

  const toastIconTypes = {
    OK: 'bg-green-100 text-green-900',
    INFO: 'bg-sky-100 text-sky-900',
    ALERT: 'bg-red-100 text-red-900',
    WARNING: 'bg-orange-100 text-orange-900',
  } as { [key in string]: string };

  return (
    <div className={`px-6 py-4 border-0 rounded relative mb-4 ${toastTypes[type]}`}>
      <span className="inline-block align-middle mr-8">{message}</span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => setShowAlert(false)}
      >
        <span>×</span>
      </button>
    </div>
  );
}

export default ToastBar;
