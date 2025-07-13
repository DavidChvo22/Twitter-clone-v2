import { useState } from "react";

interface UseLoginReturn {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleUsernameInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function useLogin(navigate: (path: string) => void): UseLoginReturn {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    navigate("/Register");
  }

  function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
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

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    handleUsernameInput,
    handlePasswordInput,
    handleRegister,
  };
}
