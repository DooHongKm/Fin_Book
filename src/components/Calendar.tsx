import React from 'react'
import CalendarButton from './CalendarButton'
import { CalendarProps } from '../types'

const Calendar: React.FC<CalendarProps> = ({  }) => {
  return (
    <div className='calendar-container'>
      <div className='calendar-inner-container'>
        <CalendarButton date={null} day={0}/>
        <CalendarButton date={1} day={1}/>
        <CalendarButton date={2} day={2}/>
        <CalendarButton date={3} day={3}/>
        <CalendarButton date={4} day={4}/>
        <CalendarButton date={5} day={5}/>
        <CalendarButton date={6} day={6}/>
        <CalendarButton date={7} day={0}/>
        <CalendarButton date={8} day={1}/>
        <CalendarButton date={9} day={2}/>
        <CalendarButton date={10} day={3}/>
        <CalendarButton date={11} day={4}/>
        <CalendarButton date={12} day={5}/>
        <CalendarButton date={13} day={6}/>
        <CalendarButton date={14} day={0}/>
        <CalendarButton date={15} day={1}/>
        <CalendarButton date={16} day={2}/>
        <CalendarButton date={17} day={3}/>
        <CalendarButton date={18} day={4}/>
        <CalendarButton date={19} day={5}/>
        <CalendarButton date={20} day={6}/>
        <CalendarButton date={21} day={0}/>
        <CalendarButton date={22} day={1}/>
        <CalendarButton date={23} day={2}/>
        <CalendarButton date={24} day={3}/>
        <CalendarButton date={25} day={4}/>
        <CalendarButton date={26} day={5}/>
        <CalendarButton date={27} day={6}/>
        <CalendarButton date={28} day={0}/>
        <CalendarButton date={29} day={1}/>
        <CalendarButton date={30} day={2}/>
        <CalendarButton date={null} day={3}/>
        <CalendarButton date={null} day={4}/>
        <CalendarButton date={null} day={5}/>
        <CalendarButton date={null} day={6}/>
        <CalendarButton date={null} day={0}/>
        <CalendarButton date={null} day={1}/>
        <CalendarButton date={null} day={2}/>
        <CalendarButton date={null} day={3}/>
        <CalendarButton date={null} day={4}/>
        <CalendarButton date={null} day={5}/>
        <CalendarButton date={null} day={6}/>
      </div>
    </div>
  )
}

export default Calendar
