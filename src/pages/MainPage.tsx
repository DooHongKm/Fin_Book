import React from 'react'
import Header from '../components/Header'
import MainController from '../components/MainController'
import Calendar from '../components/Calendar'
import '../styles/MainPage.css'


const MainPage: React.FC = () => {

  return (
    <div className='main-container'>
      <Header works={true}/>
      <MainController/>
      <Calendar/>
    </div>
  )
}

export default MainPage
