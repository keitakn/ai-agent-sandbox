import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/heroui/providers";

export const metadata: Metadata = {
  title: "AIエージェント用サンドボックス",
  description: "AIエージェント開発の為のサンドボックス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
