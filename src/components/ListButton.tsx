import React from 'react'
import { ListButtonProps } from '../database/DBType';

const ListButton: React.FC<ListButtonProps> = ({ index, cost, category, amount, memo, selectedIndex, setSelectedIndex }) => {

  // 지출/수입에 따라 금액 앞에 부호를 붙여 표현한 변수
  let sign: string = (!cost ? '+ ' : '- ');
  const money: string = amount.toLocaleString();

  // 목록 버튼에 대한 클릭 함수
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
