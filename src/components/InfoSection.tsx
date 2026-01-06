import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const hours = [
  { days: 'Lundi - Jeudi', hours: '11h30–14h / 18h–23h' },
  { days: 'Vendredi', hours: '18h–23h' },
  { days: 'Samedi', hours: '11h30–14h / 18h–23h' },
  { days: 'Dimanche', hours: '18h–23h' },
];

const InfoSection: React.FC = () => {
  const googleMapsUrl = "https://www.google.com/maps/place/Pizza+dorata/@47.9299128,1.9158487,17z";

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nous <span className="text-primary">trouver</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Venez nous rendre visite ou commandez en ligne pour un retrait rapide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map / Location card */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50">
            <div className="aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.5!2d1.9158487!3d47.9299128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4fb0195b647b9%3A0xac6dd9ce11bd64c2!2sPizza%20dorata!5e0!3m2!1sfr!2sfr!4v1704500000000!5m2!1sfr!2sfr"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pizza Dorata - Google Maps"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    Notre adresse
                  </h3>
                  <p className="text-muted-foreground">
                    150 Rue Marcelin Berthelot<br />
                    45400 Fleury-les-Aubrais
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    Téléphone
                  </h3>
                  <a href="tel:0981140438" className="text-primary hover:underline font-medium">
                    09 81 14 04 38
                  </a>
                </div>
              </div>
              <Button 
                variant="gold" 
                className="w-full"
                onClick={() => window.open(googleMapsUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir dans Google Maps
              </Button>
            </div>
          </div>

          {/* Hours card */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-start gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="font-display text-2xl font-bold text-foreground">
                Horaires d'ouverture
              </h3>
            </div>
            
            <div className="space-y-4">
              {hours.map((schedule) => (
                <div 
                  key={schedule.days}
                  className="flex justify-between items-center py-3 border-b border-border/50 last:border-0"
                >
                  <span className="font-medium text-foreground">{schedule.days}</span>
                  <span className="text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </div>

            {/* Promo banner */}
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                🎉 Offres spéciales
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-secondary">À emporter :</span> 1 pizza achetée = 1 offerte
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-secondary">En livraison :</span> 2 pizzas achetées = 1 offerte
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
