import React from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    alt: 'Pizza margherita au feu de bois',
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    alt: 'Pizza aux légumes frais',
  },
  {
    url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80',
    alt: 'Burger gourmet fait maison',
  },
  {
    url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    alt: 'Pizza pepperoni croustillante',
  },
  {
    url: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=600&q=80',
    alt: 'Tacos mexicain',
  },
  {
    url: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=600&q=80',
    alt: 'Préparation artisanale',
  },
];

const GallerySection: React.FC = () => {
  return (
    <section className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Nos <span className="text-secondary">créations</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Un aperçu de nos délicieuses spécialités préparées avec passion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-primary-foreground text-sm font-medium">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
