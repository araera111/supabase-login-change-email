import { useState } from "react";
import { supabase } from "./supabase";
import { useLocation } from "wouter";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [, setLocation] = useLocation();

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password1,
    });
    if (error) {
      alert(error.message);
      return;
    }
    console.log({ data });
    alert("Check your email for the confirmation link");
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
        Sign Up
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* password1,2 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="password1">Password1</label>
        <input
          type="password"
          id="password1"
          name="password1"
          placeholder="Your password"
          required
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />

        <label htmlFor="password2">Password2</label>
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="Your password"
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <button
        type="button"
        style={{
          maxWidth: "300px",
          margin: "0 auto",
        }}
        onClick={signUp}
        disabled={password1 !== password2}
      >
        Sign Up
      </button>

      <button
        type="button"
        style={{
          maxWidth: "300px",
          margin: "0 auto",
        }}
        onClick={() => {
          setLocation("/login");
        }}
      >
        to Login
      </button>
    </div>
  );
};
