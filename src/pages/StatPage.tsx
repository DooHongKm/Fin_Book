// import
import React from 'react';
import Header from '../components/Header';
import MainController from '../components/MainController';
import Graph from '../components/Graph';
import '../styles/StatPage.css';

// stat page component
const StatPage: React.FC = () => {

  // return
  return (
    <div className='stat-container'>
      <Header works={true}/>
      <MainController/>
      <Graph/>
    </div>
  )
}

// export
export default StatPage;
