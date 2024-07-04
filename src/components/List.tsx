import React, { useState, useEffect } from 'react'
import ListButton from './ListButton'
import { DetailInfo } from '../pages/DetailPage'

export interface ListProps extends DetailInfo {
  switchNum: number
  setSwitchNum: React.Dispatch<React.SetStateAction<number>>
  listIndex: number
  setListIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface DataType {
  index: number
  date: string
  cost: boolean
  category: string
  amount: number
  memo: string
}

const List: React.FC<ListProps> = ({ userId, year, month, date, switchNum, setSwitchNum, listIndex, setListIndex }) => {

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

  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  // 폼을 띄울 것인지 확인
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const clickCost = () => {
    setSwitchNum(1);
    setListIndex(0);
  }
  const clickIncome = () => {
    setSwitchNum(2);
    setListIndex(0);
  }
  const clickAdd = () => {
    setSwitchNum(1);
    setListIndex(0);
  }
  const clickEdit = () => {
    setSwitchNum(2);
    setListIndex(0);
  }
  const clickDelete = () => {
    setSwitchNum(1);
    setListIndex(0);
  } 
  const clickSave = () => {
    setSwitchNum(2);
    setListIndex(0);
  }
  const clickCancel = () => {
    setSwitchNum(1);
    setListIndex(0);
  }

  useEffect(() => {
    if (switchNum === 1) {
      setFilteredData(data.filter(item => item.cost));
    } else if (switchNum === 2) {
      setFilteredData(data.filter(item => !item.cost));
    } else {
      setFilteredData([]);
    }
  }, [switchNum, data]);

  return (
    <div className='list-container'>
      <div className = 'list-inner-container'>
        {switchNum === 0 ?
          <div className='list-switch-container'>
            <button onClick={clickCost}>지출</button>
            <button onClick={clickIncome}>수입</button>
          </div> :
          (switchNum === 1 ?
            <div className='list-switch-container'>
              <button className='switch-clicked' onClick={clickCost}>지출</button>
              <button onClick={clickIncome}>수입</button>
            </div> :
            <div className='list-switch-container'>
              <button onClick={clickCost}>지출</button>
              <button className='switch-clicked' onClick={clickIncome}>수입</button>
            </div>     
          )
        }
        <div className='list-data-container'>
          {filteredData.map(item => (
            <ListButton
              key={item.index}
              index={item.index}
              cost={item.cost}
              category={item.category}
              amount={item.amount}
              memo={item.memo}
              selectedIndex={listIndex}
              setSelectedIndex={setListIndex}
            />
          ))}
        </div>
        <form className='list-form'>
          <div className='list-input'>
            <p>Category</p>
            <input></input>
          </div>
          <div className='list-input'>
            <p>Memo</p>
            <input></input>
          </div>
          <div className='list-input'>
            <p>Amount</p>
            <input></input>
          </div>
        </form>
        <div className='list-form-button-container'>
          <button>Cancel</button>
         <button>Save</button>
        </div>
      </div>

      <div className='list-edit-container'>
        <button>Add</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default List
