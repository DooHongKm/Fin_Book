import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { db } from '../database/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Header from '../components/Header';
import Logo from "../images/Logo.svg"
import { UserType, DataType } from '../database/DBType';

const LoginPage: React.FC = () => {

  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const date: Date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);

  const sendLoginInfo: () => void = () => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data: UserType = docSnap.data() as UserType
          if (data.pw !== pw) {
            setIdError(false);
            setPwError(true);
            setLoginSuccess(false);
          } else {
            setIdError(false);
            setPwError(false);
            setLoginSuccess(true);
          }
        } else {
          setIdError(true);
          setPwError(false);
          setLoginSuccess(false);
        }
      } catch (error) {
        console.error("DB Connecting Fail", error);
      }
    };
    fetchData();
  }
  const clickEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendLoginInfo();
  };

  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (loginSuccess) {
      navigate('/main', { state: {userId: id, year: year, month: month} });
    }
  }, [id, year, month, navigate, loginSuccess])

  return (
    <div className='login-container'>
      <Header works={false} userId={id} year={year} month={month}/>
      <div className='login-body-container'>
        <div className='login-box-container'>
          <img src={Logo} alt="FinBook"/>
          <form onSubmit={clickEvent}>
            <div className='login-input-container'>
              <div className='login-input'>
                <input 
                  type='text'
                  placeholder='ID'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <p className={idError ? 'login-input-text-error' : 'login-input-text'}>존재하지 않는 아이디입니다.</p>
              </div>
              <div className='login-input'>
                <input 
                  type='password'
                  placeholder='PW'
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
                <p className={pwError ? 'login-input-text-error' : 'login-input-text'}>잘못된 비밀번호입니다.</p>
              </div>
            </div>
            <div className='login-button-container'>
              <button type='submit'>로그인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
