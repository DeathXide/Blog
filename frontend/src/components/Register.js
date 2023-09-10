import React, { useState } from "react";
import { Back_URL } from "../API/URL";
function Register() {
  const [username, SetUser] = useState("");
  const [password, Setpass] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username);

    const response = await fetch(`${Back_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Success");
    } else {
      alert("Failed");
    }

    console.log(response);
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <h1>Register</h1>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
