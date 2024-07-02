import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import StatPage from './pages/StatPage'
import PostingPage from './pages/PostingPage'
import { Month } from './types'

const App: React.FC = () => {

  const [userId, setUserId] = useState<string>('');
  const [yearMonth, setYearMonth] = useState<Month>({year: 0, month: 0});
  const [date, setDate] = useState<number>(0)

  useEffect(() => {
    const date_: Date = new Date();
    const year_: number = date_.getFullYear()
    const month_: number = date_.getMonth() + 1
    setYearMonth({ year: year_, month: month_ });
  }, [])

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUserId={setUserId}/>}/>
          <Route path="/main" element={<MainPage userId={userId} yearMonth={yearMonth} setYearMonth={setYearMonth} date={date} setDate={setDate}/>}/>
          <Route path="/detail" element={<DetailPage userId={userId} yearMonth={yearMonth} date={date}/>}/>
          <Route path="/posting" element={<PostingPage userId={userId} yearMonth={yearMonth} date={date}/>}/>
          <Route path="/stat" element={<StatPage userId={userId} yearMonth={yearMonth} setYearMonth={setYearMonth}/>}/>
        </Routes>
      </Router>
    </div>
  )

}

export default App
