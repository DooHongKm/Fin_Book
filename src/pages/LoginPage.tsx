import React, { useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../images/Logo.svg';
import { LoginProps } from '../types';

const LoginPage: React.FC<LoginProps> = ({ setUserId }) => {

  // input에 입력하며 id, pw 업데이트
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // id, pw에 오류가 있는지 확인하고, 로그인 성공인지 아닌지를 판단
  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // 로그인 버튼을 누르면 실행되어 id, pw를 DB와 비교하여 결과 반환
  const sendLoginInfo: () => void = () => {
    setIdError(false);
    setPwError(false);
    setLoginSuccess(true);
  };

  // loginSuccess가 true이면, 메인 페이지로 이동
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    if (loginSuccess) {
      setUserId(id);
      navigate('/main');
    }
  }, [loginSuccess])

  return (
    <div className='login-container'>
      <Header/>
      <div className='login-body-container'>
        <div className='login-box-container'>
          <img src={Logo} alt="FinBook"/>
          <form onSubmit={sendLoginInfo}>
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
