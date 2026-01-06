import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

// Créneaux horaires disponibles
const pickupSlots = [
  { value: '11:30', label: '11h30' },
  { value: '12:00', label: '12h00' },
  { value: '12:30', label: '12h30' },
  { value: '13:00', label: '13h00' },
  { value: '13:30', label: '13h30' },
  { value: '18:30', label: '18h30' },
  { value: '19:00', label: '19h00' },
  { value: '19:30', label: '19h30' },
  { value: '20:00', label: '20h00' },
  { value: '20:30', label: '20h30' },
  { value: '21:00', label: '21h00' },
  { value: '21:30', label: '21h30' },
];

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();
  const { addOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    pickupTime: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    if (!formData.pickupTime) {
      newErrors.pickupTime = "L'heure de retrait est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez remplir tous les champs correctement');
      return;
    }

    if (items.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order and send to database
      await addOrder({
        customerName: formData.firstName,
        customerPhone: formData.phone,
        pickupTime: formData.pickupTime,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size === 'senior' ? 'Sénior' : item.size === 'mega' ? 'Méga' : undefined,
        })),
        total,
      });

      setOrderConfirmed(true);
      clearCart();
      toast.success('Commande envoyée !');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <>
        <Helmet>
          <title>Commande confirmée | Pizza Dorata</title>
        </Helmet>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto animate-fade-in-up">
              <div className="w-20 h-20 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Commande confirmée !
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Votre commande a bien été enregistrée. 
                Merci de venir la récupérer à l'heure choisie au restaurant.
              </p>
              <div className="bg-card rounded-xl p-4 mb-6 border border-border">
                <p className="text-sm text-muted-foreground">Heure de retrait</p>
                <p className="font-semibold text-lg text-foreground">{formData.pickupTime}</p>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => {
                  setOrderConfirmed(false);
                  navigate('/');
                }}
              >
                Retour à l'accueil
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panier | Pizza Dorata</title>
        <meta name="description" content="Finalisez votre commande chez Pizza Dorata" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au menu
            </button>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Votre <span className="text-primary">Panier</span>
            </h1>

            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Votre panier est vide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ajoutez des produits depuis notre menu pour commencer votre commande
                </p>
                <Button variant="hero" onClick={() => navigate('/')}>
                  Voir le menu
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-card rounded-xl p-4 shadow-soft border border-border/50 flex items-center gap-4 animate-fade-in-up"
                    >
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {item.name}
                          {item.size && (
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                              ({item.size === 'senior' ? 'Sénior' : 'Méga'})
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="font-bold text-primary mt-1">
                          {item.price.toFixed(2).replace('.', ',')} €
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">
                          {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order summary & form */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl p-6 shadow-elevated border border-border/50 sticky top-24">
                    <h2 className="font-display text-xl font-bold text-foreground mb-4">
                      Récapitulatif
                    </h2>
                    
                    <div className="space-y-2 pb-4 border-b border-border">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{itemCount} article{itemCount > 1 ? 's' : ''}</span>
                        <span>{total.toFixed(2).replace('.', ',')} €</span>
                      </div>
                    </div>

                    <div className="flex justify-between py-4 border-b border-border">
                      <span className="font-display text-lg font-bold text-foreground">Total</span>
                      <span className="font-display text-2xl font-bold text-primary">
                        {total.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="firstName" className="text-foreground">
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Votre prénom"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-foreground">
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="06 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pickupTime" className="text-foreground">
                          Heure de retrait *
                        </Label>
                        <Select
                          value={formData.pickupTime}
                          onValueChange={(value) => setFormData({ ...formData, pickupTime: value })}
                        >
                          <SelectTrigger className={errors.pickupTime ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Choisir un créneau" />
                          </SelectTrigger>
                          <SelectContent>
                            {pickupSlots.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value}>
                                {slot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.pickupTime && (
                          <p className="text-sm text-destructive mt-1">{errors.pickupTime}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Validation...' : 'Valider la commande'}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Pas de paiement en ligne. Réglez sur place à la récupération.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
