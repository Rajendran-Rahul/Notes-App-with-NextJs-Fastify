import { Caveat } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner"

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${caveat.className} "min-h-screen flex flex-col bg-paper text-ink`}
      >
        {/* Header */}
        <header className="border-b border-black/10 bg-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-baseline gap-2">
            <span className="relative inline-block">
              <span
                className={`${caveat.className} font-bold text-4xl text-gray-900`}
              >
                Notes
              </span>
              <svg
                viewBox="0 0 120 10"
                className="absolute left-0 -bottom-1 w-full h-2.5"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 C 40 3, 80 8, 118 5"
                  stroke="#f97316"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <Link href={"/notes/create"}>
          <Button>Create Note</Button>
          </Link>
        </header>

        {/* Body content — fills remaining space */}
        <main className="flex-1 overflow-y-auto px-6 py-6 min-h-[calc(100vh-120px)]">{children}</main>
        <Toaster />

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Notes Application. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
