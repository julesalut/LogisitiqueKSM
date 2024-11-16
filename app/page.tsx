'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, X, MoreVertical, Edit, Trash2, BarChart } from 'lucide-react';

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState('shelf');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    reference: '',
    client: '',
    orderNumber: '',
    shelf: '',
    date: new Date().toISOString().split('T')[0],
    status: 'shelf'
  });

  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "Produit Test",
      reference: "REF123",
      client: "Client A",
      orderNumber: "CMD001",
      date: "2024-11-16",
      shelf: "A1",
      status: "shelf"
    }
  ]);

  const statusColors = {
    shipped: 'bg-gradient-to-r from-green-500 to-green-600',
    ordered: 'bg-gradient-to-r from-orange-400 to-orange-500',
    shelf: 'bg-gradient-to-r from-blue-400 to-blue-500'
  };

  const getStats = () => {
    const total = products.length;
    const onShelf = products.filter(p => p.status === 'shelf').length;
    const ordered = products.filter(p => p.status === 'ordered').length;
    const shipped = products.filter(p => p.status === 'shipped').length;

    return {
      total,
      onShelf,
      ordered,
      shipped,
      onShelfPercent: Math.round((onShelf / total) * 100) || 0,
      orderedPercent: Math.round((ordered / total) * 100) || 0,
      shippedPercent: Math.round((shipped / total) * 100) || 0
    };
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = `P${String(products.length + 1).padStart(3, '0')}`;
    setProducts([...products, { ...newProduct, id }]);
    setNewProduct({
      name: '',
      reference: '',
      client: '',
      orderNumber: '',
      shelf: '',
      date: new Date().toISOString().split('T')[0],
      status: 'shelf'
    });
    setShowAddForm(false);
  };

  const changeStatus = (productId, newStatus) => {
    setProducts(products.map(product => 
      product.id === productId ? {...product, status: newStatus} : product
    ));
    setShowActionMenu(null);
  };

  const ActionMenu = ({ product }) => (
    <div className="absolute right-2 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
      <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">
        Changer le statut
      </div>
      <button 
        onClick={() => changeStatus(product.id, 'shelf')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
      >
        <Package className="w-4 h-4" />
        Sur Étagère
      </button>
      <button 
        onClick={() => changeStatus(product.id, 'ordered')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        En Commande
      </button>
      <button 
        onClick={() => changeStatus(product.id, 'shipped')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
      >
        <Truck className="w-4 h-4" />
        Expédié
      </button>
    </div>
  );

  const StatsPanel = () => {
    const stats = getStats();
    return (
      <div className="rounded-xl bg-white shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Statistiques</h3>
          <span className="text-sm text-gray-500">{stats.total} produits au total</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Sur étagère</span>
              <span className="font-medium">{stats.onShelfPercent}% ({stats.onShelf})</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${stats.onShelfPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>En commande</span>
              <span className="font-medium">{stats.orderedPercent}% ({stats.ordered})</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${stats.orderedPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Expédié</span>
              <span className="font-medium">{stats.shippedPercent}% ({stats.shipped})</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${stats.shippedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${statusColors[product.status]} shadow-sm`}>
            {product.status === 'shipped' ? 'Expédié' : 
             product.status === 'ordered' ? 'En commande' : 'Sur étagère'}
          </span>
          <div className="relative">
            <button 
              onClick={() => setShowActionMenu(showActionMenu === product.id ? null : product.id)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
            {showActionMenu === product.id && <ActionMenu product={product} />}
          </div>
        </div>
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex justify-between">
            <span>Commande</span>
            <span className="font-medium text-gray-900">#{product.orderNumber}</span>
          </p>
          <p className="flex justify-between">
            <span>Client</span>
            <span className="font-medium text-gray-900">{product.client}</span>
          </p>
          <p className="flex justify-between">
            <span>Référence</span>
            <span className="font-medium text-gray-900">{product.reference}</span>
          </p>
          <p className="flex justify-between">
            <span>Étagère</span>
            <span className="font-medium text-gray-900">{product.shelf}</span>
          </p>
          <p className="flex justify-between">
            <span>Date</span>
            <span className="font-medium text-gray-900">{product.date}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const AddProductForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Nouveau Produit</h3>
          <button 
            onClick={() => setShowAddForm(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du produit</label>
              <input 
                type="text" 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ex: iPhone 15 Pro"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Référence</label>
              <input 
                type="text" 
                value={newProduct.reference}
                onChange={(e) => setNewProduct({...newProduct, reference: e.target.value})}
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                placeholder="ex: REF123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Client</label>
              <input 
                type="text"
                value={newProduct.client}
                onChange={(e) => setNewProduct({...newProduct, client: e.target.value})} 
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                placeholder="Nom du client"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Numéro de commande</label>
              <input 
                type="text"
                value={newProduct.orderNumber}
                onChange={(e) => setNewProduct({...newProduct, orderNumber: e.target.value})} 
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                placeholder="ex: CMD123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Étagère</label>
              <input 
                type="text"
                value={newProduct.shelf}
                onChange={(e) => setNewProduct({...newProduct, shelf: e.target.value})} 
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                placeholder="ex: A1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input 
                type="date"
                value={newProduct.date}
                onChange={(e) => setNewProduct({...newProduct, date: e.target.value})} 
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white rounded-xl py-3 font-medium hover:bg-blue-600 transition-colors"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header avec recherche */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {activeTab === 'shelf' ? 'Sur Étagère' : 
               activeTab === 'ordered' ? 'Commandes' : 'Expédié'}
            </h1>
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <BarChart className={`w-6 h-6 ${showStats ? 'text-blue-500' : 'text-gray-400'}`} />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit, client, référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-xl mx-auto px-4 pt-32 pb-6">
        {showStats && <StatsPanel />}
        <div className="space-y-4">
          {products
            .filter(product => {
              const matchesSearch = (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
              );
              return matchesSearch && (activeTab === product.status);
            })
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>

      {/* Bouton d'ajout fl​​​​​​​​​​​​​​​​
