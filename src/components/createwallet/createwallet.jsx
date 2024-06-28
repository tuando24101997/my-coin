import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

function CreateWallet() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validateEmail(email);
    if (check) {
      navigate("/key");
      const privateKeyJSON = JSON.stringify(email);
      localStorage.setItem("email-my-coin", privateKeyJSON);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Email không chính xác",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh'
      }}
    >
      <div className="card-content">
        <div className="title">
          <i className="fa-brands fa-bitcoin"></i>
          My Coin
        </div>
        <div>
          <h3>Create new wallet</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-wallet"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Create wallet
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateWallet;
