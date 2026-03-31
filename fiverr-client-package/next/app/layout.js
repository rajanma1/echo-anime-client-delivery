import "./globals.css";

export const metadata = {
  title: "ECHO ANIME | Next.js Edition",
  description: "12 hand-crafted anime characters with export-ready assets"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
