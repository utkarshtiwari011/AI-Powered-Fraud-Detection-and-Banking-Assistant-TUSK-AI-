
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-tusk-navy">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Added pt-16 for fixed navbar */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
