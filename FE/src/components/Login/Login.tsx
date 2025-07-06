import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      navigate("/Home");
    } catch (err) {
      alert("An error occurred during login.");
    }
  }

  function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    navigate("/Register");
  }

  return (
    <div
      id="login-div"
      className="
            flex 
            items-center 
            justify-center 
            h-screen"
    >
      <form
        id="login-form"
        className="
              flex 
              flex-col 
              items-center
              px-10 
              py-12
            text-white
            bg-[rgba(0,0,0,0.8)]
              rounded-[10px]
              w-[10%] 
              min-w-[300px]
              mx-auto"
        onSubmit={handleLogin}
      >
        <h1 id="login-title" 
            className="text-[36px]">
          Login
        </h1>
        <input
          className="login-input"
          placeholder="Username"
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
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
        <button
          id="login-button"
          type="submit"
          className="
              hover:bg-gray-600 
                px-5 
                rounded-4xl 
                mt-[8px]"
        >
          Log In
        </button>
        <button
          type="button"
          className="
                hover:bg-gray-600 
                px-5 
                rounded-4xl 
                mt-[8px]"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
}
