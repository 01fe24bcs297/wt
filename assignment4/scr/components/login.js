import React, { useState } from "react";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = () => {
    if (username.trim() === "" || password.trim() === "") {
      setMsg("Please fill all fields");
      return;
    }

    setLoggedIn(true);
  };

  return (
    <div className="loginBox">

      <h2>Movie Search Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

      <p className="error">{msg}</p>

    </div>
  );
}

export default Login;
