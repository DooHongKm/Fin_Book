import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { db } from '../database/firebase'
import { collection, doc, getDocs } from 'firebase/firestore'
import { CalendarButtonProps } from '../database/DBType'

const CalendarButton: React.FC<CalendarButtonProps> = ({ userId, year, month, date, day }) => {

  // 해당 날짜의 총 지출 및 수입 금액을 저장하는 state
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  // firebase의 DB 데이터를 가져와서 지출/수입으로 분류하여 총 금액을 계산
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTotalCost(0);
        setTotalIncome(0);
        const dateString = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`;
        const docsRef = collection(doc(db, "users", userId), dateString);
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
  }, [userId, year, month, date])

  // 달력의 날짜를 클릭하면 detail page로 이동
  const [goDetail, setGoDetail] = useState<boolean>(false);
  const clickEvent = () => {
    setGoDetail(true)
  };
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (goDetail) {
      navigate('/detail', { state: {userId: userId, year: year, month: month, date:date} });
      setGoDetail(false);
    }
  }, [navigate, userId, year, month, date, goDetail])

  return (
    <div className='calendar-button'>
      {date === null ?
        <p className='invisible-text'/> :
          <div className='visible-text'>
            {totalIncome !== 0 ?
              <p className='blue-visible-text'>{totalIncome}</p> :
              <p className='invisible-text'/>
            }
            {totalCost !== 0 ?
              <p className='red-visible-text'>{totalCost}</p> :
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

export default CalendarButton
