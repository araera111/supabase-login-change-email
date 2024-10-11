import { useState } from "react";
import { supabase } from "./supabase";
import { useLocation } from "wouter";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      // ログイン後の処理をここに記述
      setLocation("/admin");
    }
  };

  return (
    <div
      className="content"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Login
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
          gap: "10px",
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            setLocation("/signup");
          }}
        >
          to Sign Up
        </button>
      </div>
    </div>
  );
};
