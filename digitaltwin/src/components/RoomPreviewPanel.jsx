'use client';

export default function RoomPreviewPanel({ roomStates }) {
  const rooms = [
    {
      id: 'living',
      label: 'Living Room',
      litImage: '/rooms/living-lit.png',
      darkImage: '/rooms/living-dark.png',
    },
    {
      id: 'kitchen',
      label: 'Kitchen',
      litImage: '/rooms/kitchen-lit.png',
      darkImage: '/rooms/kitchen-dark.png',
    },
  ];

  return (
    <aside className="room-preview-panel" id="room-preview-panel">
      <h3 className="room-preview-panel__title">Room Preview</h3>
      <p className="room-preview-panel__subtitle">
        Live light status for each room
      </p>

      {rooms.map((room) => {
        const isOn = roomStates?.[room.id] || false;
        return (
          <div
            key={room.id}
            className={`flashcard ${isOn ? 'active' : ''}`}
            id={`flashcard-${room.id}`}
          >
            {/* Dark image (shown when OFF) */}
            <img
              className="flashcard__img flashcard__img--dark"
              src={room.darkImage}
              alt={`${room.label} — lights off`}
              loading="lazy"
            />
            {/* Lit image (shown when ON) */}
            <img
              className="flashcard__img flashcard__img--lit"
              src={room.litImage}
              alt={`${room.label} — lights on`}
              loading="lazy"
            />
            {/* Status orb */}
            <span className="flashcard__accent" />
            {/* Label overlay */}
            <div className="flashcard__overlay">
              <span className="flashcard__label">{room.label}</span>
              <span className="flashcard__state">
                {isOn ? '● Lights On' : '○ Lights Off'}
              </span>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
