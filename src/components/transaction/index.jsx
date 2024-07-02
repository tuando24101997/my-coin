import React, { useEffect, useState } from "react";
//import { Table } from "react-bootstrap";
import "./style.css";

function Transaction() {
  const [listTransaction, setListTransacTion] = useState([]);

  useEffect(() => {
    const listHistory = JSON.parse(localStorage.getItem("transaction-history"));
    console.log(listHistory);
    setListTransacTion(listHistory);
  }, []);
  return (
    <div>
      <div className="header-transaction shadow-sm mb-4">
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          Transaction History
        </p>
        <a href="/home">
          <span>Return Homepage</span>
        </a>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Block</th>
              <th>Method</th>

              <th>From</th>
              <th></th>
              <th>To</th>
              <th>Value coin</th>
              <th>Miner</th>
            </tr>
            {listTransaction.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="txtCenter">{transaction.block}</td>
                  <td>
                    <span className="txtBlock">Transfer</span>
                  </td>

                  <td className="txtWallet">{transaction.from}</td>
                  <td>
                    <i className="fa-solid fa-arrow-right txtArrow"></i>
                  </td>
                  <td className="txtWallet">{transaction.to}</td>
                  <td className="txtCenter">{transaction.value}</td>
                  <td
                    className="txtWalletMiner"
                    title={transaction.nameMiner}
                  >
                    {transaction.idMiner}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
