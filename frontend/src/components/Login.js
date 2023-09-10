import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserStateContext } from "./Usercontext";
import { Back_URL } from "../API/URL";
function Login() {
  const [username, SetUser] = useState("");
  const [password, Setpass] = useState("");
  const [redirect, SetRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserStateContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`${Back_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((res) => {
        setUserInfo(res);
        SetRedirect(true);
      });
    } else {
      alert("Wrong Details");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <h1>Login Page</h1>
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => SetUser(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => Setpass(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
