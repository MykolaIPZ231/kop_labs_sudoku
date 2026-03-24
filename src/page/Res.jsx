import React from "react";

import Button from "../components/Button";

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    margin: "auto",
    maxWidth: "500px",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a"
  },
  message: {
    fontSize: "24px",
    marginBottom: "30px",
    color: "#2ecc71"
  },
  buttonsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  playAgainButton: {
    padding: "15px 35px",
    fontSize: "18px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
    transition: "all 0.3s",
    minWidth: "180px"
  },
  homeButton: {
    padding: "15px 35px",
    fontSize: "18px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(255, 152, 0, 0.3)",
    transition: "all 0.3s",
    minWidth: "180px"
  }
};

export default function Res({onRestart, onStart}) {
    return(
        <div style={styles.container}>
               <p style={styles.message}>
                Ви успішно розв'язали судоку
            </p>
                <div style={styles.buttonsContainer}>
                <Button
                  onClick={onRestart}
                  style={styles.playAgainButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0b7dda';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2196f3';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Грати знову
                </Button>
        
        <Button 
                  onClick={onStart}
                  style={styles.homeButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e68900';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#ff9800';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
          На головну
        </Button>
      </div>
      </div>
    );
}