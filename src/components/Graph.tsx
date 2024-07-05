import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { db } from '../database/firebase'
import { collection, doc, getDocs } from 'firebase/firestore'
import { MainInfo } from '../pages/MainPage'
import { DataType } from '../database/DBType'

interface GraphProps extends MainInfo {}

interface NivoType {
  id: string
  label: string
  value: number,
  color: string
}

const Graph:React.FC<GraphProps> = ({ userId, year, month }) => {

  const [costButton, setCostButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const clickCost = () => {
    setCostButton(true);
  }
  const clickIncome = () => {
    setCostButton(false);
  }

  const [costData, setCostData] = useState<NivoType[]>([]);
  const [incomeData, setIncomeData] = useState<NivoType[]>([]);

  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: DataType[] = [];
      try {
        const lastDate = new Date(year, month, 0).getDate();
        for (let day = 1; day <= lastDate; day++) {
          const dateString = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`
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
  }, [year, month])

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
