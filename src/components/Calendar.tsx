import React, { useState, useEffect } from 'react'
import CalendarButton from './CalendarButton'
import { CalendarProps, CalendarButtonProps } from '../database/DBType';

const Calendar: React.FC<CalendarProps> = ({ userId, year, month }) => {

  // 날짜 및 요일 정보를 저장하기 위한 state
  const [data, setData] = useState<CalendarButtonProps[]>([]); 

  // 달력을 표시하기 위한 데이터 전처리
  useEffect(() => {
    let newData: CalendarButtonProps[] = [];
    // 달력을 표시하기 위한 날짜 및 요일 계산
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
