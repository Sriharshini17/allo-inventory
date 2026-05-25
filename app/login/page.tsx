"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      email ===
        "admin@allo.com" &&

      password ===
        "admin123"
    ) {

      localStorage.setItem(
        "admin",
        "true"
      );

      router.push(
        "/admin"
      );

    } else {

      alert(
        "Invalid Credentials"
      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "linear-gradient(to bottom right, #020617, #111827)",

        fontFamily:
          "Arial",
      }}
    >

      <div
        style={{
          width: "420px",

          backgroundColor:
            "rgba(255,255,255,0.08)",

          padding: "40px",

          borderRadius:
            "28px",

          backdropFilter:
            "blur(10px)",
        }}
      >

        <h1
          style={{
            color: "white",

            marginBottom:
              "30px",

            textAlign:
              "center",
          }}
        >
          Admin Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={login}
          style={{
            width: "100%",

            background:
              "linear-gradient(to right, #2563eb, #7c3aed)",

            color: "white",

            padding: "16px",

            border: "none",

            borderRadius:
              "16px",

            fontWeight:
              "bold",

            fontSize: "16px",

            cursor: "pointer",
          }}
        >
          Login
        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "16px",

  marginBottom: "20px",

  borderRadius: "14px",

  border: "none",

  outline: "none",

  backgroundColor:
    "rgba(255,255,255,0.1)",

  color: "white",

} as React.CSSProperties;