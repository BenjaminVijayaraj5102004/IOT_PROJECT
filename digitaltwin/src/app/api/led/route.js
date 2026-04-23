/* ═══════════════════════════════════════════════════════════════
   DigitalTwin — LED Control API Route
   Proxies requests from the frontend to the ESP32 over WiFi
   ═══════════════════════════════════════════════════════════════ */

import { NextResponse } from 'next/server';

const ESP32_IP = process.env.ESP32_IP || '192.168.1.100';

/**
 * GET /api/led?room=living&action=on
 * GET /api/led?room=kitchen&action=off
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get('room');
  const action = searchParams.get('action');

  // Map room names to ESP32 LED endpoints
  const endpointMap = {
    'living-on': 'L1ON',
    'living-off': 'L1OFF',
    'kitchen-on': 'L2ON',
    'kitchen-off': 'L2OFF',
  };

  const key = `${room}-${action}`;
  const endpoint = endpointMap[key];

  if (!endpoint) {
    return NextResponse.json(
      { success: false, error: 'Invalid room or action' },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`http://${ESP32_IP}/${endpoint}`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return NextResponse.json({
      success: true,
      room,
      action,
      endpoint,
      esp32Ip: ESP32_IP,
    });
  } catch (err) {
    const message =
      err.name === 'AbortError'
        ? 'ESP32 request timed out (5s)'
        : `ESP32 connection failed: ${err.message}`;

    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
