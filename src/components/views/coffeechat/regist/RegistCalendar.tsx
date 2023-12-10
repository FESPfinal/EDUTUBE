import { useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import './RegistCalendarStyle.css';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

const RegistCalendar = ({onDateChange }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (e) => {
    const startDateFormat = moment(e[0]).format('YYYY.MM.DD');
    const endDateFormat = moment(e[1]).format('YYYY.MM.DD');
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);

    const datesBetween = [];
    let currentDate = moment(startDateFormat);
    const endDateMoment = moment(endDateFormat);

    while (currentDate.isSameOrBefore(endDateMoment)) {
      datesBetween.push(currentDate.format('YYYY.MM.DD'));
      currentDate.add(1, 'day');
    }

    setSelectedDates(datesBetween);
    onDateChange(startDateFormat, endDateFormat);
  };

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;
    const isPastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
    );

    return  date <= isPastDate;
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        minDetail='month'
        tileDisabled={tileDisabled}
        calendarType='US'
        selectRange={true}
        formatDay={(locale, date) => moment(date).format('DD')}
      />
      {selectedDates.map((date) => (
        <p key={date}>{date}</p>
      ))}
    </div>
  );
};

export default RegistCalendar;
