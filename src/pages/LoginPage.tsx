import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Logo from "../images/Logo.svg"

const LoginPage: React.FC = () => {

  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const date: Date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);

  // 통신 필요
  const sendLoginInfo: () => void = () => {
    setIdError(false);
    setPwError(false);
    setLoginSuccess(true);
  };
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
