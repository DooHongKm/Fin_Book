import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { CalendarButtonProps } from './Calendar'

const CalendarButton: React.FC<CalendarButtonProps> = ({ userId, year, month, date, day }) => {

  const [goDetail, setGoDetail] = useState<boolean>(false);

  const navigateDetail: () => void = () => {
    setGoDetail(true)
  };
  const clickEvent = () => {
    navigateDetail();
  };

  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (goDetail) {
      navigate('/detail', { state: {userId: userId, year: year, month: month, date:date} });
      setGoDetail(false);
    }
  }, [navigate, goDetail])

  return (
    <div className='calendar-button'>
      {date === null ?
        <p className='invisible-text'/> :
        <div className='visible-text'>
          <p>50,000</p>
          <p>25,000</p>
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

export default CalendarButton
