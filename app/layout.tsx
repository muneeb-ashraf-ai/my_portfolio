import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ClientShell from '@/components/ClientShell';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://muneeb-ashraf.vercel.app'),
  title: 'Muneeb Ashraf - AI & Data Science Developer | ML Engineer | Python Expert',
  description:
    'Muneeb Ashraf - AI & Data Science Developer. Expert in Machine Learning, Deep Learning, Python, FastAPI, and Data Science. Building intelligent solutions with mathematics and technology.',
  keywords: [
    'AI Developer',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'Python',
    'FastAPI',
    'TensorFlow',
    'Data Analyst',
    'Pakistan',
  ],
  authors: [{ name: 'Muneeb Ashraf' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Muneeb Ashraf - AI & Data Science Developer',
    description:
      'Experienced in Machine Learning, Deep Learning, and Data Science. Building intelligent solutions with Python, TensorFlow, and FastAPI.',
    url: 'https://muneeb-ashraf.vercel.app',
    siteName: 'Muneeb Ashraf Portfolio',
    type: 'website',
    images: [
      {
        url: '/assets/profile.png',
        width: 1200,
        height: 630,
        alt: 'Muneeb Ashraf - AI & Data Science Developer',
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muneeb Ashraf - AI & Data Science Developer',
    description:
      'AI & Data Science professional with expertise in ML, DL, Python, and FastAPI.',
    images: ['/assets/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muneeb Ashraf',
  jobTitle: 'AI & Data Science Developer',
  email: 'muneebashraf.edu@gmail.com',
  telephone: '+92-3006275648',
  url: 'https://muneeb-ashraf.vercel.app',
  image: 'https://muneeb-ashraf.vercel.app/assets/profile.png',
  sameAs: ['https://linkedin.com/in/muneeb-ashraf-ai', 'https://github.com/alphaaa-m'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.className = theme;
                const bgColor = theme === 'dark' ? 'bg-midnight' : 'bg-paleLavender';
                const textColor = theme === 'dark' ? 'text-white' : 'text-midnight';
                document.body.className = bgColor + ' ' + textColor;
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.className} theme-transition`}>
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                colors: {
                  paleLavender: '#F3F0F5',
                  lavender: '#6B3B8E',
                  violet: '#3E1F5A',
                  charcoal: '#1E1428',
                  midnight: '#0B080E',
                },
              },
            },
          }`}
        </Script>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
