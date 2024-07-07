import React, { useState, useEffect } from 'react'
import { db } from '../database/firebase'
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs, DocumentData } from 'firebase/firestore'
import ListButton from './ListButton'
import { DetailInfo } from '../pages/DetailPage'
import { DataType } from '../database/DBType'

export interface ListProps extends DetailInfo {
  showCost: boolean
  setShowCost: React.Dispatch<React.SetStateAction<boolean>>
}

const List: React.FC<ListProps> = ({ userId, year, month, date, showCost, setShowCost }) => {

  const dateString: string = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`

  const [listIndex, setListIndex] = useState<number>(0);

  const [data, setData] = useState<DataType[]>([]);

  const [category, setCategory] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [amountStr, setAmountStr] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setAmount(Number(amountStr));
  }, [amountStr])

  // 폼을 띄울 것인지 확인
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  
  const [addMode, setAddMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const clickCost = () => {
    setShowCost(true);
    setListIndex(0);
  }
  const clickIncome = () => {
    setShowCost(false);
    setListIndex(0);
  }

  const clickAdd = () => {
    if (!editMode) {
      setListIndex(0);
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
        const docRef = doc(doc(db, "users", userId), dateString, listIndex.toString());
        await deleteDoc(docRef);
      } catch (error) {
        console.error("DB Delete Fail", error);
      }
    }
    deleteDB();
    setListIndex(0);
  }
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
          const docRef = doc(doc(db, "users", userId), dateString, newItem.index.toString());
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
          const docRef = doc(doc(db, "users", userId), dateString, listIndex.toString());
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
    setListIndex(0);
    setAddMode(false);
    setEditMode(false);
    setDisplayForm(false);
  }
  const clickCancel = () => {
    setCategory('');
    setMemo('');
    setAmountStr('');
    setAmount(0);
    setListIndex(0);
    setAddMode(false);
    setEditMode(false);
    setDisplayForm(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      let newData: DataType[] = [];
      try {
        const colRef = collection(doc(db, "users", userId), dateString);
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
  }, [userId, year, month, date, dateString])

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
                setSelectedIndex={setListIndex}
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
                setSelectedIndex={setListIndex}
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
