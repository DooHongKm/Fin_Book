// import
import React from 'react';
import { ListButtonProps } from '../database/DBType';
import '../styles/ListButton.css';

// list button component
const ListButton: React.FC<ListButtonProps> = ({ index, cost, category, amount, memo, selectedIndex, setSelectedIndex }) => {

  // local variable
  let sign: string = (!cost ? '+ ' : '- ');
  const money: string = amount.toLocaleString();

  // button click event
  const clickEvent = () => {
    setSelectedIndex(index);
  }

  // return
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

// export
export default ListButton;
