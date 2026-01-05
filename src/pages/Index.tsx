import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pizza Dorata | Click & Collect à Fleury-les-Aubrais</title>
        <meta 
          name="description" 
          content="Commandez vos pizzas, burgers et tacos en ligne chez Pizza Dorata à Fleury-les-Aubrais. Click & Collect rapide et facile, sans attente !" 
        />
        <meta name="keywords" content="pizza, pizzeria, click and collect, fleury-les-aubrais, burger, tacos, livraison" />
        <link rel="canonical" href="https://pizzadorata.fr" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <MenuSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
