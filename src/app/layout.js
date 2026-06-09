import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fake Tweet Generator | Pro",
  description: "Generate stunning fake tweets in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
