export default function Cell({ value, isSelected, onClick, row, col, isInitial = false }) {
    const borderStyle = {
        borderTop: row % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderLeft: col % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderRight: col === 8 ? '2px solid #000' : (col + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderBottom: row === 8 ? '2px solid #000' : (row + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
    };

    return (
        <div 
            onClick={!isInitial ? onClick : undefined}    
            style={{
                width: '50px',
                height: '50px',
                ...borderStyle,
                background: isSelected ? "#5aa4daff" : "#fff",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: isInitial ? 'default' : 'pointer',
                color: isInitial ? '#000000ff' : '#006cc4ff',
                fontWeight: 'bold',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'background-color 0.2s',
                userSelect: 'none'
            }}
            onMouseEnter={(e) => {
                if(!isSelected){
                    e.target.style.backgroundColor = "#fff";
                }
            }}
            onMouseLeave={(e) => {
                if(!isSelected && !isInitial){
                    e.target.style.backgroundColor = '#fff';
                }
            }}
            >
            {value !== 0 ? value : ''}
        </div>
    );
}