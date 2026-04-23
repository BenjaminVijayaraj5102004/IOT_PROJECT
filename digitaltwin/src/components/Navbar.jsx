'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [status, setStatus] = useState({ connected: false, message: 'Checking...' });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus({ connected: false, message: 'Server error' });
      }
    };

    // Check immediately, then every 10 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar" id="navbar">
      <a className="navbar__brand" href="/">
        <img className="navbar__logo" src="/favicon.svg" alt="DigitalTwin" />
        <h1 className="navbar__title">
          Digital<em>Twin</em>
        </h1>
      </a>

      <div
        className={`status-chip ${status.connected ? 'online' : 'offline'}`}
        id="status-chip"
      >
        <span className="status-chip__dot" />
        <span>{status.connected ? 'ESP32 Connected' : 'ESP32 Offline'}</span>
      </div>
    </nav>
  );
}
