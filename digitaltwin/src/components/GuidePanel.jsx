export default function GuidePanel() {
  return (
    <aside className="guide-panel" id="guide-panel">
      {/* How to Use */}
      <section className="guide-panel__section">
        <h2 className="guide-panel__title">
          <span className="icon">📖</span> How to Use
        </h2>

        <div className="step-card">
          <span className="step-card__number">1</span>
          <div className="step-card__title">Power Up</div>
          <div className="step-card__body">
            Upload the <code>Smarthomw.ino</code> sketch to your ESP32 via
            Arduino IDE. Open <strong>Serial Monitor</strong> at 115200 baud
            to confirm WiFi connection.
          </div>
        </div>

        <div className="step-card">
          <span className="step-card__number">2</span>
          <div className="step-card__title">Configure IP</div>
          <div className="step-card__body">
            Copy the ESP32&apos;s IP from Serial Monitor and set it in the{' '}
            <code>.env.local</code> file:{' '}
            <code>ESP32_IP=192.168.x.x</code>. Restart the dev server.
          </div>
        </div>

        <div className="step-card">
          <span className="step-card__number">3</span>
          <div className="step-card__title">Control Lights</div>
          <div className="step-card__body">
            Use the toggle switches to control your{' '}
            <strong>Living Room</strong> and <strong>Kitchen</strong> lights.
            The connection status auto-updates in the top bar.
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="guide-panel__section">
        <h2 className="guide-panel__title">
          <span className="icon">🔧</span> Troubleshooting
        </h2>

        <div className="step-card">
          <div className="step-card__title">Can&apos;t Connect?</div>
          <div className="step-card__body">
            Ensure your PC and ESP32 are on the{' '}
            <strong>same WiFi network</strong>. The status chip in the navbar
            will show &quot;ESP32 Connected&quot; when ready.
            <span className="tag tag--warn">⚠ Common Issue</span>
          </div>
        </div>

        <div className="step-card">
          <div className="step-card__title">LEDs Not Responding?</div>
          <div className="step-card__body">
            Verify wiring. <strong>Living Room</strong> uses GPIO 2 (on-board
            LED). <strong>Kitchen</strong> uses GPIO 4 (external LED with
            220Ω resistor).
            <span className="tag tag--tip">💡 Hardware Tip</span>
          </div>
        </div>

        <div className="step-card">
          <div className="step-card__title">Connection Timeout?</div>
          <div className="step-card__body">
            Press <strong>RST</strong> on the ESP32. Wait for reconnection. A
            new IP may be assigned — update <code>.env.local</code>{' '}
            accordingly.
            <span className="tag tag--warn">⚠ Common Issue</span>
          </div>
        </div>

        <div className="step-card">
          <div className="step-card__title">Server Error?</div>
          <div className="step-card__body">
            Restart the Next.js dev server with <code>npm run dev</code>.
            Ensure the <code>.env.local</code> file exists in the project
            root with the correct ESP32 IP.
            <span className="tag tag--tip">💡 Dev Tip</span>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="guide-panel__section">
        <h2 className="guide-panel__title">
          <span className="icon">📐</span> Quick Reference
        </h2>
        <ul className="ref-list">
          <li>
            <strong>Living Room</strong> — GPIO 2 (on-board LED)
          </li>
          <li>
            <strong>Kitchen</strong> — GPIO 4 (external LED)
          </li>
          <li>
            <strong>WiFi</strong> — Connects to SSID in sketch
          </li>
          <li>
            <strong>Server</strong> — ESP32 on port 80 (HTTP)
          </li>
        </ul>
      </section>
    </aside>
  );
}
