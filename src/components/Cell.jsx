export default function Cell({ value, isSelected, onClick, row, col }) {
    const borderStyle = {
        borderTop: row % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderLeft: col % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderRight: col === 8 ? '2px solid #000' : (col + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
        borderBottom: row === 8 ? '2px solid #000' : (row + 1) % 3 === 0 ? '2px solid #000' : '1px solid #999',
    };

    return (
        <div 
            onClick={onClick}    
            style={{
                width: '50px',
                height: '50px',
                ...borderStyle,
                background: isSelected ? "#e3f2fd" : "#fff",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                color: value === 0 ? 'transparent' : '#1a237e',
                fontWeight: 'bold',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'background-color 0.2s'
            }}>
            {value !== 0 ? value : ''}
        </div>
    );
}