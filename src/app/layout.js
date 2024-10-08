import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Sosmed from "@/components/Sosmed"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OverScription",
  description: "Create By Demigohu",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Sosmed />
        {children}
      </body>
    </html>
  )
}
