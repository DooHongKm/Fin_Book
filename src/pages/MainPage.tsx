import React from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import { Month } from '../App'

interface MainPageProps {
  userId: string
  yearMonth: {
    year: number
    month: number
  }
  setYearMonth: React.Dispatch<React.SetStateAction<Month>>
}

const MainPage: React.FC<MainPageProps> = ({ userId, yearMonth, setYearMonth }) => {

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
    <div className='main-container'>
      <Header/>
      <div className='calendar-title-container'>
        <button onClick={prevMonth}>◀</button>
        <h1>{yearMonth.year}년 {yearMonth.month}월</h1>
        <button onClick={nextMonth}>▶</button>
      </div>
      <Calendar/>
    </div>
  )
}

export default MainPage
