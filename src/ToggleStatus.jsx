import { useState } from 'react';
import("./App.css")
function ToggleStatus() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('open');
  const [message, setMessage] = useState('');

  const handleToggle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://bandhayaopen-backend.onrender.com//toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, status })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("")
        setPassword("")
      } else {
        setMessage(data.message || 'Error updating status');
      }
    } catch (error) {
      setMessage('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="formBox">
      <h2>Toggle Shop Status</h2>
      <form onSubmit={handleToggle}>
        <input
          type="email"
          placeholder="Shop Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="bandh">Bandh</option>
        </select>

        <button type="submit">Update Status</button>
      </form>

      {message && <p className="statusMessage">{message}</p>}
    </div>
  );
}

export default ToggleStatus;
