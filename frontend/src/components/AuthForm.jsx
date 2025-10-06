import { useState } from "react";
import { post } from "../utils/api";

const AuthForm = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (mode === "signup" && !name)) {
      alert("Please fill all required fields");
      return;
    }

    const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
    const payload = mode === "login" ? { email, password } : { name, email, password };

    try {
      const res = await post(endpoint, payload);
      if (res.token) {
        onLoginSuccess({ token: res.token, user: res.user });
      } else {
        alert(res.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
      </form>

      <p>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleMode}>
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;