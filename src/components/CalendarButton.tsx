import React from 'react'

// 버튼 속 내용은 DB 불러와서 text로 처리

interface CalendarButtonProps {
  date: number | null
  day: number
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ date, day }) => {

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
          <button className='red-button'>{date}</button> :
          (day === 6 ?
            <button className='blue-button'>{date}</button> :
            <button>{date}</button>
          )
        )
      }
    </div>
  )
}

export default CalendarButton
