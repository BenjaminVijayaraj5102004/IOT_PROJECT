'use client';

import { useState, useCallback } from 'react';

export default function ControlPanel({ onStateChange }) {
  const [rooms, setRooms] = useState([
    { id: 'living', name: 'Living Room', icon: '🛋️', isOn: false, loading: false },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳', isOn: false, loading: false },
  ]);

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
    }, 3500);
  }, []);

  const toggleRoom = useCallback(
    async (roomId) => {
      setRooms((prev) =>
        prev.map((r) => (r.id === roomId ? { ...r, loading: true } : r))
      );

      const room = rooms.find((r) => r.id === roomId);
      const newState = !room.isOn;
      const action = newState ? 'on' : 'off';

      try {
        const res = await fetch(`/api/led?room=${roomId}&action=${action}`);
        const data = await res.json();

        if (data.success) {
          const updatedRooms = rooms.map((r) =>
            r.id === roomId ? { ...r, isOn: newState, loading: false } : r
          );
          setRooms(updatedRooms);
          showToast(`${room.name} light turned ${action.toUpperCase()}`, 'success');
          // Notify parent of state changes for flashcards
          if (onStateChange) {
            const stateMap = {};
            updatedRooms.forEach((r) => { stateMap[r.id] = r.isOn; });
            onStateChange(stateMap);
          }
        } else {
          setRooms((prev) =>
            prev.map((r) => (r.id === roomId ? { ...r, loading: false } : r))
          );
          showToast(data.error || 'Command failed', 'error');
        }
      } catch (err) {
        setRooms((prev) =>
          prev.map((r) => (r.id === roomId ? { ...r, loading: false } : r))
        );
        showToast(`Network error: ${err.message}`, 'error');
      }
    },
    [rooms, showToast, onStateChange]
  );

  const toastIcons = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <>
      <section className="control-panel" id="control-panel">
        <div className="control-panel__header">
          <h2 className="control-panel__title">
            Smart <em>Light</em> Control
          </h2>
          <p className="control-panel__subtitle">
            Toggle your home lights in real-time. Each switch sends a command
            directly to your ESP32 over WiFi.
          </p>
        </div>

        <div className="room-cards">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`room-card ${room.isOn ? 'active' : ''}`}
              id={`card-${room.id}`}
            >
              <div className="room-card__info">
                <span className="room-card__icon">{room.icon}</span>
                <span className="room-card__name">{room.name}</span>
                <span className="room-card__status">
                  {room.loading
                    ? '◌ SWITCHING...'
                    : room.isOn
                    ? '● ACTIVE'
                    : '○ STANDBY'}
                </span>
              </div>
              <div className="toggle-area">
                <span className={`glow-orb ${room.isOn ? 'lit' : ''}`} />
                <label className="toggle" htmlFor={`toggle-${room.id}`}>
                  <input
                    type="checkbox"
                    id={`toggle-${room.id}`}
                    checked={room.isOn}
                    onChange={() => toggleRoom(room.id)}
                    disabled={room.loading}
                  />
                  <span className="toggle__track" />
                  <span className="toggle__thumb" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="toast-stack" id="toast-stack">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type} ${toast.leaving ? 'leaving' : ''}`}
          >
            <span className="toast__icon">{toastIcons[toast.type]}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
