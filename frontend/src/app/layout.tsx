import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import * as Organism from '@/components/organisms'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: '署名オンライン',
  description:
    '署名オンラインはあなたの「変えたい」気持ちを形にする、ソーシャルプラットフォームです。現在世界中で２億人のユーザーがChange.orgを利用し、「チェンジ」を実現しています。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Organism.Header />
        {children}
      </body>
    </html>
  )
}
