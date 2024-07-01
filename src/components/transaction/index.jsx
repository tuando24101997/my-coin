import React, { useEffect, useState } from "react";
//import { Table } from "react-bootstrap";
import "./style.css";

function Transaction() {
  const [listTransaction, setListTransacTion] = useState([]);

  useEffect(()=>{
    const listHistory = JSON.parse(localStorage.getItem("transaction-history"));
    console.log(listHistory)
    setListTransacTion(listHistory);
  }, [])
  return (
    <div>
      <div className="header-transaction shadow-sm mb-4">
        <p style={{fontSize: '20px', fontWeight: '500'}}>Transaction History</p>
        <a href="/home">
        <span>Return Homepage</span></a>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Transaction Hash</th>
              <th>Method</th>
              <th>Block</th>
              <th>From</th>
              <th></th>
              <th>To</th>
              <th>Value coin</th>
            </tr>
            {listTransaction.map( transaction => {
              return (
                <tr key={transaction.id}>
                  <td className="txtHash">{transaction.transactionId}</td>
                  <td>
                    <span className="txtBlock">Transfer</span>
                  </td>
                  <td>{transaction.block}</td>
                  <td className="txtWallet">{transaction.from}</td>
                  <td><i className="fa-solid fa-arrow-right txtArrow" ></i></td>
                  <td className="txtWallet">{transaction.to}</td>
                  <td>{transaction.value}</td>
                </tr>
              )
            })}

            <tr>
              <td className="txtHash">0x63eguwkgaud7g72hagsdu6a7sd1887a8w</td>
              <td>
                <span className="txtBlock">Transfer</span>
              </td>
              <td>Germany</td>
              <td className="txtWallet">0xa4cE4Ec7D2506251d780DC05ab2DAb6D1Ed78BE0</td>
              <td><i className="fa-solid fa-arrow-right txtArrow" ></i></td>
              <td className="txtWallet">0xa4cE4Ec7D2506251d780DC05ab2DAb6D1Ed78BE0</td>
              <td>12</td>
            </tr>
            <tr>
              <td className="txtHash">0x63eguwkgaud7g72hagsdu6a7sd1887a8w</td>
              <td>
                <span className="txtBlock">Transfer</span>
              </td>
              <td>Germany</td>
              <td className="txtWallet">0xa4cE4Ec7D2506251d780DC05ab2DAb6D1Ed78BE0</td>
              <td><i className="fa-solid fa-arrow-right txtArrow" ></i></td>
              <td className="txtWallet">0xa4cE4Ec7D2506251d780DC05ab2DAb6D1Ed78BE0</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
