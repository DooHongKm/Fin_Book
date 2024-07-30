import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { setValue as setYear } from '../redux/year'
import { setValue as setMonth } from '../redux/month'
import { setValue as setDate } from '../redux/date'
import '../styles/DetailController.css'


const DetailController: React.FC = () => {

  // 전역 state를 redux로 사용하기
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));
  const date: number = useSelector((state: RootState) => (state.date.value));
  const dispatch: Dispatch = useDispatch();

  // 이전 날짜 이동 버튼
  const prevDate: () => void = () => {
    const prevD: Date = new Date(year, month - 1, date - 1)
    dispatch(setYear(prevD.getFullYear()));
    dispatch(setMonth(prevD.getMonth() + 1));
    dispatch(setDate(prevD.getDate()));
  }

  // 다음 날짜 이동 버튼
  const nextDate: () => void = () => {
    const nextD: Date = new Date(year, month - 1, date + 1)
    dispatch(setYear(nextD.getFullYear()));
    dispatch(setMonth(nextD.getMonth() + 1));
    dispatch(setDate(nextD.getDate()));
  }

  return (
    <div className='detail-controller-container'>
      <button onClick={prevDate}>◀</button>
      <h1>{year}년 {month}월 {date}일</h1>
      <button onClick={nextDate}>▶</button>
    </div>
  )
}

export default DetailController
