import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Info } from '../pages/MainPage'

interface HeaderProps extends Info {
  works: boolean
}

const Header: React.FC<HeaderProps> = ({ works, userId, year, month }) => {

  const [goMain, setGoMain] = useState<boolean>(false);
  const [goStat, setGoStat] = useState<boolean>(false);

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
