import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { HeaderProps } from '../database/DBType';

const Header: React.FC<HeaderProps> = ({ works, userId, year, month }) => {

  // main page, stat page 중 어디로 이동하는지 판단하는 state
  const [goMain, setGoMain] = useState<boolean>(false);
  const [goStat, setGoStat] = useState<boolean>(false);

  // 버튼을 클릭하면 해당 page로 이동
  const navigate: NavigateFunction = useNavigate();
  const navigateMain: () => void = () => {
    setGoMain(true);
  }
  const navigateStat: () => void = () => {
    setGoStat(true);
  }
  useEffect(() => {
    if (works && goMain) {
      navigate('/main', { state: {userId: userId, year: year, month: month} })
    } else if (works && goStat) {
      navigate('/stat', { state: {userId: userId, year: year, month: month} });
    }
    setGoMain(false);
    setGoStat(false);
  }, [userId, year, month, navigate, works, goMain, goStat])

  return (
    <div className='header-container'>
      <button onClick={navigateMain}>Calendar</button>
      <button onClick={navigateStat}>Statistics</button>
    </div>
  )
}

export default Header
