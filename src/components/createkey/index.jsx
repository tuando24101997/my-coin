import { useNavigate } from "react-router-dom";
import "./style.css";

function CreatePrivateKey() {
  const navigate = useNavigate();
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
        <span style={{ fontSize: "14px" }}>
          Please memorize the Private keys below or take a screenshot of your
          device
        </span>
        <p style={{ margin: "1.5em 0", fontSize: "14px" }}>
          <b>Private key #1</b>{" "}
          <span
            style={{
              backgroundColor: "#dedede",
              borderRadius: "3px",
              padding: "8px 14px",
              marginLeft: "10px",
            }}
          >
            H4kD9mP1sL8nR7bQ3jY
          </span>
        </p>
        <p style={{ margin: "1.5em 0", fontSize: "14px" }}>
          <b>Private key #2</b>{" "}
          <span
            style={{
              backgroundColor: "#dedede",
              borderRadius: "3px",
              padding: "8px 10px",
              marginLeft: "10px",
            }}
          >
            G3fS6pQ2hL9nT4mX8ode
          </span>
        </p>
        <p style={{ margin: "1.5em 0", fontSize: "14px" }}>
          <b>Private key #3</b>{" "}
          <span
            style={{
              backgroundColor: "#dedede",
              borderRadius: "3px",
              padding: "8px 10px",
              marginLeft: "10px",
            }}
          >
            E9sW2nR4aD7mP1kL3t8h
          </span>
        </p>
        <button
          type="submit"
          onClick={() => {
            navigate("/enter-key");
          }}
          className="btn-submit"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CreatePrivateKey;
