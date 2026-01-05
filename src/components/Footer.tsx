import React from 'react';
import { MapPin, Phone, Clock, Pizza, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Pizza+Dorata+150+Rue+Marcelin+Berthelot+45400+Fleury-les-Aubrais";

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
                <Pizza className="w-6 h-6 text-secondary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold">Pizza Dorata</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Pizzas artisanales, burgers, tacos et spécialités maison. 
              Commandez en ligne et récupérez sur place !
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-secondary">Nous contacter</h4>
            <div className="space-y-3">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>150 Rue Marcelin Berthelot<br />45400 Fleury-les-Aubrais</span>
              </a>
              <a 
                href="tel:0981140438" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>09 81 14 04 38</span>
              </a>
            </div>
            <Button 
              variant="gold" 
              size="sm" 
              className="mt-4"
              onClick={() => window.open(googleMapsUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Voir sur Google Maps
            </Button>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-secondary">Horaires d'ouverture</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p><span className="font-medium">Lundi - Jeudi :</span><br />11h30–14h / 18h–23h</p>
                  <p><span className="font-medium">Vendredi :</span><br />18h–23h</p>
                  <p><span className="font-medium">Samedi :</span><br />11h30–14h / 18h–23h</p>
                  <p><span className="font-medium">Dimanche :</span><br />18h–23h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Pizza Dorata - Tous droits réservés
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/40 hover:text-primary-foreground/60 text-xs"
            onClick={() => window.location.href = '/admin'}
          >
            Administration
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
