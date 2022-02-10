import React, { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import UserContext from "../../store/UserContext";

import axios from "axios";

const LoginForm = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    axios
      .post(`${REACT_APP_API_ENDPOINT}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        console.log(token);
        setUser({ token });
        localStorage.setItem("auth-token", token);
        navigate("/home");
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        Welcome back!
      </Typography>
      <form
        autoComplete="off"
        style={{ display: "flex", gap: "15px", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{
            fontSize: "20px",
            textTransform: "none",
            backgroundColor: "#1da1f2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1da1f2",
            },
          }}
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <Typography variant="body1">
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            fontWeight: "600",
            color: "#1da1f2",
          }}
        >
          Sign Up
        </Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
