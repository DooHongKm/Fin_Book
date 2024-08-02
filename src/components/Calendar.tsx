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
  const id: string = useSelector((state: RootState) => state.id.value);
  const year: number = useSelector((state: RootState) => state.year.value);
  const month: number = useSelector((state: RootState) => state.month.value);

  // local state
  const [data, setData] = useState<CalendarButtonProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // data pre-processing & fetch data
  useEffect(() => {
    setLoading(true);
    let newData: CalendarButtonProps[] = [];
    const firstDate: Date = new Date(year, month - 1, 1);
    const lastDate: Date = new Date(year, month, 0);
    const firstDay: number = firstDate.getDay();
    const preCount: number = firstDay;
    const count: number = lastDate.getDate();
    const postCount: number = 42 - preCount - count;
    let dayCount: number = 0;

    for (let i: number = 0; i < preCount; i++) {
      newData.push({ date: null, day: dayCount, totalCost: 0, totalIncome: 0 });
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < count; i++) {
      newData.push({ date: i + 1, day: dayCount, totalCost: 0, totalIncome: 0 });
      dayCount = (dayCount + 1) % 7;
    }
    for (let i: number = 0; i < postCount; i++) {
      newData.push({ date: null, day: dayCount, totalCost: 0, totalIncome: 0 });
      dayCount = (dayCount + 1) % 7;
    }

    const fetchData = async () => {
      try {
        const fetchPromises = newData
          .filter(item => item.date !== null)
          .map(async item => {
            const dateString = `${year}${String(month).padStart(2, '0')}${String(item.date).padStart(2, '0')}`;
            const docsRef = collection(doc(db, "users", id), dateString);
            const docsSnap = await getDocs(docsRef);
            if (!docsSnap.empty) {
              let c = 0;
              let i = 0;
              docsSnap.forEach(doc => {
                if (doc.data().cost === true) {
                  c += doc.data().amount;
                } else {
                  i += doc.data().amount;
                }
              });
              return { ...item, totalCost: c, totalIncome: i };
            }
            return item;
          });
        const results = await Promise.all(fetchPromises);
        setData([...newData.slice(0, preCount), ...results, ...newData.slice(preCount + count)]);
      } catch (error) {
        console.error("DB Connecting Fail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, year, month]);

  return (
    <div className='calendar-container'>
      {loading ?
        (
          <div className='loading-container'>
            <p className='loading-text'>Loading...</p>
          </div>
        ) :
        (
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
        )
      }
    </div>
  );
};

export default Calendar;