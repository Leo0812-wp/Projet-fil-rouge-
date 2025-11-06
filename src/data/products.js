export const products = [
  // Cafés
  { id: 1, name: 'Espresso', category: 'café', price: 2.50, image: '/cafe-espresso.avif', description: 'Café italien classique et intense', sku: 'CAF001' },
  { id: 2, name: 'Cappuccino', category: 'café', price: 3.50, image: '/cafe-cappucino.avif', description: 'Espresso avec mousse de lait crémeuse', sku: 'CAF002' },
  { id: 3, name: 'Latte', category: 'café', price: 3.80, image: '/cafe-espresso.avif', description: 'Café au lait doux et crémeux', sku: 'CAF003' },
  { id: 4, name: 'Americano', category: 'café', price: 3.00, image: '/cafe-americano.avif', description: 'Espresso allongé à l\'eau chaude', sku: 'CAF004' },
  { id: 5, name: 'Macchiato', category: 'café', price: 3.20, image: '/cafe-macciato.avif', description: 'Espresso tacheté de mousse de lait', sku: 'CAF005' },
  { id: 6, name: 'Mocha', category: 'café', price: 4.20, image: '/cafe-mocha.avif', description: 'Café au chocolat et lait', sku: 'CAF006' },
  
  // Viennoiseries (avec SKU BEB pour TVA réduite)
  { id: 7, name: 'Croissant', category: 'viennoiseries', price: 1.80, image: '/vienoiseries.avif', description: 'Croissant beurre artisanal', sku: 'BEB001' },
  { id: 8, name: 'Pain au chocolat', category: 'viennoiseries', price: 2.00, image: '/vienoiseries.avif', description: 'Viennoiserie au chocolat', sku: 'BEB002' },
  { id: 9, name: 'Chausson aux pommes', category: 'viennoiseries', price: 2.20, image: '/vienoiseries.avif', description: 'Chausson aux pommes maison', sku: 'BEB003' },
  { id: 10, name: 'Brioche', category: 'viennoiseries', price: 2.50, image: '/vienoiseries.avif', description: 'Brioche moelleuse et dorée', sku: 'BEB004' },
  { id: 11, name: 'Pain aux raisins', category: 'viennoiseries', price: 2.30, image: '/vienoiseries.avif', description: 'Viennoiserie aux raisins secs', sku: 'BEB005' },
  
  // Sucreries
  { id: 12, name: 'Macaron assorti', category: 'sucreries', price: 3.50, image: '/sucreries.avif', description: 'Assortiment de 4 macarons', sku: 'SUC001' },
  { id: 13, name: 'Éclair au chocolat', category: 'sucreries', price: 3.80, image: '/sucreries.avif', description: 'Éclair au chocolat maison', sku: 'SUC002' },
  { id: 14, name: 'Tartelette citron', category: 'sucreries', price: 4.00, image: '/sucreries.avif', description: 'Tartelette au citron meringuée', sku: 'SUC003' },
  { id: 15, name: 'Millefeuille', category: 'sucreries', price: 4.50, image: '/sucreries.avif', description: 'Millefeuille traditionnel', sku: 'SUC004' },
  { id: 16, name: 'Religieuse au café', category: 'sucreries', price: 3.90, image: '/sucreries.avif', description: 'Religieuse au café', sku: 'SUC005' },
  
  // Desserts
  { id: 17, name: 'Tiramisu', category: 'desserts', price: 5.50, image: '/gateaux.avif', description: 'Tiramisu traditionnel italien', sku: 'DES001' },
  { id: 18, name: 'Cheesecake', category: 'desserts', price: 5.00, image: '/gateaux.avif', description: 'Cheesecake aux fruits rouges', sku: 'DES002' },
  { id: 19, name: 'Tarte aux pommes', category: 'desserts', price: 4.80, image: '/gateaux.avif', description: 'Tarte aux pommes maison', sku: 'DES003' },
  { id: 20, name: 'Brownie', category: 'desserts', price: 4.20, image: '/gateaux.avif', description: 'Brownie au chocolat', sku: 'DES004' },
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
};

