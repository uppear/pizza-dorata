import React from 'react';
import { Heart, Flame, Leaf, Award } from 'lucide-react';

const values = [
  {
    icon: Flame,
    title: 'Cuisson artisanale',
    description: 'Nos pizzas sont cuites au feu de bois pour une croûte croustillante et un goût authentique.',
  },
  {
    icon: Leaf,
    title: 'Ingrédients frais',
    description: 'Nous sélectionnons des produits de qualité, frais et locaux pour chaque préparation.',
  },
  {
    icon: Heart,
    title: 'Fait maison',
    description: 'Notre pâte est pétrie chaque jour, nos sauces préparées maison avec des recettes traditionnelles.',
  },
  {
    icon: Award,
    title: 'Savoir-faire',
    description: 'Une équipe passionnée qui met tout son cœur pour vous offrir le meilleur.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Bienvenue chez{' '}
            <span className="text-primary">Dorata Pizza</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Située au cœur de Fleury-les-Aubrais, notre pizzeria vous accueille dans une ambiance 
            chaleureuse et conviviale. Chez Dorata Pizza, nous croyons que chaque pizza raconte une histoire : 
            celle de la passion, du respect des traditions italiennes et de l'amour des bons produits.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            En plus de nos pizzas signatures, découvrez également nos délicieux burgers, tacos, 
            sandwichs et nos spécialités maison. De quoi régaler toute la famille !
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
