export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  hasSizes?: boolean;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
  hasSizes?: boolean;
}

export const PIZZA_PRICES = {
  senior: 17,
  mega: 25,
};

export const menuData: MenuCategory[] = [
  {
    id: 'pizzas-tomate',
    name: 'Pizzas Base Sauce Tomate',
    description: 'Nos pizzas traditionnelles sur base tomate',
    hasSizes: true,
    items: [
      { id: 'margheritta', name: 'Margheritta', description: 'Mozzarella, olives', category: 'pizzas-tomate' },
      { id: 'royale', name: 'Royale', description: 'Mozzarella, jambon de dinde, champignons', category: 'pizzas-tomate' },
      { id: 'orientale', name: 'Orientale', description: 'Mozzarella, merguez, poivrons, olives', category: 'pizzas-tomate' },
      { id: 'montagnana', name: 'Montagnana', description: 'Mozzarella, merguez, pomme de terre, gorgonzola, olives', category: 'pizzas-tomate' },
      { id: 'mexicaine', name: 'Mexicaine', description: 'Mozzarella, viande hachée, merguez, poivrons, olives', category: 'pizzas-tomate' },
      { id: 'buffalo', name: 'Buffalo', description: 'Mozzarella, viande hachée, chorizo, poivrons, oignons', category: 'pizzas-tomate' },
      { id: 'andalouse', name: "L'Andalouse", description: 'Mozzarella, chorizo, oignons, poivrons, olives', category: 'pizzas-tomate' },
      { id: 'bolognaise', name: 'Bolognaise', description: 'Mozzarella, viande hachée, poivrons, oignons, œuf', category: 'pizzas-tomate' },
      { id: 'atomique', name: 'Atomique', description: 'Mozzarella, harissa, merguez, kebab, oignons, olives', category: 'pizzas-tomate' },
      { id: 'kebab', name: 'Kebab', description: 'Mozzarella, kebab, poivrons, olives', category: 'pizzas-tomate' },
      { id: 'calzone', name: 'Calzone', description: 'Mozzarella, jambon, œuf', category: 'pizzas-tomate' },
      { id: 'provencale', name: 'Provençale', description: 'Mozzarella, thon, oignons, tomates fraîches, olives', category: 'pizzas-tomate' },
      { id: 'chicken-chikka', name: 'Chicken Chikka', description: 'Mozzarella, chicken chikka, poivrons, pomme de terre, oignons, olives', category: 'pizzas-tomate' },
      { id: '4-fromages', name: '4 Fromages', description: 'Mozzarella, chèvre, gorgonzola, parmesan', category: 'pizzas-tomate' },
      { id: 'vegetarienne', name: 'La Végétarienne', description: 'Mozzarella, tomates fraîches, oignons, champignons, poivrons, artichauts, olives', category: 'pizzas-tomate' },
    ],
  },
  {
    id: 'pizzas-creme',
    name: 'Pizzas Base Crème Fraîche',
    description: 'Nos pizzas onctueuses sur base crème',
    hasSizes: true,
    items: [
      { id: 'campagnarde', name: 'Campagnarde', description: 'Viande hachée, pomme de terre, chèvre, olives', category: 'pizzas-creme' },
      { id: 'boursin', name: 'Boursin', description: 'Viande hachée, pomme de terre, boursin, olives', category: 'pizzas-creme' },
      { id: 'savoyarde', name: 'Savoyarde', description: 'Lardons, pomme de terre, oignons, reblochon', category: 'pizzas-creme' },
      { id: 'raclette', name: 'Raclette', description: 'Lardons, pomme de terre, fromage à raclette', category: 'pizzas-creme' },
      { id: 'paysanne', name: 'Paysanne', description: 'Lardons, champignons, oignons, œuf', category: 'pizzas-creme' },
      { id: 'delicieuse', name: 'Délicieuse', description: 'Viande hachée, chicken chikka, poivrons, pomme de terre, olives', category: 'pizzas-creme' },
      { id: 'country-plus', name: 'Country Plus', description: 'Viande hachée, poulet rôti, pomme de terre, olives', category: 'pizzas-creme' },
      { id: 'fermiere', name: 'Fermière', description: 'Poulet rôti, pomme de terre, champignons, olives', category: 'pizzas-creme' },
      { id: 'chevre-miel', name: 'Chèvre Miel', description: 'Chèvre, miel', category: 'pizzas-creme' },
      { id: 'fatoria', name: 'Fatoria', description: 'Jambon de dinde, champignons, chèvre', category: 'pizzas-creme' },
      { id: 'saumon', name: 'Saumon', description: 'Saumon, pomme de terre', category: 'pizzas-creme' },
    ],
  },
  {
    id: 'pizzas-chef',
    name: 'Les Pizzas du Chef',
    description: 'Les créations originales du chef',
    hasSizes: true,
    items: [
      { id: 'cannibale', name: 'La Cannibale', description: 'Sauce barbecue, viande hachée, chorizo, merguez', category: 'pizzas-chef' },
      { id: 'forza', name: 'La Forza', description: 'Sauce rose, kebab, poivrons, oignons, chèvre', category: 'pizzas-chef' },
      { id: 'boisee', name: 'La Boisée', description: 'Sauce fromagère, poulet, champignons, olives', category: 'pizzas-chef' },
      { id: 'dijonnaise', name: 'La Dijonnaise', description: 'Crème de moutarde, chicken chikka, jambon de dinde, champignons, olives', category: 'pizzas-chef' },
    ],
  },
  {
    id: 'tenders-nuggets',
    name: 'Tenders & Nuggets',
    description: 'Nos menus croustillants',
    items: [
      { id: 'menu-tenders', name: 'Menu Tenders x4', description: '4 tenders de poulet avec frites et sauce', price: 7.50, category: 'tenders-nuggets' },
      { id: 'menu-nuggets', name: 'Menu Nuggets x8', description: '8 nuggets de poulet avec frites et sauce', price: 7.50, category: 'tenders-nuggets' },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers',
    description: 'Nos burgers généreux',
    items: [
      { id: 'big-burger', name: 'Big Burger', description: 'Notre burger signature avec steak, cheddar, salade, tomate et sauce maison', price: 9, category: 'burgers' },
      { id: 'classic-burger', name: 'Classic Burger', description: 'Burger classique avec steak, salade, tomate et sauce', price: 6, category: 'burgers' },
    ],
  },
  {
    id: 'specialites',
    name: 'Spécialités Doratos & Sandwichs',
    description: 'Nos spécialités maison',
    items: [
      { id: 'doratos', name: 'Le Doratos', description: 'Notre spécialité maison signature', price: 10, category: 'specialites' },
      { id: 'sandwich-crispy', name: 'Sandwich Crispy', description: 'Poulet crispy, salade, tomate, sauce', price: 8, category: 'specialites' },
      { id: 'sandwich-chicken', name: 'Sandwich Chicken', description: 'Poulet grillé, salade, tomate, sauce', price: 8, category: 'specialites' },
    ],
  },
  {
    id: 'tacos',
    name: 'Tacos',
    description: 'Nos tacos généreux',
    items: [
      { id: 'tacos-1-viande', name: 'Tacos 1 Viande', description: 'Tacos avec 1 viande au choix, frites, sauce fromagère', price: 8, category: 'tacos' },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Pour finir en douceur',
    items: [
      { id: 'tiramisu', name: 'Tiramisu Maison', description: 'Notre tiramisu fait maison', price: 3.50, category: 'desserts' },
      { id: 'tarte-daim', name: 'Tarte au Daim', description: 'Tarte au chocolat et daim', price: 3, category: 'desserts' },
    ],
  },
  {
    id: 'boissons',
    name: 'Boissons',
    description: 'Pour accompagner votre repas',
    items: [
      { id: 'canette', name: 'Canette 33cl', description: 'Coca-Cola, Fanta, Sprite, Ice Tea', price: 1.50, category: 'boissons' },
      { id: 'bouteille', name: 'Bouteille', description: 'Bouteille 1.5L au choix', price: 3, category: 'boissons' },
    ],
  },
];
