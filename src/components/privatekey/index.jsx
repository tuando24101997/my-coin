import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

function PrivateKey() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === "E9sW2nR4aD7mP1kL3t8h") {
      navigate("/home");
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Private key không đúng",
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
          <h3>Enter private key</h3>
          <span style={{ color: "#555", fontSize: "13px" }}>
            What is <b style={{ color: "#000" }}>#3</b> private key?
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-wallet"
            placeholder="Private key..."
            onChange={(e) => setKey(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Enter private key
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrivateKey;
