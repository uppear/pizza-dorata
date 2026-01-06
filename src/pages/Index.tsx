import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HomeHero from '@/components/HomeHero';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pizza Dorata | Pizzeria à Fleury-les-Aubrais - Click & Collect</title>
        <meta 
          name="description" 
          content="Dorata Pizza, votre pizzeria artisanale à Fleury-les-Aubrais. Pizzas au feu de bois, burgers, tacos. Commandez en ligne et récupérez sur place !" 
        />
        <meta name="keywords" content="pizza, pizzeria, fleury-les-aubrais, burger, tacos, click and collect, feu de bois, artisanal" />
        <link rel="canonical" href="https://pizzadorata.fr" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HomeHero />
          <AboutSection />
          <GallerySection />
          <InfoSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
