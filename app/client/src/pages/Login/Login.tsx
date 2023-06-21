import { useContext, useEffect, useState } from "react";
import "./Login.css";

import { loginUser, createUser, checkIfUserIsLoggedIn } from "../../utils/AuthUtils";
import DashboardBar from "../../items/DashboardBar/DashboardBar";
import LoginPolylines from "../../items/LoginPolylines/LoginPolylines";
import { Context } from "../../Context/context";

function Login() {

  const { setLoggedIn } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rightText, setRightText] = useState('Register');
  const [state, setState] = useState('Login')
  const [errorText, setErrorText] = useState('');


  function handleLogin() {
    setLoggedIn(true);
    setPassword('');
    setEmail('');
  }

  function handleError(text: string) {
    setErrorText(text);
    setTimeout(()=>{
      setErrorText('')
    }, 5000)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'Register') {
      createUser(email, password)
        .then(registerSuccefull => registerSuccefull ? handleLogin() : handleError('Failed Register'))
    } else {
      loginUser(email, password)
        .then(shouldLogin => shouldLogin ? setLoggedIn(true) : handleError('Failed Login'));
    }
  }

  function handleClick() {
    setRightText(rightText == 'Register' ? 'Login' : 'Register');
    setState(state == 'Register' ? 'Login' : 'Register')
  }

  useEffect(() => {
    checkIfUserIsLoggedIn(setLoggedIn);
  }, []);


  return (
    <section id="login">
      <DashboardBar title={'Track'} rightText={rightText} callback={handleClick} />

      <div className="title">
        <h1>Start creating you schemes today</h1>
      </div>

      <div className="form-container" >
        <form onSubmit={handleSubmit} className="form">
          <h2 className="name">{state}</h2>
          <div className="container-input">
            <label htmlFor="email">
              <h3>Email:</h3>
            </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="demo@demo.com" />
          </div>
          <div className="container-input">
            <label htmlFor="password">
              <h3>Password:</h3>
            </label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="123" />
          </div>
          <button type="submit">
            <h3>{state}</h3>
          </button>
        </form>
        <h3 className="errorText" style={{ color: 'red' }}>{errorText}</h3>
      </div>

      < LoginPolylines />

    </section >
  );
}

export default Login;