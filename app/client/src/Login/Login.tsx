import { useState } from "react";
import { checkuser, createUser } from "../utils/LoginUtils";
import "./Login.css";
import DashboardBar from "../DashboardBar/DashboardBar";

function Login({ setLoggedIn }: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rightText, setRightText] = useState('Register');

  const [state, setState] = useState('Login')
  const [errorText, setErrorText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (state === 'Register') {
      createUser(email, password)
        .then(res => res.json())
        .then(res => {
          if (Boolean(res)) {
            return checkuser(email, password)
              .then(res => {
                setLoggedIn(true);
                setPassword('');
                setEmail('');
              });
          } else setErrorText('Failed loggin in');
        })
        .catch(err => setErrorText('Failed Register'));
    } else {
      checkuser(email, password)
        .then(res => res.json())
        .then(res => {
          if (Boolean(res)) setLoggedIn(true);
          else setErrorText('Failed loggin in');
        })
        .catch(err => setErrorText('Failed loggin in'))
    }
  }

  function handleClick() {
    setRightText(rightText == 'Register' ? 'Login' : 'Register');
    setState(state == 'Register' ? 'Login' : 'Register')
  }

  return (
    <section id="Login">
      <DashboardBar title={'Track'} rightText={rightText} callback={handleClick} />
      <div className="form-container">
        <form className="form">
          <h2>{state}</h2>

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
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="not123!" />
          </div>

          <button onClick={handleSubmit} type="submit">
            <h3>Submit</h3>
          </button>
        </form>

        <h3 style={{ color: 'red' }}>{errorText}</h3>
      </div>

    </section>
  )
}

export default Login;