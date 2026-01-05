import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float stagger-2" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Pizza{' '}
            <span className="text-secondary">Dorata</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-4 animate-fade-in-up stagger-1">
            Commandez en ligne et récupérez sur place
          </p>
          
          <p className="text-base sm:text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2 leading-relaxed">
            Pizza Dorata vous propose un large choix de pizzas, burgers, tacos et spécialités maison.
            Commandez en quelques clics et venez récupérer votre commande à l'heure choisie, 
            sans attendre et sans appeler.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToMenu}
              className="min-w-[200px]"
            >
              Commander en ligne
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToMenu}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Voir le menu
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToMenu}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
