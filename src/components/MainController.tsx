import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { incValue as increaseYear, decValue as decreaseYear, setValue as setYear } from '../redux/year'
import { incValue as increaseMonth, decValue as decreaseMonth, setValue as setMonth } from '../redux/month'
import '../styles/MainController.css'

const MainController: React.FC = () => {

  // 전역 state를 redux로 사용하기
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));
  const dispatch: Dispatch = useDispatch();

  // 이전 달 이동 버튼 함수
  const prevMonth = () => {
    if (month === 1) {
      dispatch(decreaseYear({}));
      dispatch(setMonth(12));
    } else {
      dispatch(decreaseMonth({}));
    }
  }

  // 다음 달 이동 버튼 함수
  const nextMonth = () => {
    if (month === 12) {
      dispatch(increaseYear({}));
      dispatch(setMonth(1));
    } else {
      dispatch(increaseMonth({}));
    }
  }

  return (
    <div className='main-controller-container'>
      <button onClick={prevMonth}>◀</button>
      <h1>{year}년 {month}월</h1>
      <button onClick={nextMonth}>▶</button>
    </div>
  )
}

export default MainController
