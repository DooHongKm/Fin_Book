import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import DetailController from '../components/DetailController';
import List from '../components/List';
import { MainInfo } from './MainPage';

export interface DetailInfo extends MainInfo {
  date: number
}

const DetailPage: React.FC = () => {

  const location = useLocation();
  const { userId, year, month, date }: DetailInfo = location.state as DetailInfo;

  const [y, setY] = useState<number>(year);
  const [m, setM] = useState<number>(month);
  const [d, setD] = useState<number>(date)

  // 초기값은 0, 지출 클릭하면 1, 수입 클릭하면 2
  const [showCost, setShowCost] = useState<boolean>(true);

  return (
    <div className='detail-container'>
      <Header works={true} userId={userId} year={y} month={m}/>
      <DetailController year={y} setYear={setY} month={m} setMonth={setM} date={d} setDate={setD}/>
      <List userId={userId} year={y} month={m} date={d} showCost={showCost} setShowCost={setShowCost}/>
    </div>
  )
}

export default DetailPage
