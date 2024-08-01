// import
import React, { useState, useEffect } from 'react';
import { db } from '../database/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CalendarButton from './CalendarButton';
import { CalendarButtonProps } from '../database/DBType';
import '../styles/Calendar.css';

// calendar component
const Calendar: React.FC = () => {

  // redux state
  const id: string = useSelector((state: RootState) => (state.id.value));
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));

  // local state
  const [data, setData] = useState<CalendarButtonProps[]>([]);

  // data preprocessing
  useEffect(() => {
    let newData: CalendarButtonProps[] = [];
    const firstDate: Date = new Date(year, month - 1, 1);
    const lastDate: Date = new Date(year, month, 0);
    const firstDay: number = firstDate.getDay();
    const preCount: number = firstDay;
    const count: number = lastDate.getDate();
    const postCount: number = 42 - preCount - count;
    let dayCount: number = 0;
    for (let i: number = 0; i < preCount; i++) {
      newData.push({ date:null, day:dayCount, totalCost:0, totalIncome:0 });
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < count; i++) {
      newData.push({ date:i+1, day:dayCount, totalCost:0, totalIncome:0 });
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < postCount; i++) {
      newData.push({ date:null, day:dayCount, totalCost:0, totalIncome:0 });
      dayCount = (dayCount + 1) % 7;
    }
    const fetchData = async () => {
      try {
        for (let date = 1; date<= 31; date++) {
          const dateString = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`;
          const docsRef = collection(doc(db, "users", id), dateString);
          const docsSnap = await getDocs(docsRef);
          if (!docsSnap.empty) {
            let c = 0;
            let i = 0;
            docsSnap.forEach((doc) => {
              ((doc.data().cost === true) ? c += doc.data().amount : i += doc.data().amount)
            })
            const index = newData.findIndex(item => item.date === date);
            if (index !== -1) {
              newData[index] = { ...newData[index], totalCost: c, totalIncome: i };
            }
          } 
        }
        setData(newData);
      } catch (error) {
        console.error("DB Connecting Fail", error);
      }
    };
    fetchData();
  }, [year, month]);

  // return
  return (
    <div className='calendar-container'>
      <div className='calendar-inner-container'>
        {data.map((item, index) => (
          <CalendarButton
            key={index}
            date={item.date}
            day={item.day}
            totalCost={item.totalCost}
            totalIncome={item.totalIncome}
          />
        ))}
      </div>
    </div>
  )
}

// export
export default Calendar;
