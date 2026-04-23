/* ═══════════════════════════════════════════════════════════════
   DigitalTwin — ESP32 Connection Status API Route
   Checks if the ESP32 is reachable over WiFi
   ═══════════════════════════════════════════════════════════════ */

import { NextResponse } from 'next/server';

const ESP32_IP = process.env.ESP32_IP || '192.168.1.100';

/**
 * GET /api/status
 * Returns whether the ESP32 is reachable
 */
export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    await fetch(`http://${ESP32_IP}/`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return NextResponse.json({
      connected: true,
      esp32Ip: ESP32_IP,
      message: 'ESP32 is online',
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      esp32Ip: ESP32_IP,
      message: 'ESP32 is offline or unreachable',
    });
  }
}
