// import
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setValue as setDate } from '../redux/date';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CalendarButtonProps } from '../database/DBType';
import '../styles/CalendarButton.css';

// calendar button component
const CalendarButton: React.FC<CalendarButtonProps> = ({ date, day, totalCost, totalIncome }) => {

  // redux state
  const dispatch: Dispatch = useDispatch();

  // local state
  const [goDetail, setGoDetail] = useState<boolean>(false);

  // button click event
  const clickEvent = () => {
    setGoDetail(true);
    dispatch(setDate(date));
  };

  // navigate to detail page
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (goDetail) {
      navigate('/detail');
      setGoDetail(false);
    }
  }, [navigate, goDetail]);

  // return
  return (
    <div className='calendar-button'>
      {date === null ?
        <p className='invisible-text'/> :
          <div className='visible-text'>
            {totalIncome !== 0 ?
              <p className='blue-visible-text'>{totalIncome.toLocaleString()}</p> :
              <p className='invisible-text'/>
            }
            {totalCost !== 0 ?
              <p className='red-visible-text'>{totalCost.toLocaleString()}</p> :
              <p className='invisible-text'/>
            }
          </div>
      }
      {date === null ? 
        <button className='invisible-button'>{date}</button> :
        (day === 0 ?
          <button className='red-button' onClick={clickEvent}>{date}</button> :
          (day === 6 ?
            <button className='blue-button' onClick={clickEvent}>{date}</button> :
            <button onClick={clickEvent}>{date}</button>
          )
        )
      }
    </div>
  )
}

export default CalendarButton;
