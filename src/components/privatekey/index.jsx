import React from "react";
import "./style.css";

function PrivateKey() {
  return (
    <div className="card-content">
      <div className="title">
        <i className="fa-brands fa-bitcoin"></i>
        My Coin
      </div>
      <div>
        <h3>Enter private key</h3>
      </div>
      <form>
        <input
          type="text"
          className="name-wallet"
          placeholder="Private key..."
        />
        <button type="submit" className="btn-submit">
          Enter private key
        </button>
      </form>
    </div>
  );
}

export default PrivateKey;
