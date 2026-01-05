import React from 'react';
import { ShoppingCart, Pizza, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToMenu = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const menuSection = document.getElementById('menu');
        menuSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const menuSection = document.getElementById('menu');
      menuSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 gradient-hero rounded-full flex items-center justify-center">
            <Pizza className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-primary">Pizza Dorata</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Fleury-les-Aubrais</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => navigate('/')} 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Accueil
          </button>
          <button 
            onClick={scrollToMenu} 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Menu
          </button>
          <a 
            href="tel:0981140438" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">09 81 14 04 38</span>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            variant="hero" 
            size="sm"
            onClick={scrollToMenu}
            className="hidden sm:flex"
          >
            Commander
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/panier')}
            className="relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 gradient-hero text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold animate-scale-in">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
