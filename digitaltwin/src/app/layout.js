import { Syne, Manrope } from 'next/font/google';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'DigitalTwin — ESP32 Smart Home',
  description:
    'A premium dark IoT dashboard for controlling your ESP32 smart home lights in real-time with interactive flashcard room previews.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <head>
        <meta name="theme-color" content="#050508" />
      </head>
      <body>{children}</body>
    </html>
  );
}
