import React from "react";
import "./style.css";

function CreateWallet() {
  return (
    <div className="card-content">
      <div className="title">
        <i className="fa-brands fa-bitcoin"></i>
        My Coin
      </div>
      <div>
        <h3>Create new wallet</h3>
      </div>
      <form>
        <input
          type="text"
          className="name-wallet"
          placeholder="Email..."
        />
        <button type="submit" className="btn-submit">
          Create wallet
        </button>
      </form>
    </div>
  );
}

export default CreateWallet;
