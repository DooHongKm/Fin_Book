import React from 'react'

interface ControllerProps {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

const DetailController: React.FC<ControllerProps> = ({ year, setYear, month, setMonth }) => {

  const prevMonth: () => void = () => {
    if (month === 1) {
      setYear(prevState => prevState - 1)
      setMonth(12)
    } else {
      setMonth(prevState => prevState - 1)
    }
  }

  const nextMonth: () => void = () => {
    if (month === 12) {
      setYear(prevState => prevState + 1)
      setMonth(1)
    } else {
      setMonth(prevState => prevState + 1)
    }
  }

  return (
    <div className='controller-container'>
      <button onClick={prevMonth}>◀</button>
      <h1>{year}년 {month}월</h1>
      <button onClick={nextMonth}>▶</button>
    </div>
  )
}

export default DetailController
