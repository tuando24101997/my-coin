import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import sha256 from "sha256";
import "chart.js/auto";

import "./style.css";
import Block from "../block";

function HomePage() {
  const [modalSend, setModalSend] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [transferWallet, setTransferWallet] = useState("");
  const [valueTransfer, setValueTransfer] = useState(-1);

  const [block, setBlock] = useState([
    {
      id: 0,
      data: "First block",
      prevHash: "none",
      hash: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      name: "GENESIS BLOCK",
    },
  ]);

  const [wallet, setWallet] = useState([]);
  const [myWallet, setMyWallet] = useState({});

  // Thuật toán Proof of Stake
  const ProofOfStake = () => {
    let totalStake = 0;
    for (let i = 0; i < wallet.length; i++) {
      totalStake += wallet[i].coin;
    }

    let random = Math.random() * totalStake;
    let accumulated = 0;

    for (let i = 0; i < wallet.length; i++) {
      const element = wallet[i];
      accumulated += element.coin;
      if (accumulated >= random) {
        // Validator có nhiều Stake thì tỷ lệ được chọn càng cao
        return i; // Return vị trí của Validator
      }
    }
  };

  useEffect(() => {
    // Lấy danh sách ví trong hệ thống
    const lcwallet = JSON.parse(localStorage.getItem("my-wallet"));
    setWallet(lcwallet);

    // Lấy thông tin ví người dùng đang sử dụng
    const user = lcwallet.find(
      (wl) => wl.name === JSON.parse(localStorage.getItem("email-my-coin"))
    );

    // Lấy thông tin block lưu vào hệ thống
    if (localStorage.getItem("block")) {
      const lcblock = JSON.parse(localStorage.getItem("block"));
      setBlock(lcblock);
    }
    // const lcblock = JSON.parse(localStorage.getItem("block"));
    // setBlock(lcblock);

    //console.log(myWallet);

    setMyWallet(user);
  }, []);

  const data = {
    labels: ["Total Coin", "Coins Transferred", "Coins Received", "Coin Mined"],
    datasets: [
      {
        label: "Coin",
        data: [
          myWallet.coin,
          myWallet.transfer,
          myWallet.recieved,
          myWallet.mined,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valueTransfer > myWallet.coin || valueTransfer <= 0 || transferWallet === "" ) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Dữ liệu đầu vào không phù hợp",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Do you want to send coin?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Edit value list wallet
          const miner = ProofOfStake();
          let newWallet = wallet;
          newWallet[Number(transferWallet)].coin =
            Number(newWallet[Number(transferWallet)].coin) +
            Number(valueTransfer);
          newWallet[Number(transferWallet)].recieved =
            Number(newWallet[Number(transferWallet)].recieved) +
            Number(valueTransfer);
          newWallet[myWallet.id].coin =
            Number(newWallet[myWallet.id].coin) - Number(valueTransfer);
          newWallet[myWallet.id].transfer =
            Number(newWallet[myWallet.id].transfer) + Number(valueTransfer);
          newWallet[miner].mined = Number(newWallet[miner].mined) + 1;
          newWallet[miner].coin = Number(newWallet[miner].coin) + 1;

          setWallet(newWallet);
          const listWalletJSON = JSON.stringify(newWallet);
          localStorage.setItem("my-wallet", listWalletJSON);

          // Add Transaction in History
          // id, transaction id, from, to, value
          const transaction = {
            id: Math.floor(Date.now() / 1000),
            transactionId: sha256(block.length),
            from: myWallet.hashId,
            to: newWallet[Number(transferWallet)].hashId,
            block: block.length,
            value: valueTransfer,
            idMiner: wallet[miner].hashId,
            nameMiner: wallet[miner].name,
          };

          let listHistory = JSON.parse(
            localStorage.getItem("transaction-history")
          );
          if (listHistory) {
            listHistory.push(transaction);
            const listTransactionJSON = JSON.stringify(listHistory);
            localStorage.setItem("transaction-history", listTransactionJSON);
          } else {
            let listTransaction = [];
            listTransaction.push(transaction);
            const listTransactionJSON = JSON.stringify(listTransaction);
            localStorage.setItem("transaction-history", listTransactionJSON);
          }

          // Add block in block chain
          const newBlock = {
            id: block.length,
            data:
              myWallet.name +
              " send to " +
              newWallet[Number(transferWallet)].name +
              " " +
              valueTransfer +
              " coin",
            prevHash: block[block.length - 1].hash,
            hash: sha256("BLOCK #" + block.length),
            name: "BLOCK #" + block.length,
          };
          let currentBlock = block;
          currentBlock.push(newBlock);
          setBlock(currentBlock);

          const listBlockJSON = JSON.stringify(currentBlock);
          localStorage.setItem("block", listBlockJSON);

          setModalSend(false);
          Swal.fire({
            icon: "success",
            title: "Send coin success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    }
  };

  return (
    <div>
      <div className="header shadow-sm mb-4">
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>HOMEPAGE</p>
        <div>
          <a href="/transaction">View Transaction</a>
          <a href="/login">Swap Wallet</a>
        </div>
      </div>

      <div className="container cont">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <p
                style={{
                  height: "40px",
                  lineHeight: "40px",
                  color: "white",
                  backgroundColor: "rgb(30 66 173)",
                  padding: "0 5px",
                  borderRadius: "3px 3px 0 0",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <i
                  className="fa-brands fa-bitcoin"
                  style={{ marginRight: "5px" }}
                ></i>{" "}
                My Wallet
              </p>
              <div style={{ padding: "0 1.8em" }}>
                <div className="row mb-2">
                  <div className="col-5 txt-infor-wallet">Name</div>
                  <div className="col-7 txt-infor-wallet-2">
                    {myWallet.name}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 txt-infor-wallet">Id</div>
                  <div className="col-7 long-text txt-infor-wallet-2 hash-id">
                    {myWallet.hashId}
                  </div>
                </div>
                <div className="row mb-2 ">
                  <div className="col-5 txt-infor-wallet">Total Coin</div>
                  <div className="col-7 txt-infor-wallet-2">
                    <span className="coin-1">{myWallet.coin}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 txt-infor-wallet">Coin Transferred</div>
                  <div className="col-7 txt-infor-wallet-2">
                    <span className="coin-2">{myWallet.transfer}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 txt-infor-wallet">Coin Reciedved</div>
                  <div className="col-7 txt-infor-wallet-2">
                    <span className="coin-3">{myWallet.recieved}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 txt-infor-wallet">Coin Mined</div>
                  <div className="col-7 txt-infor-wallet-2">
                    <span className="coin-4">{myWallet.mined}</span>
                  </div>
                </div>
              </div>

              <div className="group-button mb-3 mt-3">
                <button type="button" onClick={() => setModalSend(true)}>
                  Send coin
                </button>
                {/* Modal show send coin */}
                <Modal show={modalSend} onHide={() => setModalSend(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Send Coin</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: "500" }}>
                          Choose Wallet
                        </label>
                        <select
                          value={transferWallet}
                          className="form-control"
                          onChange={(event) =>
                            setTransferWallet(event.target.value)
                          }
                        >
                          <option value="">Chọn ví...</option>
                          {wallet.map((wl) => {
                            if (
                              wl.name !==
                              JSON.parse(localStorage.getItem("email-my-coin"))
                            ) {
                              return (
                                <option value={wl.id} key={wl.id}>
                                  {wl.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                      <div className="mt-3">
                        <label style={{ fontSize: "13px", fontWeight: "500" }}>
                          Input coin
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setValueTransfer(e.target.value)}
                        />
                      </div>
                      <div
                        className="mt-4 mb-2"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button className="btn btn-primary" type="submit">
                          Send coin
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>

                <button type="button" onClick={() => setModalView(true)}>
                  View transaction
                </button>
                <Modal show={modalView} onHide={() => setModalView(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>View Transaction</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div
                      style={{
                        width: "350px",
                        height: "350px",
                        marginLeft: "55px",
                        marginBottom: "15px",
                      }}
                    >
                      <Pie data={data} options={options} />
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>

          <div className="col-8">
            <p style={{fontWeight: 'bold', fontSize: '20px'}}>BLOCKCHAIN</p>
            <div className="list-blockchain">
              {block.map((bl) => (
                <Block
                  name={bl.name}
                  key={bl.id}
                  prevHash={bl.prevHash}
                  hash={bl.hash}
                  data={bl.data}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
