import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import Chatbot from '../components/chatbot/Chatbot';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default MainLayout;