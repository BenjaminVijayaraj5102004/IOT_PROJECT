'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import GuidePanel from '@/components/GuidePanel';
import ControlPanel from '@/components/ControlPanel';
import RoomPreviewPanel from '@/components/RoomPreviewPanel';

export default function Home() {
  const [roomStates, setRoomStates] = useState({
    living: false,
    kitchen: false,
  });

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <GuidePanel />
        <ControlPanel onStateChange={setRoomStates} />
        <RoomPreviewPanel roomStates={roomStates} />
      </main>
    </div>
  );
}
