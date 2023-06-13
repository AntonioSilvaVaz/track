import { useState } from "react";
import { checkuser, createUser } from "../utils/LoginUtils";
import "./Login.css";

function Login({ setLoggedIn }: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    checkuser(email, password)
      .then(res => setLoggedIn(Boolean(res)))
      .catch(err => console.log(err, 'ERR'))
  }

  return (
    <section id="Login">
      <h2>Login</h2>
      <form className="form">

        <div>
          <label htmlFor="email">
            <h3>Email:</h3>
          </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="demo@demo.com" />
        </div>

        <div>
          <label htmlFor="password">
            <h3>Password:</h3>
          </label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="not123!" />
        </div>

        <button onClick={handleSubmit} type="submit">
          <h3>Submit</h3>
        </button>

      </form>
    </section>
  )
}

export default Login;