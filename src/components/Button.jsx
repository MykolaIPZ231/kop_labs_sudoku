export default function Button({ children, onClick, style }){
    return(
      <button
        onClick={onClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4a6fa5",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: "16px",
          ...style
        }}
        >
        {children}
        </button>
    )
}