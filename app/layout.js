import localFont from "next/font/local";
import "./globals.css";

const ztGatha = localFont({
  src: [
    { path: "../public/fonts/Ztgatha Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Ztgatha Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Ztgatha Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-zt-gatha",
  display: "swap",
});

export const metadata = {
  title: "Third Spaces Marketing",
  description: "Gen-Z doesn't watch ads. We make content they actually share. Social-first marketing for brands targeting the next generation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="thirdspaces">
      <body className={`${ztGatha.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
