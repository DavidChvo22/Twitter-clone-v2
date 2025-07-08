import { useState } from "react";

interface UseRegisterReturn {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleUsernameInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export function useRegister(
  navigate: (path: string) => void
): UseRegisterReturn {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 6 || password !== confirmPassword) {
      alert(
        "Username and password must be at least 6 characters and passwords must match"
      );
      return;
    }

    try {
      console.log("About to send fetch request");
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Registration failed:", errorData);
        alert(errorData.message || "Registration failed");
        return;
      }
      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      alert("An error occurred during registration.");
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    handleUsernameInput,
    handlePasswordInput,
    handleConfirmPasswordInput,
  };
}
