import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter-container" style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9',
      maxWidth: '400px'
    }}>
      <h2>Counter Application</h2>
      
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        {count}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={decrement}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Decrease
        </button>
        
        <button 
          onClick={reset}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4d4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        
        <button 
          onClick={increment}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4dabf7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;
