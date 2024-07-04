import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import DetailController from '../components/DetailController';
import List from '../components/List';
import { MainInfo } from './MainPage';

export interface DetailInfo extends MainInfo {
  date: number
}

interface costInfo {
  date: string
  cost: boolean
  category: string
  amount: number
  memo: string
}

const DetailPage: React.FC = () => {

  const location = useLocation();
  const { userId, year, month, date }: DetailInfo = location.state as DetailInfo;

  const [y, setY] = useState<number>(year);
  const [m, setM] = useState<number>(month);
  const [d, setD] = useState<number>(date)

  // 초기값은 0, 지출 클릭하면 1, 수입 클릭하면 2
  const [switchNum, setSwitchNum] = useState<number>(0);

  // 선택한 리스트의 index를 저장
  const [listIndex, setListIndex] = useState<number>(0);

  console.log(listIndex);

  return (
    <div className='detail-container'>
      <Header works={true} userId={userId} year={y} month={m}/>
      <DetailController year={y} setYear={setY} month={m} setMonth={setM} date={d} setDate={setD}/>
      <List userId={userId} year={y} month={m} date={d} switchNum={switchNum} setSwitchNum={setSwitchNum} listIndex={listIndex} setListIndex={setListIndex}/>
    </div>
  )
}

export default DetailPage
