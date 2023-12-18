import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import './RegistCalendarStyle.css';
import RegistTime from '../RegistTime';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

type TimeValue = {
  startTime: string;
}

type TimeEntry = {
  date: string;
}

interface Props {}

const RegistCalendar: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeValues, setTimeValues] = useState<{ [key: string]: TimeValue[] }>({});
  const [timeTable, setTimeTable] = useState<TimeEntry[]>([]);

  const handleDateChange = (date: Date | Date[]) => {
    setSelectedDate(Array.isArray(date) ? null : date);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = new Date();
    const isPastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
    );

    return date <= isPastDate;
  };

  const isRegistDate = ({ date }: { date: Date }) => {
    const dateString = date.toISOString();
    return timeTable.find((entry) => entry.date === dateString) ? 'regist-date' : '';
  };

  useEffect(() => {
    if (selectedDate) {
      setTimeValues((prevTimeValues) => ({
        ...prevTimeValues,
        [selectedDate.toISOString()]: prevTimeValues[selectedDate.toISOString()] || [{ startTime: '' }],
      }));
    }
  }, [selectedDate]);

  return (
    <div className='flex gap-[60px]'>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDetail='month'
        tileDisabled={tileDisabled}
        calendarType='gregory'
        formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        tileClassName={isRegistDate}
      />

      {selectedDate && (
        <RegistTime
          key={selectedDate.toISOString()}
          selectedDate={selectedDate}
          timeValues={timeValues}
          setTimeValues={setTimeValues}
          timeTable={timeTable}
          setTimeTable={setTimeTable}
        />
      )}
    </div>
  );
};

export default RegistCalendar;