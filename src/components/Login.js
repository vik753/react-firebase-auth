import React from "react";
import fire from "../config/fire";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeInputs = (e) => {
    e.preventDefault();
    const element = e.target.getAttribute("id");
    const value = e.target.value;

    if (element === "email") {
      setEmail((state) => value);
    } else if (element === "password") {
      setPassword((state) => value);
    }
  };

  const loginHandle = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        const {code, message} = err;
        console.log(`Login error! Code: ${code}. Message: ${message}`)
        alert(`Login error! Code: ${code}. Message: ${message}`)
      });
  };

  const signUpHandle = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        const {code, message} = err;
        console.log(`SignUp error! Code: ${code}. Message: ${message}`)
        alert(`SignUp error! Code: ${code}. Message: ${message}`)
      });
  };

  return (
    <div>
      <form style={{ textAlign: "left" }}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="email address"
          defaultValue={email}
          onChange={handleChangeInputs}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          defaultValue={password}
          onChange={handleChangeInputs}
        />
        <br />
        <br />
        <button onClick={loginHandle}>Login</button>
        <button onClick={signUpHandle}>Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
