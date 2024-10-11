import { createClient } from "@supabase/supabase-js";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { sessionAtom } from "./sessionStore";
import { supabase } from "./supabase";
import { SignUp } from "./SignUp";
import { Route, Switch, useLocation } from "wouter";
import { Login } from "./Login";
import { AuthenticatedArea } from "./AuthenticatedArea";

const App = () => {
  const [location, setLocation] = useLocation();
  const [session, setSession] = useAtom(sessionAtom);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLocation(session ? "/admin" : "/login");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLocation(session ? "/admin" : "/login");
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLocation]);

  return (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AuthenticatedArea} />
      <Route path="/" component={Login} />
    </Switch>
  );
};

export default App;
