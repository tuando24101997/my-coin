import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

const validateEmail = (input) => {
  const lengthValid = input.length > 2;
  const specialCharPattern = /^[a-zA-Z0-9]*$/;
  const noSpecialChars = specialCharPattern.test(input);
  return lengthValid && noSpecialChars;
};

const validatePassword = (input) => {
  const lengthValid = input.length > 5;
  return lengthValid;
};

function CreateWallet() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validateEmail(email);
    const checkPassword = validatePassword(password);

    if (check && checkPassword) {
      let wallet = JSON.parse(localStorage.getItem("my-wallet"));
      console.log(wallet);
      if (wallet) {
        const findWallet = wallet.find((wl) => wl.name === email);
        console.log(findWallet);
        if (findWallet === undefined) {
          navigate("/key");
          const nameJSON = JSON.stringify(email);
          localStorage.setItem("email-my-coin", nameJSON);
          const passwordJSON = JSON.stringify(password);
          localStorage.setItem("password-my-coin", passwordJSON);
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Username đã tồn tại",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }else {
        navigate("/key");
        const nameJSON = JSON.stringify(email);
        localStorage.setItem("email-my-coin", nameJSON);
        const passwordJSON = JSON.stringify(email);
        localStorage.setItem("password-my-coin", passwordJSON);
      }

      // let wallet = JSON.parse(localStorage.getItem("my-wallet"));
      // if (wallet) {
      //   const findWallet = wallet.find(wl => wl.name === email);
      //   if(findWallet === 'undefined'){
      //     navigate("/key");
      //     const nameJSON = JSON.stringify(email);
      //     localStorage.setItem("email-my-coin", nameJSON);
      //     const passwordJSON = JSON.stringify(email);
      //     localStorage.setItem("password-my-coin", passwordJSON);
      //   } else {
      //     Swal.fire({
      //       icon: "error",
      //       title: "Lỗi",
      //       text: "Username đã tồn tại",
      //       showConfirmButton: false,
      //       timer: 2500,
      //     });
      //   }
      // } else {
      //   navigate("/key");
      //   const nameJSON = JSON.stringify(email);
      //   localStorage.setItem("email-my-coin", nameJSON);
      //   const passwordJSON = JSON.stringify(email);
      //   localStorage.setItem("password-my-coin", passwordJSON);
      // }
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Username phải nhiều hơn 2 kí tự, không có kí tự đặc biệt và Password phải nhiều hơn 5 kí tự",
        showConfirmButton: false,
        timer: 2500,
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
          <h3>Tạo ví mới</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-wallet mb-4"
            placeholder="Tên ví..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="name-wallet mb-2"
            placeholder="Mật khẩu ví..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Create wallet
          </button>
        </form>
        <p style={{ marginTop: "1.2em", fontSize: "12px" }}>
          Bạn đã có ví? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}

export default CreateWallet;
