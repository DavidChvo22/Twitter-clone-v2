export async function useRegister(
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    confirmPassword: string,
    navigate: (path:string) => void
) {
  event.preventDefault();
  if (password.length < 6 || password !== confirmPassword) {
    alert(
      "Email and password must be at least 6 characters and passwords must match"
    );
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
