import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import MainController from '../components/MainController'
import Graph from '../components/Graph'
import { Info } from './MainPage'

const StatPage: React.FC = () => {

  const location = useLocation();
  const { userId, year, month }: Info = location.state as Info;

  const id: string = userId;
  const [y, setY] = useState<number>(year);
  const [m, setM] = useState<number>(month);

  return (
    <div className='stat-container'>
      <Header works={true} userId={id} year={y} month={m}/>
      <MainController year={y} setYear={setY} month={m} setMonth={setM}/>
      <Graph userId={userId} year={y} month={m}/>
    </div>
  )
}

export default StatPage
