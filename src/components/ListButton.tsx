import React, { useState, useEffect } from 'react'

interface ListButtonProps {
  key: number
  index: number
  cost: boolean
  category: string
  amount: number
  memo: string
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

const ListButton: React.FC<ListButtonProps> = ({ key, index, cost, category, amount, memo, selectedIndex, setSelectedIndex }) => {

  let sign: string = (!cost ? '+ ' : '- ');
  const money: string = amount.toLocaleString();

  const clickEvent = () => {
    setSelectedIndex(index);
  }

  return (
    <div className='list-button-container'>
      <div className='list-text'>
        <p>{category}</p>
        <p>{memo}</p>
        <p>{sign}{money}원</p>
      </div>
      {index === selectedIndex ?
        <button className='selected-list' onClick={clickEvent}></button> :
        <button onClick={clickEvent}></button>
      }
    </div>
  )
}

export default ListButton
