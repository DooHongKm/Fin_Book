import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { setValue as setId } from '../redux/id'
import { setValue as setPw } from '../redux/pw'
import Header from '../components/Header';
import DetailController from '../components/DetailController';
import List from '../components/List';
import { DetailInfo } from '../database/DBType';
import '../styles/DetailPage.css'


const DetailPage: React.FC = () => {

  // 전역 state를 redux로 사용하기
  const id: string = useSelector((state: RootState) => (state.id.value))
  const year: number = useSelector((state: RootState) => (state.year.value))
  const month: number = useSelector((state: RootState) => (state.month.value))
  const date: number = useSelector((state: RootState) => (state.date.value))
  const dispatch: Dispatch = useDispatch();

  // 지출 정보를 표시할지 수입 정보를 표시할지 판단하는 state
  const [showCost, setShowCost] = useState<boolean>(true);

  return (
    <div className='detail-container'>
      <Header works={true}/>
      <DetailController/>
      <List/>
    </div>
  )
}

export default DetailPage
