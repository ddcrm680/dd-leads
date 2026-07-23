import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useLocation } from "wouter";
import { AuthProvider } from "./lib/auth";
import Layout from "./layout";

import { Router } from "./route";
function App() {
  const [location] = useLocation();
  const hideLayoutList = ["/login"];
  const isAuthPage = hideLayoutList.includes(location);
  const content = isAuthPage ? (
    <Router />
  ) : (
    <Layout>
      <Router />
    </Layout>
  );
  return <AuthProvider>{content}</AuthProvider>;
}

export default App;
