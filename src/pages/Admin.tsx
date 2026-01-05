import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock, ShoppingBag, Clock, Phone, User, Check, Package, Euro, Users, TrendingUp, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const ADMIN_PIN = "1620";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    size?: string;
  }>;
  total: number;
  createdAt: string;
  status: 'pending' | 'ready' | 'completed';
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const previousOrderCountRef = useRef<number>(0);
  
  // Demo orders for display
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Jean Dupont',
      customerPhone: '06 12 34 56 78',
      pickupTime: '19:30',
      items: [
        { name: 'Royale', quantity: 2, price: 17, size: 'Sénior' },
        { name: 'Tiramisu Maison', quantity: 1, price: 3.5 }
      ],
      total: 37.5,
      createdAt: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: '2',
      customerName: 'Marie Martin',
      customerPhone: '06 98 76 54 32',
      pickupTime: '20:00',
      items: [
        { name: 'La Cannibale', quantity: 1, price: 25, size: 'Méga' },
        { name: 'Canette 33cl', quantity: 2, price: 1.5 }
      ],
      total: 28,
      createdAt: new Date().toISOString(),
      status: 'ready'
    },
    {
      id: '3',
      customerName: 'Pierre Durand',
      customerPhone: '06 45 67 89 01',
      pickupTime: '18:45',
      items: [
        { name: 'Big Burger', quantity: 2, price: 9 },
        { name: 'Tacos 1 Viande', quantity: 1, price: 8 },
        { name: 'Bouteille', quantity: 1, price: 3 }
      ],
      total: 29,
      createdAt: new Date().toISOString(),
      status: 'completed'
    }
  ]);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    previousOrderCountRef.current = orders.length;
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create a pleasant notification sound
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator1.frequency.setValueAtTime(880, ctx.currentTime); // A5
    oscillator2.frequency.setValueAtTime(1108.73, ctx.currentTime); // C#6
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator1.start(ctx.currentTime);
    oscillator2.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 0.5);
    oscillator2.stop(ctx.currentTime + 0.5);
  };

  // Simulate new order arrival (for demo)
  const simulateNewOrder = () => {
    const newOrder: Order = {
      id: String(orders.length + 1),
      customerName: 'Nouveau Client',
      customerPhone: '06 00 00 00 00',
      pickupTime: '21:00',
      items: [
        { name: 'Mexicaine', quantity: 1, price: 25, size: 'Méga' }
      ],
      total: 25,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    playNotificationSound();
    toast.success('🍕 Nouvelle commande reçue !', {
      description: `Commande de ${newOrder.customerName}`
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Code PIN incorrect');
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    const statusMessages = {
      ready: 'Commande marquée comme prête',
      completed: 'Commande marquée comme récupérée'
    };
    
    toast.success(statusMessages[newStatus] || 'Statut mis à jour');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En préparation';
      case 'ready': return 'Prête';
      case 'completed': return 'Récupérée';
      default: return status;
    }
  };

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalCustomers = orders.length;
  const averageBasket = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const readyOrders = orders.filter(o => o.status === 'ready').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 gradient-gold rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-secondary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Accès Administration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Code PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="text-center text-2xl tracking-widest"
                  maxLength={4}
                />
              </div>
              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}
              <Button type="submit" variant="gold" className="w-full">
                Accéder au dashboard
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au site
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">Dashboard Admin</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-secondary"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:text-secondary"
              onClick={() => setIsAuthenticated(false)}
            >
              Déconnexion
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au site
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Demo button */}
        <div className="mb-6">
          <Button onClick={simulateNewOrder} variant="outline" size="sm">
            🔔 Simuler une nouvelle commande
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center shrink-0">
                  <Euro className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-xl font-bold">{totalRevenue.toFixed(2)} €</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Clients</p>
                  <p className="text-xl font-bold">{totalCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Panier moyen</p>
                  <p className="text-xl font-bold">{averageBasket.toFixed(2)} €</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Commandes</p>
                  <p className="text-xl font-bold">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">En préparation</p>
                  <p className="text-xl font-bold">{pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prêtes</p>
                  <p className="text-xl font-bold">{readyOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders list */}
        <h2 className="font-display text-2xl font-bold mb-4">Commandes</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-muted-foreground text-sm">#{order.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{order.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Retrait à {order.pickupTime}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="font-medium mb-2">Articles :</p>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                              {item.size && ` (${item.size})`}
                            </span>
                            <span>{(item.price * item.quantity).toFixed(2)} €</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">{order.total.toFixed(2)} €</p>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Prête
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                        >
                          <Package className="w-4 h-4 mr-1" />
                          Récupérée
                        </Button>
                      )}
                      {order.status === 'completed' && (
                        <span className="text-sm text-muted-foreground italic">Terminée</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune commande pour le moment</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;
