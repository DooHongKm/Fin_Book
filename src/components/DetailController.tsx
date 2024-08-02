// import
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import { setValue as setYear } from '../redux/year';
import { setValue as setMonth } from '../redux/month';
import { setValue as setDate } from '../redux/date';
import '../styles/DetailController.css';

// detail controller component
const DetailController: React.FC = () => {

  // redux state
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));
  const date: number = useSelector((state: RootState) => (state.date.value));
  const dispatch: Dispatch = useDispatch();

  console.log(year, month, date)

  // prev button click event
  const prevDate: () => void = () => {
    const prevD: Date = new Date(year, month - 1, date - 1);
    dispatch(setYear(prevD.getFullYear()));
    dispatch(setMonth(prevD.getMonth() + 1));
    dispatch(setDate(prevD.getDate()));
  };

  // next button click event
  const nextDate: () => void = () => {
    const nextD: Date = new Date(year, month - 1, date + 1);
    dispatch(setYear(nextD.getFullYear()));
    dispatch(setMonth(nextD.getMonth() + 1));
    dispatch(setDate(nextD.getDate()));
  };

  // return
  return (
    <div className='detail-controller-container'>
      <button onClick={prevDate}>◀</button>
      <h1>{year}년 {month}월 {date}일</h1>
      <button onClick={nextDate}>▶</button>
    </div>
  )
}

export default DetailController;
