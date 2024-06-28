import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
  
import "./style.css";

function HomePage() {
  const [block, setBlock] = useState([
    {
      id: 0,
      data: "First block",
      prevHash: "none",
      hash: "0a57713a039009ebff2dc43afd450706",
      name: "GENESIS BLOCK",
    },
  ]);

  const [wallet, setWallet] = useState([
    {
      id: 0,
      name: JSON.parse(localStorage.getItem("email")) || "",
      coin: 100,
      transfer: 0,
      recieved: 0,
    },
  ]);
  const [modalSend, setModalSend] = useState(false);
  const [modalView, setModalView] = useState(false);

  const data = {
    labels: ['Total Coin', 'Coins Transferred', 'Coins Received', 'Coin Mined'],
    datasets: [
      {
        label: 'Coin',
        data: [98, 12, 3, 1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  

  return (
    <div>
      <div className="header shadow-sm mb-4">
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>HOMEPAGE</p>
        <div>
          <a href="/home">Chuyển ví</a>
          <a href="/">Tạo ví mới</a>
        </div>
      </div>

      <div className="container">
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
                <p>
                  Name <span></span>
                </p>
                <p>
                  Coin <span></span>
                </p>
              </div>

              <div className="group-button mb-3">
                <button type="button" onClick={() => setModalSend(true)}>
                  Send coin
                </button>
                {/* Modal show send coin */}
                <Modal show={modalSend} onHide={() => setModalSend(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Send Coin</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                        <div>
                            <label style={{fontSize: '13px', fontWeight: '500'}}>Choose Wallet</label>
                            <select className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label style={{fontSize: '13px', fontWeight: '500'}}>Input coin</label>
                            <input type="number" className="form-control" />
                        </div>
                        <div className="mt-4 mb-2" style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="btn btn-primary" type="submit">Send coin</button>
                        </div>
                    </form>
                  </Modal.Body>
                </Modal>
                <button type="button" onClick={()=>setModalView(true)}>View transaction</button>
                <Modal show={modalView} onHide={() => setModalView(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>View Transaction</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div style={{width: '350px', height: '350px', marginLeft: '55px', marginBottom: '15px'}}>
                        <Pie data={data} options={options} />
                    </div>
                    
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="card card-wallet shadow-sm">
              <p className="title-data mb-4">
                {" "}
                <span>Data</span> This is first block
              </p>
              <div style={{ fontSize: "13px", marginTop: "5px" }}>
                <p style={{ fontWeight: "500" }}>
                  {" "}
                  Previous Hash
                  <span
                    style={{
                      padding: "4px 10px",
                      border: "solid .5px #0d0db3",
                      borderRadius: "3px",
                      marginLeft: "10px",
                      backgroundColor: "rgb(214 223 250)",
                      color: "#4e4eff",
                    }}
                  >
                    2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
                  </span>
                </p>

                <p style={{ fontWeight: "500" }}>
                  {" "}
                  Current Hash
                  <span
                    style={{
                      padding: "4px 10px",
                      border: "solid .5px #0d0db3",
                      borderRadius: "3px",
                      marginLeft: "16px",
                      backgroundColor: "rgb(214 223 250 / 64%)",
                      color: "#4e4eff",
                    }}
                  >
                    d7914fe546b684688bb95f4f888a92dfc680603a75f23eb823658031fff766d9
                  </span>
                </p>
              </div>
              <p className="mt-2" style={{ marginBottom: "5px" }}>
                <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                  BLOCK #1
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
