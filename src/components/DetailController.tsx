import React from 'react'
import { MainControllerProps } from './MainController';

interface DetailControllerProps extends MainControllerProps {
  date: number;
  setDate: React.Dispatch<React.SetStateAction<number>>;
}

const DetailController: React.FC<DetailControllerProps> = ({ year, setYear, month, setMonth, date, setDate }) => {

  const prevDate: () => void = () => {
    const prevD: Date = new Date(year, month - 1, date - 1)
    setYear(prevD.getFullYear());
    setMonth(prevD.getMonth() + 1);
    setDate(prevD.getDate());
  }

  const nextDate: () => void = () => {
    const nextD: Date = new Date(year, month - 1, date + 1)
    setYear(nextD.getFullYear());
    setMonth(nextD.getMonth() + 1);
    setDate(nextD.getDate());
  }

  return (
    <div className='detail-controller-container'>
      <button onClick={prevDate}>◀</button>
      <h1>{year}년 {month}월 {date}일</h1>
      <button onClick={nextDate}>▶</button>
    </div>
  )
}

export default DetailController
