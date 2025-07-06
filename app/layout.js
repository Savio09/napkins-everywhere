import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { MagazineDataProvider } from "@/components/context/magazineContext";

// Primary font for body text - similar to Apple's SF Pro
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display font for headlines - similar to Vogue's Didot elegance
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for code - clean and modern
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Napkins",
  description: "Minerva's premier student editorial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <MagazineDataProvider>
          <Header />
          {children}
          <Footer />
        </MagazineDataProvider>
      </body>
    </html>
  );
}
