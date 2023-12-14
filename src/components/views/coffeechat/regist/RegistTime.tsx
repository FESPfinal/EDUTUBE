import React, { useState, useEffect } from 'react';

interface TimeValue {
  startTime: string;
}

interface TimeTableItem {
  date: string;
  timeList: string[];
}

interface RegistTimeProps {
  selectedDate: Date;
  timeValues: { [key: string]: TimeValue[] };
  setTimeValues: React.Dispatch<React.SetStateAction<{ [key: string]: TimeValue[] }>>;
  timeTable: TimeTableItem[];
  setTimeTable: React.Dispatch<React.SetStateAction<TimeTableItem[]>>;
}

const RegistTime: React.FC<RegistTimeProps> = ({ selectedDate, timeValues, setTimeValues, timeTable, setTimeTable }) => {
  const [inputSets, setInputSets] = useState<number>(1);
  const [inputValues, setInputValues] = useState<TimeValue[]>(
    timeValues[selectedDate.toISOString()] || [{ startTime: '' }]
  );

  useEffect(() => {
    setInputValues(timeValues[selectedDate.toISOString()] || [{ startTime: '' }]);
    setInputSets(timeValues[selectedDate.toISOString()] ? timeValues[selectedDate.toISOString()].length : 1);
  }, [selectedDate, timeValues]);

  const handleAddSet = () => {
    if (inputSets < 6) {
      setInputSets((prevInputSets) => prevInputSets + 1);
      setInputValues((prevInputValues) => [...prevInputValues, { startTime: '' }]);
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index][field] = value;
    setInputValues(updatedValues);
  };

  const logInputValues = () => {
    const logFormat = {
      date: selectedDate.toString(),
      timeList: inputValues.map(({ startTime }) => startTime),
    };

    const updatedValues = {
      ...timeValues,
      [selectedDate.toISOString()]: inputValues,
    };

    setTimeValues(updatedValues);

    setTimeTable((prevTimeTable) => [
      ...prevTimeTable,
      {
        date: selectedDate.toISOString(),
        timeList: inputValues.map(({ startTime }) => startTime),
      },
    ]);

    console.log('Input values:', logFormat);
    console.log('Time table:', timeTable);
  };

  return (
    <div className='grid grid-cols-2 grid-rows-4 gap-[20px] mt-[40px] relative'>
      {[...Array(inputSets)].map((_, index) => (
        <div key={index} className='flex justify-between border-solid border-light-main border rounded overflow-hidden'>
          <input
            type="time"
            value={inputValues[index].startTime}
            onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
            className='text-[20px] px-[20px] border-none overflow-hidden'
          />
        </div>
      ))}

      <div className='flex gap-[10px] absolute bottom-0 w-full'>
        <button type="button" onClick={handleAddSet} className="p-2 bg-light-main text-white w-full rounded">
          추가
        </button>
        <button type="button" onClick={logInputValues} className="p-2 bg-light-main text-white w-full rounded">
          등록
        </button>
      </div>
    </div>
  );
};

export default RegistTime;
