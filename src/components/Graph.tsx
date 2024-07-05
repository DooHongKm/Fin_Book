import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { MainInfo } from '../pages/MainPage'
import { DataType } from './List'

interface GraphProps extends MainInfo {}

interface NivoType {
  id: string
  label: string
  value: number,
  color: string
}

const Graph:React.FC<GraphProps> = ({ userId, year, month }) => {

  const [costButton, setCostButton] = useState<boolean>(true);

  const clickCost = () => {
    setCostButton(true);
  }
  const clickIncome = () => {
    setCostButton(false);
  }

  const [data, setData] = useState<DataType[]>([
    {
      index: 1,
      date: '20240701',
      cost: true,
      category: '식비',
      amount: 22500,
      memo: '저녁 식사 비용'
    },
    {
      index: 2,
      date: '20240701',
      cost: true,
      category: '식비',
      amount: 15000,
      memo: '점심 식사 비용'
    },
    {
      index: 3,
      date: '20240701',
      cost: true,
      category: '생활용품',
      amount: 36500,
      memo: '휴지 등 생활용품 구입'
    },
    {
      index: 4,
      date: '20240701',
      cost: false,
      category: '월급',
      amount: 2000000,
      memo: '6월 월급'
    },
    {
      index: 5,
      date: '20240701',
      cost: false,
      category: '용돈',
      amount: 50000,
      memo: '어머니께서 주신 용돈'
    },
    {
      index: 6,
      date: '20240701',
      cost: true,
      category: '식비',
      amount: 22500,
      memo: '저녁 식사 비용'
    },
    {
      index: 7,
      date: '20240701',
      cost: true,
      category: '식비',
      amount: 15000,
      memo: '점심 식사 비용'
    },
    {
      index: 8,
      date: '20240701',
      cost: true,
      category: '생활용품',
      amount: 36500,
      memo: '휴지 등 생활용품 구입'
    }
  ]);

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

  const [costData, setCostData] = useState<NivoType[]>(transformData(data.filter(item => item.cost)));
  const [incomeData, setIncomeData] = useState<NivoType[]>(transformData(data.filter(item => !item.cost)));

  const [totalCost, setTotalCost] = useState<number>(costData.reduce((acc, item) => acc + item.value, 0));
  const [totalIncome, setTotalIncome] = useState<number>(incomeData.reduce((acc, item) => acc + item.value, 0));

  useEffect(() => {
    setCostData(transformData(data.filter(item => item.cost)));
    setIncomeData(transformData(data.filter(item => !item.cost)))
  }, [data])

  useEffect(() => {
    setTotalCost(costData.reduce((acc, item) => acc + item.value, 0))
    setTotalIncome(incomeData.reduce((acc, item) => acc + item.value, 0))
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
    </div>
  )
}

export default Graph
