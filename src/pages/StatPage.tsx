import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import MainController from '../components/MainController'
import Graph from '../components/Graph'
import { StatInfo } from '../database/DBType'

const StatPage: React.FC = () => {

  // navigate state로 넘겨받은 변수
  const location = useLocation();
  const { userId, year, month }: StatInfo = location.state as StatInfo;

  // user id, year, month 변수 및 state
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
