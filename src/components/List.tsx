import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { setValue as setShowCost } from '../redux/showCost'
import { setValue as setListIndex } from '../redux/listIndex'
import { db } from '../database/firebase'
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs, DocumentData } from 'firebase/firestore'
import ListButton from './ListButton'
import { ListProps, DataType } from '../database/DBType'
import '../styles/List.css'

const List: React.FC = () => {

  // 전역 state를 redux로 사용하기
  const id: string = useSelector((state: RootState) => (state.id.value))
  const year: number = useSelector((state: RootState) => (state.year.value))
  const month: number = useSelector((state: RootState) => (state.month.value))
  const date: number = useSelector((state: RootState) => (state.date.value))
  const showCost: boolean = useSelector((state: RootState) => (state.showCost.value))
  const listIndex: number = useSelector((state: RootState) => (state.listIndex.value))
  const dispatch: Dispatch = useDispatch();

  // 해당 날짜를 yyyymmdd 형태로 변환하여 저장한 변수
  const dateString: string = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`

  // 지출/수입 목록 및 세부 정보를 가지고 있는 데이터
  const [data, setData] = useState<DataType[]>([]);

  // 추가/수정 시에 입력받는 정보를 저장하는 state
  const [category, setCategory] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [amountStr, setAmountStr] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {
    setAmount(Number(amountStr));
  }, [amountStr])

  // 입력 폼을 띄울 것인지 확인하는 state
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  
  // 지출/수입 정보를 추가할 것인지 수정할 것인지 판단하는 state
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  // cost 버튼과 income 버튼에 대한 클릭 함수
  const clickCost = () => {
    dispatch(setShowCost(true));
    dispatch(setListIndex(0));
  }
  const clickIncome = () => {
    dispatch(setShowCost(false));
    dispatch(setListIndex(0));
  }

  // add 버튼, edit 버튼, delete 버튼에 대한 클릭 함수
  const clickAdd = () => {
    if (!editMode) {
      dispatch(setListIndex(0));
      setAddMode(true);
      setDisplayForm(true);
    }
  }
  const clickEdit = () => {
    if (!addMode && listIndex !== 0) {
      const item = data.find(item => item.index === listIndex);
      setCategory(item ? item.category : '');
      setMemo(item ? item.memo : '');
      setAmountStr(item ? item.amount.toString() : '');
      setEditMode(true);
      setDisplayForm(true);
    }
  }
  const clickDelete = () => {
    if (!addMode && !editMode && listIndex !== 0) {
      const newData = data.filter(item => item.index !== listIndex)
      setData(newData);
    }
    const deleteDB = async () => {
      try {
        const docRef = doc(doc(db, "users", id), dateString, listIndex.toString());
        await deleteDoc(docRef);
      } catch (error) {
        console.error("DB Delete Fail", error);
      }
    }
    deleteDB();
    dispatch(setListIndex(0));
  }

  // save 버튼과 cancel 버튼에 대한 클릭 함수
  const clickSave = () => {
    if (addMode === true) {
      let newData = data;
      const indexes = new Set<number>(data.map(item => item.index));
      let newIndex = 1;
      while (indexes.has(newIndex)) {
        newIndex++;
      }
      const newItem = {
        index: newIndex,
        date: `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`,
        cost: showCost,
        category: category,
        amount: amount,
        memo: memo
      }
      newData.push(newItem)
      setData(newData);
      const addDB = async () => {
        try {
          const docRef = doc(doc(db, "users", id), dateString, newItem.index.toString());
          await setDoc(docRef, newItem);
        } catch (error) {
          console.error("DB Add Fail", error);
        }
      }
      addDB();
    } else if (editMode === true) {
      let newData = data.filter(item => item.index !== listIndex)
      const newItem = {
        index: listIndex,
        date: `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`,
        cost: showCost,
        category: category,
        amount: amount,
        memo: memo
      }
      newData = [...newData, newItem]
      setData(newData);
      const editDB = async () => {
        try {
          const docRef = doc(doc(db, "users", id), dateString, listIndex.toString());
          await updateDoc(docRef, newItem as DocumentData);
        } catch (error) {
          console.error("DB Edit Fail", error);
        } 
      }
      editDB();
    } else {
      console.log('Button Error')
    }  
    setCategory('');
    setMemo('');
    setAmountStr('');
    setAmount(0);
    dispatch(setListIndex(0));
    setAddMode(false);
    setEditMode(false);
    setDisplayForm(false);
  }
  const clickCancel = () => {
    setCategory('');
    setMemo('');
    setAmountStr('');
    setAmount(0);
    dispatch(setListIndex(0));
    setAddMode(false);
    setEditMode(false);
    setDisplayForm(false);
  }

  // firebase의 DB 데이터를 가져와서 지출/수입으로 분류하여 따로 페이지에 표시
  useEffect(() => {
    const fetchData = async () => {
      let newData: DataType[] = [];
      try {
        const colRef = collection(doc(db, "users", id), dateString);
        const colSnap = await getDocs(colRef);
        if (!colSnap.empty) {
          colSnap.forEach((doc) => {
            newData.push({index: doc.data().index, date: doc.data().date, cost: doc.data().cost, category: doc.data().category, amount: doc.data().amount, memo: doc.data().memo})
          })
        }
        setData(newData);
      } catch (error) {
        console.error("DB Connecting Fail", error);
      }
    };
    fetchData();
  }, [id, year, month, date, dateString])

  return (
    <div className='list-container'>
      <div className = 'list-inner-container'>
        {showCost ?
          <div className='list-switch-container'>
            <button className='switch-clicked' onClick={clickCost}>지출</button>
            <button onClick={clickIncome}>수입</button>
          </div> :
          <div className='list-switch-container'>
            <button onClick={clickCost}>지출</button>
            <button className='switch-clicked' onClick={clickIncome}>수입</button>
          </div>     
        }
        <div className='list-data-container'>
          {showCost ? 
            (data.filter(item => item.cost).map(item => (
              <ListButton
                key={item.index}
                index={item.index}
                cost={item.cost}
                category={item.category}
                amount={item.amount}
                memo={item.memo}
                selectedIndex={listIndex}
              />
            ))) :
            (data.filter(item => !item.cost).map(item => (
              <ListButton
                key={item.index}
                index={item.index}
                cost={item.cost}
                category={item.category}
                amount={item.amount}
                memo={item.memo}
                selectedIndex={listIndex}
              />
            )))
          }
        </div>
        <div className={displayForm ? '' : 'hidden-form'}>
          <form className='list-form'>
            <div className='list-input'>
              <p>Category</p>
              <input 
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='list-input'>
              <p>Memo</p>
              <input 
                type='text'
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
            <div className='list-input'>
              <p>Amount</p>
              <input 
                type='text'
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
              />
            </div>
          </form>
          <div className='list-form-button-container'>
            <button onClick={clickCancel}>Cancel</button>
          <button onClick={clickSave}>Save</button>
          </div>
        </div>
      </div>

      <div className='list-edit-container'>
        <button onClick={clickAdd}>Add</button>
        <button onClick={clickEdit}>Edit</button>
        <button onClick={clickDelete}>Delete</button>
      </div>
    </div>
  )
}

export default List
