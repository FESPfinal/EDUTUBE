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
