import { useRegister } from "./useRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const {
    username,
    password,
    confirmPassword,
    handleRegister,
    handleUsernameInput,
    handlePasswordInput,
    handleConfirmPasswordInput,
  } = useRegister(navigate);

  return (
    <div
      id="login-div"
      className="
            flex items-center justify-center h-screen"
    >
      <form
        className="
              flex flex-col items-center px-10 py-12 text-white
            bg-[rgba(0,0,0,0.8)] rounded-[10px] w-[10%] min-w-[300px] mx-auto"
        onSubmit={handleRegister}
      >
        <h1 className="text-[36px]">Register</h1>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameInput}
        ></input>
        <br />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordInput}
        ></input>
        <input
          placeholder="Confirm Password"
          type="password"
          name="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordInput}
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
