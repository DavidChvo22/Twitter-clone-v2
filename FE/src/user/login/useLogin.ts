import { apiUrl } from "../../utils/api";

export function useLogin(navigate: (path: string) => void) {
  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
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
    handleLogin,
  };
}
