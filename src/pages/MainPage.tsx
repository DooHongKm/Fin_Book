import React from 'react'
import Header from '../components/Header'
import Controller from '../components/Controller'
import Calendar from '../components/Calendar'
import { MainProps } from '../types'

const MainPage: React.FC<MainProps> = ({ userId, yearMonth, setYearMonth }) => {

  return (
    <div className='main-container'>
      <Header/>
      <Controller yearMonth={yearMonth} setYearMonth={setYearMonth}/>
      <Calendar/>
    </div>
  )
}

export default MainPage
