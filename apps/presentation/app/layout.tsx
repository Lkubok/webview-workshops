import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Native WebView Integration Workshop',
  description: 'A comprehensive workshop on WebView integration patterns, security, and best practices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}