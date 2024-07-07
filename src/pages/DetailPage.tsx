import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import DetailController from '../components/DetailController';
import List from '../components/List';
import { DetailInfo } from '../database/DBType';

const DetailPage: React.FC = () => {

  // navigate state로 넘겨받은 변수
  const location = useLocation();
  const { userId, year, month, date }: DetailInfo = location.state as DetailInfo;

  // user id, year, month, date 변수 및 state
  const id: string = userId;
  const [y, setY] = useState<number>(year);
  const [m, setM] = useState<number>(month);
  const [d, setD] = useState<number>(date)

  // 지출 정보를 표시할지 수입 정보를 표시할지 판단하는 state
  const [showCost, setShowCost] = useState<boolean>(true);

  return (
    <div className='detail-container'>
      <Header works={true} userId={id} year={y} month={m}/>
      <DetailController year={y} setYear={setY} month={m} setMonth={setM} date={d} setDate={setD}/>
      <List userId={id} year={y} month={m} date={d} showCost={showCost} setShowCost={setShowCost}/>
    </div>
  )
}

export default DetailPage
