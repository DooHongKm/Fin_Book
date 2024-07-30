// import
import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import '../styles/Header.css'

// header component
const Header: React.FC<{ works: boolean }> = ({ works }) => {

  // local state
  const [goMain, setGoMain] = useState<boolean>(false);
  const [goStat, setGoStat] = useState<boolean>(false);

  // navigate to specific page
  const navigate: NavigateFunction = useNavigate();
  const navigateMain = () => {
    setGoMain(true);
  };
  const navigateStat = () => {
    setGoStat(true);
  };
  useEffect(() => {
    if (works && goMain) {
      navigate('/main');
    } else if (works && goStat) {
      navigate('/stat');
    }
  }, [navigate, works, goMain, goStat]);

  // return
  return (
    <div className='header-container'>
      <button onClick={navigateMain}>Calendar</button>
      <button onClick={navigateStat}>Statistics</button>
    </div>
  )
}

// export
export default Header
