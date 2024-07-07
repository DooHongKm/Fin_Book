import React from 'react'
import { MainControllerProps } from '../database/DBType'

const MainController: React.FC<MainControllerProps> = ({ year, setYear, month, setMonth }) => {

  // 이전 달 이동 버튼
  const prevMonth: () => void = () => {
    if (month === 1) {
      setYear(prevState => prevState - 1)
      setMonth(12)
    } else {
      setMonth(prevState => prevState - 1)
    }
  }

  // 다음 달 이동 버튼
  const nextMonth: () => void = () => {
    if (month === 12) {
      setYear(prevState => prevState + 1)
      setMonth(1)
    } else {
      setMonth(prevState => prevState + 1)
    }
  }

  return (
    <div className='main-controller-container'>
      <button onClick={prevMonth}>◀</button>
      <h1>{year}년 {month}월</h1>
      <button onClick={nextMonth}>▶</button>
    </div>
  )
}

export default MainController
