/**
 * YYYY/MM/DD 형식으로 date를 변환해주는 함수
 * @param date new Date(a.date).getTime()으로 설정한 값을 넘겨주세요
 * @returns `${year}/${month}/${day}`
 */
export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const formatTime = (date: string) => {
  const t = new Date(date);
  return t.toLocaleTimeString();
};

/**
 * 예약된 시간과 현재 시간의 차를 밀리초단위로 계산하는 함수
 * @param datetime string 예약된 일자 및 시간
 * @returns 계산된 밀리초 차
 */
export const calculateTimeDifferenceInMinutes = (datetime: string) => {
  // 현재 시간
  const currentTime = new Date();

  // 비교할 날짜
  const reservedDate = new Date(datetime);

  // 두 시간 사이의 차이를 밀리초로 계산
  const differenceInMilliseconds = reservedDate.getTime() - currentTime.getTime();

  return differenceInMilliseconds;
};

/**
 * 예약된 시간과 현재 시간의 차이가 커피챗 시작 전 10분과 커피챗 시작 후 60분 이내일 때 true 값 반환하는 함수
 * @param datetime string 예약된 일자 및 시간
 * @returns boolean
 */
export const isBetweenTenToHour = (datetime: string) => {
  const tenMinutes = 10;
  const tenMinMilliseconds = tenMinutes * 60 * 1000; // 1분 = 60초, 1초 = 1000밀리초

  const hour = 60;
  const oneHourMilliseconds = hour * 60 * 1000; // 1분 = 60초, 1초 = 1000밀리초

  const isLessThanTen = calculateTimeDifferenceInMinutes(datetime) <= tenMinMilliseconds;
  const isMoreThanHour = calculateTimeDifferenceInMinutes(datetime) <= -oneHourMilliseconds;
  return isLessThanTen && isMoreThanHour;
};
