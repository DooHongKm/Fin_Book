import React, { useState, useEffect } from 'react'
import CalendarButton from './CalendarButton'
import { MainInfo } from '../pages/MainPage'

export interface CalendarButtonProps extends MainInfo {
  date: number | null
  day: number
}

const Calendar: React.FC<MainInfo> = ({ userId, year, month }) => {

  const [data, setData] = useState<CalendarButtonProps[]>([]); 

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
      newData.push({ userId: userId, year:year, month:month, date:null, day:dayCount});
      dayCount = (dayCount + 1) % 7
    }
    for (let i: number = 0; i < count; i++) {
      newData.push({ userId: userId, year:year, month:month, date:i+1, day:dayCount});
      dayCount = (dayCount + 1) % 7
    }
    for (let i: number = 0; i < postCount; i++) {
      newData.push({ userId: userId, year:year, month:month, date:null, day:dayCount});
      dayCount = (dayCount + 1) % 7
    }

    setData(newData);
  }, [year, month])

  return (
    <div className='calendar-container'>
      <div className='calendar-inner-container'>
        {data.map((item, index) => (
          <CalendarButton
            key={index}
            userId={item.userId}
            year={item.year}
            month={item.month}
            date={item.date}
            day={item.day}
          />
        ))}
      </div>
    </div>
  )
}

export default Calendar
