import { useState } from "react";

export function useLogin(navigate: (path: string) => void) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  };
}
