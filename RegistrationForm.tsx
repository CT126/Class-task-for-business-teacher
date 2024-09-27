// src/RegistrationForm.tsx
import React, { useState, FormEvent } from 'react';
import './App.css'; // Assuming you want to reuse the styles in App.css

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [reenterPassword, setReenterPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const validateForm = (username: string, password: string, reenterPassword: string): boolean => {
    if (password !== reenterPassword) {
      displayMessage('Passwords do not match.', 'error');
      return false;
    }

    if (password.length < 8 || password.length > 12) {
      displayMessage('Password must be between 8 and 12 characters.', 'error');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      displayMessage('Password must include at least one upper-case letter.', 'error');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      displayMessage('Password must include at least one lower-case letter.', 'error');
      return false;
    }

    if (!/\d/.test(password)) {
      displayMessage('Password must include at least one number.', 'error');
      return false;
    }

    return true;
  };

  const displayMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm(username, password, reenterPassword)) {
      displayMessage('Registration successful!', 'success');
      setUsername('');
      setPassword('');
      setReenterPassword('');
    }
  };

  return (
    <div className="container">
      <h1>Form Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reenterPassword">Re-enter Password:</label>
          <input
            type="password"
            id="reenterPassword"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
          <button
            type="reset"
            onClick={() => {
              setUsername('');
              setPassword('');
              setReenterPassword('');
              setMessage(null);
              setMessageType(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {message && (
        <div id="message" className={messageType || ''}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
