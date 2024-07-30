// import
import React from 'react';
import Header from '../components/Header';
import DetailController from '../components/DetailController';
import List from '../components/List';
import '../styles/DetailPage.css';

// detail page component
const DetailPage: React.FC = () => {

  // return
  return (
    <div className='detail-container'>
      <Header works={true}/>
      <DetailController/>
      <List/>
    </div>
  )
}

export default DetailPage;
