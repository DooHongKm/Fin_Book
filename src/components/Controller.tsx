import React from 'react'
import { ControllerProps } from '../types'

const Controller: React.FC<ControllerProps> = ({ yearMonth, setYearMonth }) => {

  const prevMonth: () => void = () => {
    if (yearMonth.month === 1) {
      setYearMonth({year: yearMonth.year - 1, month: 12})
    } else {
      setYearMonth(prevState => ({...prevState, month: yearMonth.month - 1}))
    }
  }

  const nextMonth: () => void = () => {
    if (yearMonth.month === 12) {
      setYearMonth({year: yearMonth.year + 1, month: 1})
    } else {
      setYearMonth(prevState => ({...prevState, month: yearMonth.month + 1}))
    }
  }

  return (
    <div className='controller-container'>
      <button onClick={prevMonth}>◀</button>
      <h1>{yearMonth.year}년 {yearMonth.month}월</h1>
      <button onClick={nextMonth}>▶</button>
    </div>
  )
}

export default Controller
