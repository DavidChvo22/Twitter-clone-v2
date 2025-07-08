import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

export default function Login() {
  const navigate = useNavigate();

  const {
    username,
    handleUsernameInput,
    password,
    handlePasswordInput,
    handleLogin,
    handleRegister,
  } = useLogin(navigate);

  return (
    <div
      id="login-div"
      className="
            flex items-center justify-center h-screen"
    >
      <form
        id="login-form"
        className="
              flex flex-col items-center px-10 py-12 text-white
            bg-[rgba(0,0,0,0.8)] rounded-[10px] w-[10%] min-w-[300px] mx-auto"
        onSubmit={handleLogin}
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
          onChange={handleUsernameInput}
        ></input>
        <br />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordInput}
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
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}
