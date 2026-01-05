import React, { useState } from 'react';
import { menuData, PIZZA_PRICES, MenuCategory, MenuItem } from '@/data/menu';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';

const PizzaSizeSelector: React.FC<{
  item: MenuItem;
  onAdd: (size: 'senior' | 'mega') => void;
}> = ({ item, onAdd }) => {
  const [selectedSize, setSelectedSize] = useState<'senior' | 'mega'>('senior');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAdd = () => {
    onAdd(selectedSize);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 1500);
  };

  return (
    <div className="mt-3 space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedSize('senior')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            selectedSize === 'senior'
              ? 'gradient-hero text-primary-foreground shadow-soft'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Sénior (31cm) - {PIZZA_PRICES.senior}€
        </button>
        <button
          onClick={() => setSelectedSize('mega')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            selectedSize === 'mega'
              ? 'gradient-hero text-primary-foreground shadow-soft'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Méga (40cm) - {PIZZA_PRICES.mega}€
        </button>
      </div>
      <Button 
        variant="cart" 
        size="sm" 
        className="w-full"
        onClick={handleAdd}
      >
        {showConfirm ? (
          <>
            <Check className="w-4 h-4" /> Ajouté !
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" /> Ajouter au panier
          </>
        )}
      </Button>
    </div>
  );
};

const ProductCard: React.FC<{
  item: MenuItem;
  hasSizes?: boolean;
}> = ({ item, hasSizes }) => {
  const { addItem } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddToCart = (size?: 'senior' | 'mega') => {
    const price = hasSizes && size ? PIZZA_PRICES[size] : item.price || 0;
    const itemId = size ? `${item.id}-${size}` : item.id;
    
    addItem({
      id: itemId,
      name: item.name,
      description: item.description,
      price,
      size,
      category: item.category,
    });

    toast.success(`${item.name} ajouté au panier`, {
      description: size ? `Taille ${size === 'senior' ? 'Sénior' : 'Méga'}` : undefined,
    });
  };

  const handleSimpleAdd = () => {
    handleAddToCart();
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 1500);
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 flex flex-col">
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h4 className="font-display text-lg font-semibold text-foreground">{item.name}</h4>
          {!hasSizes && item.price && (
            <span className="font-bold text-primary whitespace-nowrap">
              {item.price.toFixed(2).replace('.', ',')} €
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      </div>

      {hasSizes ? (
        <PizzaSizeSelector item={item} onAdd={handleAddToCart} />
      ) : (
        <Button 
          variant="cart" 
          size="sm" 
          className="w-full mt-4"
          onClick={handleSimpleAdd}
        >
          {showConfirm ? (
            <>
              <Check className="w-4 h-4" /> Ajouté !
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Ajouter au panier
            </>
          )}
        </Button>
      )}
    </div>
  );
};

const CategorySection: React.FC<{ category: MenuCategory }> = ({ category }) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
        {category.hasSizes && (
          <p className="text-sm text-secondary font-medium mt-2">
            Sénior (31 cm) : 17€ • Méga (40 cm) : 25€
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} hasSizes={category.hasSizes} />
        ))}
      </div>
    </div>
  );
};

const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? menuData.filter(cat => cat.id === activeCategory)
    : menuData;

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Notre <span className="text-primary">Menu</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes nos spécialités, préparées avec des ingrédients frais et de qualité
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? 'gradient-hero text-primary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Tout voir
          </button>
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'gradient-hero text-primary-foreground shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.name.replace('Pizzas Base ', '').replace('Les ', '')}
            </button>
          ))}
        </div>

        {/* Menu items */}
        {filteredCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
