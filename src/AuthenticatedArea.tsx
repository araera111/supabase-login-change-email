import { useLocation } from "wouter";
import { supabase } from "./supabase";
import { useAtomValue } from "jotai";
import { sessionAtom } from "./sessionStore";
import { useState } from "react";

export const AuthenticatedArea = () => {
  const [newEmail, setNewEmail] = useState("");
  const session = useAtomValue(sessionAtom);
  const [, setLocation] = useLocation();
  const logOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      setLocation("/login");
    }
  };
  if (!session) {
    setLocation("/login");
    return <div>loading...</div>;
  }

  const changeEmailHandler = async () => {
    const { data, error } = await supabase.auth.updateUser(
      {
        email: newEmail,
      },
      {
        emailRedirectTo: "http://localhost:3000/login",
      }
    );
    if (error) {
      alert(error.message);
      return;
    }
    console.log({ data });
    alert("Check your email for the confirmation link");
  };

  return (
    <div>
      <h1>This is Authenticated area.</h1>
      <button type="button" onClick={logOutHandler}>
        logout
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
          fontSize: "1.5rem",
        }}
      >
        change email
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <label htmlFor="email">NEW_Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "0 auto",
          paddingTop: "20px",
        }}
      >
        <button type="button" onClick={changeEmailHandler}>
          change email
        </button>
      </div>
    </div>
  );
};
