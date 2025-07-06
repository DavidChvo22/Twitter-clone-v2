import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister as helpRegister } from './useRegister'

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

  function handleConfirmPasswordInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    helpRegister(event, email, password, confirmPassword, navigate);
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
        className="
              flex 
              flex-col 
              items-center
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
          className="
              hover:bg-gray-600 
                px-5 
                rounded-4xl 
                mt-[8px]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
