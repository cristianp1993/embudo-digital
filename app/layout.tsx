import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vive el Embudo - Experimento Digital",
  description: "Experimento interactivo sobre embudos digitales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
