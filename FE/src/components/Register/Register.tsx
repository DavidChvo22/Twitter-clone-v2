import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 6 || password !== confirmPassword) {
      alert("Email and password must be at least 6 characters and passwords must match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed");
        return;
      }
      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      alert("An error occurred during registration.");
    }
    
  }

  return (
    <div id="login-div" className="flex items-center justify-center h-screen">
      <form
        className="
            flex flex-col items-center
            px-10 py-12
          text-white
          bg-[rgba(0,0,0,0.8)]
            rounded-[10px]
            w-[10%] min-w-[300px]
            mx-auto"
        onSubmit={handleRegister}
      >
        <h1 className="text-[36px]">Register</h1>
        <input
          placeholder="Username"
          type="text"
          name="username"
          onChange={handleEmailInput}
        ></input>
        <br />
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePasswordInput}
        ></input>
        <input
          placeholder="Confirm Password"
          type="password"
          name="password"
          onChange={handleConfirmPasswordInput}
        ></input>
        <br />
        <button
          type="submit"
          className="hover:bg-gray-600 px-5 rounded-4xl mt-[8px]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
