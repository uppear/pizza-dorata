import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';

const Order: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Commander | Pizza Dorata - Click & Collect à Fleury-les-Aubrais</title>
        <meta 
          name="description" 
          content="Passez votre commande en ligne chez Pizza Dorata. Pizzas, burgers, tacos - Click & Collect rapide à Fleury-les-Aubrais." 
        />
        <link rel="canonical" href="https://pizzadorata.fr/commander" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-4">
          <MenuSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Order;
