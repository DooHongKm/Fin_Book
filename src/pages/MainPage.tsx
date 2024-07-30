// import
import React from 'react'
import Header from '../components/Header'
import MainController from '../components/MainController'
import Calendar from '../components/Calendar'
import '../styles/MainPage.css'

// main page component
const MainPage: React.FC = () => {

  // return
  return (
    <div className='main-container'>
      <Header works={true}/>
      <MainController/>
      <Calendar/>
    </div>
  )
}

// export
export default MainPage
