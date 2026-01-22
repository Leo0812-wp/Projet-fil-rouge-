import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Check,
  Coffee,
  Minus,
  Plus,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import { useCart } from '../Context/CartContext';

const BookingScreen = () => {
  const navigate = useNavigate();
  const { addReservation, addToCart: addProductToCart } = useCart();
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
  });
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const tables = [
    { id: 1, x: 200, y: 160, seats: 2, status: 'available', type: 'round' },
    { id: 2, x: 360, y: 160, seats: 2, status: 'available', type: 'round' },
    { id: 3, x: 520, y: 160, seats: 4, status: 'reserved', type: 'square' },
    { id: 4, x: 200, y: 310, seats: 2, status: 'available', type: 'round' },
    { id: 5, x: 350, y: 310, seats: 4, status: 'available', type: 'square' },
    { id: 6, x: 520, y: 310, seats: 2, status: 'available', type: 'round' },
    { id: 7, x: 260, y: 470, seats: 6, status: 'available', type: 'rectangle' },
    { id: 8, x: 460, y: 465, seats: 4, status: 'available', type: 'square' },
  ];

  const products = [
    { id: 1, name: 'Espresso', price: 2.5, category: 'Café', icon: '' },
    { id: 2, name: 'Cappuccino', price: 3.8, category: 'Café', icon: '' },
    { id: 3, name: 'Latte', price: 4.2, category: 'Café', icon: '' },
    { id: 4, name: 'Thé vert', price: 3.0, category: 'Thé', icon: '' },
    { id: 5, name: 'Croissant', price: 2.2, category: 'Viennoiserie', icon: '' },
    { id: 6, name: 'Pain au chocolat', price: 2.5, category: 'Viennoiserie', icon: '' },
    { id: 7, name: 'Muffin', price: 3.5, category: 'Viennoiserie', icon: '' },
  ];

  const minDate = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const totalPrice = useMemo(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total.toFixed(2);
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((acc, it) => acc + it.quantity, 0), [cart]);

  const canValidate =
    !!selectedTable && !!reservationData.date && !!reservationData.time && cart.length > 0;

  const handleValidation = () => {
    if (canValidate) setShowConfirmation(true);
  };

  const resetReservation = () => {
    setSelectedTable(null);
    setReservationData({ date: '', time: '', guests: 2 });
    setCart([]);
    setShowConfirmation(false);
    
    // Ajouter la réservation et les produits au panier global
    addReservation({
      table: selectedTable,
      date: reservationData.date,
      time: reservationData.time,
      guests: reservationData.guests,
      products: cart,
      totalPrice: totalPrice,
    });
    
    // Ajouter chaque produit au panier du contexte
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addProductToCart(item);
      }
    });
    
    // Rediriger vers le panier
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Plan de la salle */}
          <div className="col-span-2">
            <div className="rounded-2xl border-2 border-amber-100 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-900">Plan de la salle</h2>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-emerald-500" />
                    <span className="text-gray-600">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gray-400" />
                    <span className="text-gray-600">Réservée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-amber-500" />
                    <span className="text-gray-600">Sélectionnée</span>
                  </div>
                </div>
              </div>

              {/* Vue 2D */}
              <div
                className="relative overflow-hidden rounded-xl border-2 border-amber-200 bg-gradient-to-br from-stone-100 via-amber-50 to-orange-50"
                style={{ height: '560px' }}
              >
                {/* Texture bois */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 2px, transparent 2px, transparent 40px)',
                  }}
                />

                {/* Comptoir */}
                <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-amber-900 to-amber-800 shadow-2xl">
                  <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-amber-700 to-transparent" />
                  <div className="flex h-full items-center justify-center">
                    <Coffee className="mr-3 h-6 w-6 text-amber-200" />
                    <span className="text-lg font-bold tracking-wider text-white">
                      BAR &amp; COMPTOIR
                    </span>
                    <Coffee className="ml-3 h-6 w-6 text-amber-200" />
                  </div>
                  <div className="absolute left-8 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-amber-600" />
                  <div className="absolute right-8 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-amber-600" />
                </div>

                {/* Fenêtres */}
                <div className="absolute left-4 top-32 h-24 w-16 rounded-sm border-4 border-amber-900 bg-gradient-to-br from-blue-200 to-blue-100 shadow-lg opacity-40">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="border-r-2 border-amber-800" />
                    <div />
                  </div>
                  <div className="absolute inset-0 grid grid-rows-2">
                    <div className="border-b-2 border-amber-800" />
                    <div />
                  </div>
                </div>
                <div className="absolute right-4 top-32 h-24 w-16 rounded-sm border-4 border-amber-900 bg-gradient-to-br from-blue-200 to-blue-100 shadow-lg opacity-40">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="border-r-2 border-amber-800" />
                    <div />
                  </div>
                  <div className="absolute inset-0 grid grid-rows-2">
                    <div className="border-b-2 border-amber-800" />
                    <div />
                  </div>
                </div>

                {/* Plantes */}
                <div className="absolute bottom-12 left-12 h-16 w-12 rounded-t-full bg-emerald-600 opacity-30" />
                <div className="absolute bottom-12 right-12 h-16 w-12 rounded-t-full bg-emerald-600 opacity-30" />

                {/* Tables */}
                {tables.map((table) => {
                  const isSelected = selectedTable?.id === table.id;
                  const isReserved = table.status === 'reserved';

                  return (
                    <div
                      key={table.id}
                      onClick={() => !isReserved && setSelectedTable(table)}
                      className={[
                        'absolute transition-all duration-300',
                        isReserved ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105',
                      ].join(' ')}
                      style={{
                        left: `${table.x}px`,
                        top: `${table.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      role={!isReserved ? 'button' : undefined}
                      aria-disabled={isReserved}
                      tabIndex={!isReserved ? 0 : -1}
                      onKeyDown={(e) => {
                        if (isReserved) return;
                        if (e.key === 'Enter' || e.key === ' ') setSelectedTable(table);
                      }}
                    >
                      {/* Table ronde */}
                      {table.type === 'round' && (
                        <div className="relative">
                          <div className="absolute inset-0 translate-y-2 rounded-full bg-black opacity-10 blur-md" />

                          <div
                            className={[
                              'relative h-28 w-28 rounded-full border-4 transition-all duration-300',
                              isSelected
                                ? 'border-amber-200 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl ring-4 ring-amber-300'
                                : isReserved
                                ? 'border-gray-400 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
                                : 'border-amber-950 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 hover:shadow-xl',
                            ].join(' ')}
                          >
                            <div
                              className="absolute inset-0 rounded-full opacity-20"
                              style={{
                                backgroundImage:
                                  'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                backgroundSize: '4px 4px',
                              }}
                            />

                            <div
                              className={[
                                'absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full',
                                isSelected
                                  ? 'bg-amber-700'
                                  : isReserved
                                  ? 'bg-gray-600'
                                  : 'bg-amber-950',
                              ].join(' ')}
                            />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <div className="text-2xl font-bold">{table.id}</div>
                              <div className="mt-1 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs">
                                <Users className="h-3 w-3" />
                                <span>{table.seats}</span>
                              </div>
                            </div>

                            {[...Array(table.seats)].map((_, i) => {
                              const angle = (i * 360) / table.seats;
                              const x = Math.cos((angle * Math.PI) / 180) * 52;
                              const y = Math.sin((angle * Math.PI) / 180) * 52;

                              return (
                                <div
                                  key={i}
                                  className={[
                                    'absolute h-8 w-6 rounded-md shadow-md',
                                    isSelected
                                      ? 'bg-amber-600'
                                      : isReserved
                                      ? 'bg-gray-500'
                                      : 'bg-amber-800',
                                  ].join(' ')}
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`,
                                  }}
                                >
                                  <div
                                    className={[
                                      'h-2 w-full rounded-t-md',
                                      isSelected
                                        ? 'bg-amber-500'
                                        : isReserved
                                        ? 'bg-gray-400'
                                        : 'bg-amber-700',
                                    ].join(' ')}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Table carrée */}
                      {table.type === 'square' && (
                        <div className="relative">
                          <div className="absolute inset-0 translate-y-2 rounded-lg bg-black opacity-10 blur-md" />

                          <div
                            className={[
                              'relative h-32 w-32 rounded-lg border-4 transition-all duration-300',
                              isSelected
                                ? 'border-amber-200 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl ring-4 ring-amber-300'
                                : isReserved
                                ? 'border-gray-400 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
                                : 'border-amber-950 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 hover:shadow-xl',
                            ].join(' ')}
                          >
                            <div
                              className="absolute inset-0 rounded-lg opacity-20"
                              style={{
                                backgroundImage:
                                  'linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                backgroundSize: '8px 8px',
                              }}
                            />

                            <div
                              className={[
                                'absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded',
                                isSelected
                                  ? 'bg-amber-700'
                                  : isReserved
                                  ? 'bg-gray-600'
                                  : 'bg-amber-950',
                              ].join(' ')}
                            />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <div className="text-2xl font-bold">{table.id}</div>
                              <div className="mt-1 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs">
                                <Users className="h-3 w-3" />
                                <span>{table.seats}</span>
                              </div>
                            </div>

                            {[...Array(table.seats)].map((_, i) => {
                              const positions = [
                                { x: -40, y: 0, rotate: -90 },
                                { x: 40, y: 0, rotate: 90 },
                                { x: 0, y: -40, rotate: 0 },
                                { x: 0, y: 40, rotate: 180 },
                              ];
                              const pos = positions[i];
                              if (!pos) return null;

                              return (
                                <div
                                  key={i}
                                  className={[
                                    'absolute h-8 w-6 rounded-md shadow-md',
                                    isSelected
                                      ? 'bg-amber-600'
                                      : isReserved
                                      ? 'bg-gray-500'
                                      : 'bg-amber-800',
                                  ].join(' ')}
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                                  }}
                                >
                                  <div
                                    className={[
                                      'h-2 w-full rounded-t-md',
                                      isSelected
                                        ? 'bg-amber-500'
                                        : isReserved
                                        ? 'bg-gray-400'
                                        : 'bg-amber-700',
                                    ].join(' ')}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Table rectangulaire */}
                      {table.type === 'rectangle' && (
                        <div className="relative">
                          <div className="absolute inset-0 translate-y-2 rounded-lg bg-black opacity-10 blur-md" />

                          <div
                            className={[
                              'relative h-28 w-40 rounded-lg border-4 transition-all duration-300',
                              isSelected
                                ? 'border-amber-200 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl ring-4 ring-amber-300'
                                : isReserved
                                ? 'border-gray-400 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
                                : 'border-amber-950 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 hover:shadow-xl',
                            ].join(' ')}
                          >
                            <div
                              className="absolute inset-0 rounded-lg opacity-20"
                              style={{
                                backgroundImage:
                                  'linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                backgroundSize: '12px 12px',
                              }}
                            />

                            <div
                              className={[
                                'absolute left-1/2 top-1/2 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded',
                                isSelected
                                  ? 'bg-amber-700'
                                  : isReserved
                                  ? 'bg-gray-600'
                                  : 'bg-amber-950',
                              ].join(' ')}
                            />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <div className="text-2xl font-bold">{table.id}</div>
                              <div className="mt-1 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs">
                                <Users className="h-3 w-3" />
                                <span>{table.seats}</span>
                              </div>
                            </div>

                            {[...Array(table.seats)].map((_, i) => {
                              const positions = [
                                { x: -55, y: -20, rotate: -90 },
                                { x: -55, y: 20, rotate: -90 },
                                { x: 55, y: -20, rotate: 90 },
                                { x: 55, y: 20, rotate: 90 },
                                { x: -20, y: -40, rotate: 0 },
                                { x: 20, y: -40, rotate: 0 },
                              ];
                              const pos = positions[i];
                              if (!pos) return null;

                              return (
                                <div
                                  key={i}
                                  className={[
                                    'absolute h-8 w-6 rounded-md shadow-md',
                                    isSelected
                                      ? 'bg-amber-600'
                                      : isReserved
                                      ? 'bg-gray-500'
                                      : 'bg-amber-800',
                                  ].join(' ')}
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                                  }}
                                >
                                  <div
                                    className={[
                                      'h-2 w-full rounded-t-md',
                                      isSelected
                                        ? 'bg-amber-500'
                                        : isReserved
                                        ? 'bg-gray-400'
                                        : 'bg-amber-700',
                                    ].join(' ')}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Badge réservée */}
                      {isReserved && (
                        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                          Réservée
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panneau réservation + commande */}
          <div className="col-span-1 space-y-6">
            {/* Réservation */}
            <div className="rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-xl">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-900">
                <Calendar className="h-5 w-5" />
                Réservation
              </h3>

              {selectedTable ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-gray-600">Table sélectionnée</p>
                    <p className="text-2xl font-bold text-amber-900">Table {selectedTable.id}</p>
                    <p className="text-sm text-gray-600">{selectedTable.seats} personnes</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={reservationData.date}
                      onChange={(e) =>
                        setReservationData((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="w-full rounded-lg border-2 border-amber-200 px-4 py-2 focus:border-amber-500 focus:outline-none"
                      min={minDate}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Heure</label>
                    <select
                      value={reservationData.time}
                      onChange={(e) =>
                        setReservationData((prev) => ({ ...prev, time: e.target.value }))
                      }
                      className="w-full rounded-lg border-2 border-amber-200 px-4 py-2 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Choisir une heure</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-gray-500">Sélectionnez une table sur le plan</p>
              )}
            </div>

            {/* Produits */}
            {selectedTable && (
              <div className="rounded-2xl border-2 border-amber-100 bg-white p-6 shadow-xl">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-900">
                  <Coffee className="h-5 w-5" />
                  Votre commande
                </h3>

                <p className="mb-4 text-sm font-medium text-red-600">
                  * Commande obligatoire pour réserver
                </p>

                <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 p-3 transition-colors hover:bg-amber-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm font-bold text-amber-700">
                            {product.price.toFixed(2)}€
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="rounded-lg bg-amber-600 p-2 text-white transition-colors hover:bg-amber-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Panier */}
                {cart.length > 0 && (
                  <div className="border-t-2 border-amber-200 pt-4">
                    <h4 className="mb-3 font-bold text-gray-800">Panier</h4>
                    <div className="mb-4 space-y-2">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded border border-gray-200 bg-white p-2"
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-600"
                              aria-label={`Diminuer ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => addToCart(item)}
                              className="text-gray-500 hover:text-emerald-600"
                              aria-label={`Augmenter ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <span className="w-16 text-right text-sm font-bold text-amber-700">
                              {(item.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-amber-900 p-4 text-white">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold">{totalPrice}€</span>
                    </div>
                  </div>
                )}

                {/* Validation */}
                <button
                  type="button"
                  onClick={handleValidation}
                  disabled={!canValidate}
                  className={[
                    'mt-6 w-full rounded-lg py-4 text-lg font-bold transition-all',
                    canValidate
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl'
                      : 'cursor-not-allowed bg-gray-300 text-gray-500',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" />
                    Commander et réserver
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal confirmation */}
      {showConfirmation && selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Réservation confirmée !
              </h3>
              <p className="text-gray-600">Votre table est réservée</p>
            </div>

            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Table</span>
                  <span className="font-bold text-amber-900">Table {selectedTable.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-bold">{reservationData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heure</span>
                  <span className="font-bold">{reservationData.time}</span>
                </div>

                <div className="mt-3 border-t border-amber-200 pt-3">
                  <p className="mb-2 font-semibold">Commande :</p>
                  {cart.map((item) => (
                    <div key={item.id} className="mb-1 flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-t border-amber-200 pt-3 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-700">{totalPrice}€</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetReservation}
              className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 py-3 font-bold text-white transition-all hover:from-amber-700 hover:to-amber-800"
            >
              Nouvelle réservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;

