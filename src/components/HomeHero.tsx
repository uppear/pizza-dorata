import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-background" />
      </div>

      {/* Decorative fire elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-float stagger-2" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold/20 rounded-full blur-2xl animate-float stagger-3" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <Flame className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground text-sm font-medium">Cuisson au feu de bois</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in-up stagger-1">
            Dorata{' '}
            <span className="text-secondary">Pizza</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 mb-4 animate-fade-in-up stagger-2 font-light">
            La passion du goût authentique
          </p>
          
          <p className="text-base sm:text-lg text-primary-foreground/70 mb-12 max-w-2xl mx-auto animate-fade-in-up stagger-3 leading-relaxed">
            Depuis notre pizzeria à Fleury-les-Aubrais, nous préparons chaque pizza avec amour, 
            des ingrédients frais et une pâte pétrie à la main. 
            Commandez en ligne et récupérez votre commande sans attendre !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-4">
            <Link to="/commander">
              <Button 
                variant="hero" 
                size="xl" 
                className="min-w-[220px] group"
              >
                Commander maintenant
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
