export default function Cell({ value }) {
    return (
        <div style={{
            width: '50px',
            height: '50px',
            border: '1px white solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
        }}>
            {value || ""}
        </div>
    );
}