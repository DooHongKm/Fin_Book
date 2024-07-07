import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { db } from '../database/firebase'
import { collection, doc, getDocs } from 'firebase/firestore'
import { GraphProps, DataType, NivoType } from '../database/DBType'

const Graph:React.FC<GraphProps> = ({ userId, year, month }) => {

  // 지출/수입을 구분하는 버튼이 눌렸는지 판단하는 state
  const [costButton, setCostButton] = useState<boolean>(true);
  
  // cost 버튼과 income 버튼에 대한 클릭 함수
  const clickCost = () => {
    setCostButton(true);
  }
  const clickIncome = () => {
    setCostButton(false);
  }

  // 그래프를 로딩하고 있는 중인지 판단하는 state
  const [loading, setLoading] = useState<boolean>(false);

  // 지출 데이터와 수입 데이터를 그래프 input 타입으로 변환하여 저장하는 state
  const [costData, setCostData] = useState<NivoType[]>([]);
  const [incomeData, setIncomeData] = useState<NivoType[]>([]);

  // 지출/수입 데이터를 분석하여 해당 달의 총 지출/수입 금액을 저장하는 state
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  // 그래프 input 타입으로 변화하는 함수
  const transformData = (data: DataType[]): NivoType[] => {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category] += item.amount;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(groupedData).map(([category, amount]) => ({
      id: category,
      label: category,
      value: amount,
      color: `hsl(${0}, 50%, 50%)`,
    }));
  };

  // firebase의 DB 데이터를 가져와서 지출/수입으로 분류하여 따로 페이지에 표시
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: DataType[] = [];
      try {
        const lastDate = new Date(year, month, 0).getDate();
        for (let date = 1; date <= lastDate; date++) {
          const dateString = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`
          const docsRef = collection(doc(db, "users", userId), dateString);
          const docsSnap = await getDocs(docsRef);
          if (!docsSnap.empty) {
            docsSnap.forEach((doc) => {
              data.push({index: doc.data().index, date: doc.data().date, cost: doc.data().cost, category: doc.data().category, amount: doc.data().amount, memo: doc.data().memo})
            })
          }
        }
        setCostData(transformData(data.filter(item => item.cost)));
        setIncomeData(transformData(data.filter(item => !item.cost)));
      } catch (error) {
        console.error("DB Connecting Fail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, year, month])
  useEffect(() => {
    setTotalCost(costData.reduce((acc, item) => acc + item.value, 0));
    setTotalIncome(incomeData.reduce((acc, item) => acc + item.value, 0));
  }, [costData, incomeData])

  return (
    <div className='graph-container'>
      {costButton ?
        <div className='graph-info-container'>
          <p></p>
          <button className='graph-button-clicked' onClick={clickCost}>지출</button>
          <button onClick={clickIncome}>수입</button>
          <p>총 지출 금액 : {totalCost.toLocaleString()}원</p>
        </div> :
        <div className='graph-info-container'>
          <p></p>
          <button onClick={clickCost}>지출</button>
          <button className='graph-button-clicked' onClick={clickIncome}>수입</button>
          <p>총 수입 금액 : {totalIncome.toLocaleString()}원</p>
        </div>
      }
      {loading ?
        <p>Loading...</p> :
        (costButton && costData.length === 0 ?
          <p>OOps... No Data.</p> :
          (!costButton && incomeData.length === 0 ?
            <p>No Data</p> :
            <ResponsivePie
              data={(costButton ? costData : incomeData)}
              margin={{ top: 30, right: 0, bottom: 50, left: 0 }}
              sortByValue={true}
              fit={false}
              activeOuterRadiusOffset={5}
              innerRadius={0.2}
              colors={{ scheme: 'pastel2' }}
              borderColor={{
                  from: 'color',
                  modifiers: [['darker', 0.2]]
              }}
              enableArcLinkLabels={false}
              arcLabel="id"
              arcLabelsRadiusOffset={0.5}
              arcLabelsSkipAngle={0}
              arcLabelsTextColor={{
                  from: 'color',
                  modifiers: [['darker', 3]]
              }}
              tooltip={({ datum }) => (
                <div
                  style={{
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    boxShadow: '0 3px 9px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <strong>{datum.id}</strong>
                  <br />
                  금액 : {datum.value}원
                  <br />
                  비율 : {(costButton ? (datum.value/totalCost*100).toFixed(2) : (datum.value/totalIncome*100).toFixed(2))}%
                </div>
              )}
              motionConfig="wobbly"
              theme={{
                labels: {
                  text: {fontSize: 20, fill: '#000'}
                }
              }}
            />
          ) 
        )
        
      }
    </div>
  )
}

export default Graph
