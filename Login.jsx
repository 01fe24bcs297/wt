import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (name === "") {
      alert("Enter Name");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid Email");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain letter and number"
      );
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={submitHandler}
      >
        <h2>Hotel Login</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          text="Login"
          type="submit"
        />
      </form>
    </div>
  );
}

export default Login;