'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplinePanel() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="spline-panel" id="spline-panel">
      {/*
        ══════════════════════════════════════════════════════
        SPLINE 3D VIEWER
        ══════════════════════════════════════════════════════
        Replace the URL below with your own Spline scene URL.
        To get a URL:
          1. Go to https://spline.design
          2. Create or open a 3D scene
          3. Click "Export" → "Web Content" → "Viewer"
          4. Copy the generated URL
          5. Paste it in the "url" attribute below
        ══════════════════════════════════════════════════════
      */}
      <spline-viewer
        url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        loading-anim-type="spinner-big-dark"
        onLoad={() => setLoaded(true)}
      />
    </section>
  );
}
