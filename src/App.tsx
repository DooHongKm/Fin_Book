import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import StatPage from './pages/StatPage'

export interface Month {
  year: number
  month: number
}

const App: React.FC = () => {

  const [userId, setUserId] = useState<string>('');
  const [yearMonth, setYearMonth] = useState<Month>({year: 0, month: 0});

  useEffect(() => {
    const date: Date = new Date();
    const year_: number = date.getFullYear()
    const month_: number = date.getMonth() + 1
    setYearMonth({ year: year_, month: month_ });
  }, [])

  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUserId={setUserId}/>}/>
          <Route path="/main" element={<MainPage userId={userId} yearMonth={yearMonth} setYearMonth={setYearMonth}/>}/>
          <Route path="/detail" element={<DetailPage/>}/>
          <Route path="/stat" element={<StatPage/>}/>
        </Routes>
      </Router>
    </div>
  )

}

export default App
