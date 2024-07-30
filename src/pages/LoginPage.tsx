// import
import React, { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import { setValue as setId } from '../redux/id';
import { setValue as setPw } from '../redux/pw';
import { db } from '../database/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Logo from "../assets/Logo.svg";
import { UserType } from '../database/DBType';
import '../styles/LoginPage.css'

// login page component
const LoginPage: React.FC = () => {

  // redux state
  const id: string = useSelector((state: RootState) => (state.id.value));
  const pw: string = useSelector((state: RootState) => (state.pw.value));
  const dispatch: Dispatch = useDispatch();

  // local state
  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // login button click event
  const loginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data: UserType = docSnap.data() as UserType;
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
  };

  // navigate to main page
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (loginSuccess) {
      navigate('/main');
      dispatch(setPw(''));
      setLoginSuccess(false);
    }
  }, [navigate, dispatch, loginSuccess]);

  // return
  return (
    <div className='login-container'>
      <Header works={false}/>
      <div className='login-body-container'>
        <div className='login-box-container'>
          <img src={Logo} alt="FinBook"/>
          <form>
            <div className='login-input-container'>
              <div className='login-input'>
                <input 
                  type='text'
                  placeholder='ID'
                  value={id}
                  onChange={(e) => dispatch(setId(e.target.value))}
                />
                <p className={idError ? 'login-input-text-error' : 'login-input-text'}>존재하지 않는 아이디입니다.</p>
              </div>
              <div className='login-input'>
                <input 
                  type='password'
                  placeholder='PW'
                  value={pw}
                  onChange={(e) => dispatch(setPw(e.target.value))}
                />
                <p className={pwError ? 'login-input-text-error' : 'login-input-text'}>잘못된 비밀번호입니다.</p>
              </div>
            </div>
            <div className='login-button-container'>
              <button onClick={loginClick}>로그인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// export
export default LoginPage;
