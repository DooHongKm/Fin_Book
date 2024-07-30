// import
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import StatPage from './pages/StatPage'

// app component
const App: React.FC = () => {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/main" element={<MainPage/>}/>
          {/* <Route path="/detail" element={<DetailPage/>}/>
          <Route path="/stat" element={<StatPage/>}/> */}
        </Routes>
      </Router>
    </div>
  )
}

// export
export default App
