export default function Cell({ value, isSelected, onClick, row, col }) {
    const borderStyle = {
        borderTop: row % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderLeft: col % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderRight: col === 8 ? '2px solid #000' : (col + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderBottom: row === 8 ? '2px solid #000' : (row + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
    };

    const isInitial = value !== 0;

    return (
        <div 
            onClick={onClick}    
            style={{
                width: '50px',
                height: '50px',
                ...borderStyle,
                background: isSelected ? "#5aa4daff" : "#fff",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                color: isInitial ? '#1a237e' : '#2196f3',
                fontWeight: 'bold',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
                if(!isSelected){
                    e.target.style.backgroundColor = "#fff";
                }
            }}
            >
            {value !== 0 ? value : ''}
        </div>
    );
}