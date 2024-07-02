import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";
import sha256 from "sha256";

function PrivateKey() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === "E9sW2nR4aD7mP1kL3t8h") {
      let wallet = JSON.parse(localStorage.getItem("my-wallet"));
      if (wallet) {
        const findWallet = wallet.find(
          (wl) => wl.name === JSON.parse(localStorage.getItem("email-my-coin"))
        );
        if (typeof findWallet === "undefined") {
          const newWallet = {
            id: wallet.length,
            name: JSON.parse(localStorage.getItem("email-my-coin")),
            password: JSON.parse(localStorage.getItem("password-my-coin")),
            hashId:
              "0x" + sha256(JSON.parse(localStorage.getItem("email-my-coin"))),
            coin: 0,
            transfer: 0,
            recieved: 0,
            mined: 0,
          };
          wallet.push(newWallet);
          const listWalletJSON = JSON.stringify(wallet);
          localStorage.setItem("my-wallet", listWalletJSON);
        }
      } else {
        let listWallet = [];
        const newWallet = {
          id: 0,
          name: JSON.parse(localStorage.getItem("email-my-coin")),
          password: JSON.parse(localStorage.getItem("password-my-coin")),
          hashId:
            "0x" + sha256(JSON.parse(localStorage.getItem("email-my-coin"))),
          coin: 100,
          transfer: 0,
          recieved: 0,
          mined: 0,
        };
        listWallet.push(newWallet);
        const listWalletJSON = JSON.stringify(listWallet);
        localStorage.setItem("my-wallet", listWalletJSON);
      }
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
        height: "100vh",
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
