import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          localStorage.setItem("user", "maverick");
          navigate("/dashboard");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
