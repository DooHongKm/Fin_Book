// import
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CalendarButton from './CalendarButton';
import { CalendarButtonProps } from '../database/DBType';
import '../styles/Calendar.css';

// calendar component
const Calendar: React.FC = () => {

  // redux state
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));

  // local state
  const [data, setData] = useState<CalendarButtonProps[]>([]); 

  // data preprocessing
  useEffect(() => {
    let newData: CalendarButtonProps[] = [];
    const firstDate: Date = new Date(year, month - 1, 1);
    const lastDate: Date = new Date(year, month, 0);
    const firstDay: number = firstDate.getDay();
    const preCount: number = firstDay;
    const count: number = lastDate.getDate();
    const postCount: number = 42 - preCount - count;
    let dayCount: number = 0;
    for (let i: number = 0; i < preCount; i++) {
      newData.push({ date:null, day:dayCount});
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < count; i++) {
      newData.push({ date:i+1, day:dayCount});
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < postCount; i++) {
      newData.push({ date:null, day:dayCount});
      dayCount = (dayCount + 1) % 7;
    }
    setData(newData);
  }, [year, month]);

  // return
  return (
    <div className='calendar-container'>
      <div className='calendar-inner-container'>
        {data.map((item, index) => (
          <CalendarButton
            key={index}
            date={item.date}
            day={item.day}
          />
        ))}
      </div>
    </div>
  )
}

// export
export default Calendar;
