import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.length < 6 || password.length < 6) {
      alert("Email and password must be at least 6 characters");
      return;
    }
    navigate("/Home");
  }

  return (
    <div id="login-div" className="flex items-center justify-center h-screen">
      <form
        id="login-form"
        className="
            flex flex-col items-center
            px-10 py-12
          text-white
          bg-[rgba(0,0,0,0.8)]
            rounded-[10px]
            w-[10%] min-w-[300px]
            mx-auto"
        onSubmit={handleLogin}
      >
        <h1 id="login-title" className="text-[36px]">Login</h1>
        <input
          className="login-input"
          placeholder="E-mail"
          type="text"
          name="email"
          onChange={handleEmailInput}
        ></input>
        <br />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePasswordInput}
        ></input>
        <br />
        <button id="login-button" type="submit" className="hover:bg-gray-600 px-5 rounded-4xl mt-[8px]">
          Log In
        </button>
      </form>
    </div>
  );
}
