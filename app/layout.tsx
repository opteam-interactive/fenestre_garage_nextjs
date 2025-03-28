import "./globals.css";
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body className="bg-[url(@/public/images/background.png)] bg-cover font-poppins relative min-h-screen">
      <main>
        {children}
      </main>
      <Footer/>
      
      </body>
  
    </html>
  );
}
