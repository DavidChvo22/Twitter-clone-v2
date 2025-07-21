import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import { useState } from "react";
import './login.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    handleLogin,
  } = useLogin(navigate);

  return (
    <div
      id="login-div"
      className="
            flex items-center justify-center h-screen"
    >
      <form
        id="login-form"
        className="login-form"
        onSubmit={(event) => handleLogin(event, username, password)}
      >
        <h1 id="login-title" className="text-[36px]">
          Login
        </h1>
        <input
          className="login-input"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button
          id="login-button"
          type="submit"
          className="
              hover:bg-gray-600 px-5 rounded-4xl mt-[8px]"
        >
          Log In
        </button>
        <button
          type="button"
          className="
                hover:bg-gray-600 px-5 rounded-4xl mt-[8px]"
          onClick={(e) => navigate("/Register")}
        >
          Register
        </button>
      </form>
    </div>
  );
}
