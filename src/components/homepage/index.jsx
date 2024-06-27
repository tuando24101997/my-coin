import React, { useEffect, useState } from "react";
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">3</div>
        <div className="col-8">
          <div className="card card-wallet shadow-sm">
            <p className="title-data mb-4">
              {" "}
              <span>Data</span> This is first block
            </p>
            <div style={{fontSize: '13px', marginTop: '5px'}}>
                <p style={{fontWeight: '500'}}> Previous Hash 
                    <span style={{padding: '4px 10px', border: 'solid .5px #0d0db3', borderRadius: '3px', marginLeft: '10px', backgroundColor: "rgb(214 223 250 / 64%)", color: '#4e4eff'}}>
                        2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
                    </span> 
                </p>

                <p style={{fontWeight: '500'}}> Current Hash 
                    <span style={{padding: '4px 10px', border: 'solid .5px #0d0db3', borderRadius: '3px', marginLeft: '16px', backgroundColor: "rgb(214 223 250 / 64%)", color: '#4e4eff'}}>
                    d7914fe546b684688bb95f4f888a92dfc680603a75f23eb823658031fff766d9
                    </span> 
                </p>
            </div>
            <p className="mt-3" style={{marginBottom: '5px'}}>
                <span style={{padding: '6px 1em', color: 'white', backgroundColor: '#0d0db3', borderRadius: '4px', fontWeight: 'bold', fontSize: '18px'}}>
                    BLOCK #1
                </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
