// import
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import { incValue as increaseYear, decValue as decreaseYear } from '../redux/year'
import { incValue as increaseMonth, decValue as decreaseMonth, setValue as setMonth } from '../redux/month'
import '../styles/MainController.css'

// main controller component
const MainController: React.FC = () => {

  // redux state
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));
  const dispatch: Dispatch = useDispatch();

  // prev button click event
  const prevMonth = () => {
    if (month === 1) {
      dispatch(decreaseYear({}));
      dispatch(setMonth(12));
    } else {
      dispatch(decreaseMonth({}));
    }
  }

  // next button click event
  const nextMonth = () => {
    if (month === 12) {
      dispatch(increaseYear({}));
      dispatch(setMonth(1));
    } else {
      dispatch(increaseMonth({}));
    }
  }

  // return
  return (
    <div className='main-controller-container'>
      <button onClick={prevMonth}>◀</button>
      <h1>{year}년 {month}월</h1>
      <button onClick={nextMonth}>▶</button>
    </div>
  )
}

// export
export default MainController
