import { useRegister } from "./useRegister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './register.css'

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister } = useRegister(navigate);

  return (
    <div
      id="login-div"
      className="
            flex items-center justify-center h-screen"
    >
      <form
        className="register-form"
        onSubmit={(event) =>
          handleRegister(event, username, password, confirmPassword)
        }
      >
        <h1 className="text-[36px]">Register</h1>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          placeholder="Confirm Password"
          type="password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <br />
        <button
          type="submit"
          className="
              hover:bg-gray-600 px-5 rounded-4xl mt-[8px]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
