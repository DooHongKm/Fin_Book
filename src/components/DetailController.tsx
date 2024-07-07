import React from 'react'
import { DetailControllerProps } from '../database/DBType'

const DetailController: React.FC<DetailControllerProps> = ({ year, setYear, month, setMonth, date, setDate }) => {

  // 이전 날짜 이동 버튼
  const prevDate: () => void = () => {
    const prevD: Date = new Date(year, month - 1, date - 1)
    setYear(prevD.getFullYear());
    setMonth(prevD.getMonth() + 1);
    setDate(prevD.getDate());
  }

  // 다음 날짜 이동 버튼
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
