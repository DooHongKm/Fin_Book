// import
import React, { useState, useEffect } from 'react';
import { db } from '../database/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setValue as setDate } from '../redux/date';
import { RootState } from '../redux/store';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CalendarButtonProps } from '../database/DBType';
import '../styles/CalendarButton.css';

// calendar button component
const CalendarButton: React.FC<CalendarButtonProps> = ({ date, day }) => {

  // redux state
  const id: string = useSelector((state: RootState) => (state.id.value));
  const year: number = useSelector((state: RootState) => (state.year.value));
  const month: number = useSelector((state: RootState) => (state.month.value));
  const dispatch: Dispatch = useDispatch();

  // local state
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [goDetail, setGoDetail] = useState<boolean>(false);

  // calculate total
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTotalCost(0);
        setTotalIncome(0);
        const dateString = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`;
        const docsRef = collection(doc(db, "users", id), dateString);
        const docsSnap = await getDocs(docsRef);
        if (!docsSnap.empty) {
          let c = 0;
          let i = 0;
          docsSnap.forEach((doc) => {
            ((doc.data().cost === true) ? c += doc.data().amount : i += doc.data().amount)
          })
          setTotalCost(c);
          setTotalIncome(i);
        }
      } catch (error) {
        console.error("DB Connecting Fail", error);
      }
    };
    fetchData();
  }, [id, year, month, date]);

  // button click event
  const clickEvent = () => {
    setGoDetail(true);
    //dispatch(setDate(date));
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
