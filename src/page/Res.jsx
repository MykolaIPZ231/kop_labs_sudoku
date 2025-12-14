import React from "react";

import Button from "../components/Button";

export default function Res({onRestart, onStart}) {
    return(
        <div className="container" style={{
            textAlign: "center",
            padding: "40px",
            margin: 'auto'
        }}>
            <p style={{ fontSize: "24px", marginBottom: "20px" }}>
                Ви успішно розв'язали судоку
            </p>

        <Button 
          onClick={onRestart}
          style={{
            padding: '15px 35px',
            fontSize: '18px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
            transition: 'all 0.3s',
            minWidth: '180px'
          }}
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
          style={{
            padding: '15px 35px',
            fontSize: '18px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(255, 152, 0, 0.3)',
            transition: 'all 0.3s',
            minWidth: '180px'
          }}
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
    );
}