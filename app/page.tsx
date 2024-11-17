'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, X, RotateCcw, ChevronRight } from 'lucide-react';

type ProductStatus = 'shelf' | 'ordered' | 'shipped' | 'restocked';

interface Product {
  id: string;
  reference: string;
  client: string;
  orderNumber: string;
  shelf: string;
  date: string;
  shippedDate?: string;
  restockDate?: string;
  status: ProductStatus;
}

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState<ProductStatus>('shelf');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: "P001",
      reference: "REF123",
      client: "Client A",
      orderNumber: "CMD001",
      date: "2024-11-16",
      shelf: "A1",
      status: "shelf",
    }
  ]);

  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case 'shipped': return 'bg-gradient-to-br from-green-400 to-green-600';
      case 'ordered': return 'bg-gradient-to-br from-orange-400 to-orange-600';
      case 'shelf': return 'bg-gradient-to-br from-yellow-300 to-yellow-500';
      case 'restocked': return 'bg-gradient-to-br from-pink-400 to-pink-600';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const getStatusText = (status: ProductStatus) => {
    switch (status) {
      case 'shipped': return 'Expédié';
      case 'ordered': return 'En commande';
      case 'shelf': return 'Sur étagère';
      case 'restocked': return 'Remise en stock';
      default: return status;
    }
  };

  const getNavButtonClass = (isActive: boolean, color: string) => `
    flex flex-col items-center justify-center p-4
    rounded-xl transition-all duration-300 ease-in-out
    hover:bg-gray-100 active:scale-95
    w-full mx-2
    ${isActive ? `text-${color}-500 bg-${color}-50 shadow-sm` : 'text-gray-400'}
  `;

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Simuler un délai pour l'effet de chargement
    setTimeout(() => {
      const newProduct = {
        id: `P${String(products.length + 1).padStart(3, '0')}`,
        reference: formData.get('reference')?.toString() || '',
        client: formData.get('client')?.toString() || '',
        orderNumber: formData.get('orderNumber')?.toString() || '',
        shelf: formData.get('shelf')?.toString() || '',
        date: formData.get('date')?.toString() || new Date().toISOString().split('T')[0],
        status: 'shelf' as const
      };
      setProducts(prev => [...prev, newProduct]);
      setShowAddForm(false);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="w-full px-6 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {getStatusText(activeTab)}
            </h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par référence, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-2xl py-4 px-6 pl-12 text-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="w-full px-6 pt-36 pb-32">
        <div className="space-y-6">
          {products
            .filter(product => {
              const matchesSearch = (
                product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
              );
              return matchesSearch && (activeTab === product.status);
            })
            .map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden
                  transform transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              >
                <div className={`px-6 py-4 ${getStatusColor(product.status)} text-white`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{getStatusText(product.status)}</span>
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xl font-semibold">#{product.orderNumber}</p>
                      <p className="text-gray-600">Client: {product.client}</p>
                    </div>
                    <span className="text-sm font-medium bg-gray-100 px-4 py-2 rounded-xl">
                      Étagère {product.shelf}
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex justify-between items-center">
                      <span>Référence</span>
                      <span className="font-semibold text-gray-900">{product.reference}</span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span>Date d'entrée</span>
                      <span className="font-semibold text-gray-900">{product.date}</span>
                    </p>
                    {product.shippedDate && (
                      <p className="flex justify-between items-center">
                        <span>Expédié le</span>
                        <span className="font-semibold text-green-600">{product.shippedDate}</span>
                      </p>
                    )}
                    {product.restockDate && (
                      <p className="flex justify-between items-center">
                        <span>Remise en stock le</span>
                        <span className="font-semibold text-pink-600">{product.restockDate}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bouton d'ajout flottant */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed right-6 bottom-32 bg-blue-500 text-white rounded-full p-6 shadow-lg
          hover:bg-blue-600 active:scale-95 transition-all duration-200
          transform hover:rotate-90"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Navigation du bas */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow-lg">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('shelf')}
            className={getNavButtonClass(activeTab === 'shelf', 'yellow')}
          >
            <Package className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Sur Étagère</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ordered')}
            className={getNavButtonClass(activeTab === 'ordered', 'orange')}
          >
            <ShoppingCart className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Commandes</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('shipped')}
            className={getNavButtonClass(activeTab === 'shipped', 'green')}
          >
            <Truck className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Expédié</span>
          </button>

          <button 
            onClick={() => setActiveTab('restocked')}
            className={getNavButtonClass(activeTab === 'restocked', 'pink')}
          >
            <RotateCcw className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Remise Stock</span>
          </button>
        </div>
      </div>

      {/* Modal d'ajout avec animation */}
      {showAddForm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50
            animate-fadeIn"
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-xl
              transform transition-all duration-300 animate-slideUp"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Nouveau Produit</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              {/* Formulaire ici... */}
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Référence</label>
                  <input 
                    type="text" 
                    name="reference"
                    className="w-full rounded-xl border-gray-200 p-4 bg-gray-50
                      focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Client</label>
                  <input 
                    type="text" 
                    name="client"
                    className="w-full rounded-xl border-gray-200 p-4 bg-gray-50
                      focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">N° Commande</label>
                  <input 
                    type="text"
                    name="orderNumber"
                    className="w-full rounded-xl border-gray-200 p-4 bg-gray-50
                      focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Étagère</label>
                  <input 
                    type="text"
                    name="shelf"
                    className="w-full rounded-xl border-gray-200 p-4 bg-gray-50
                      focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input 
                    type="date"
                    name="date"
                    className="w-full rounded-xl border-gray-200 p-4 bg-gray-50
                      focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white rounded-xl py-4 font-medium text-lg
                  hover:bg-blue-600 active:scale-98 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${isLoading ? 'animate-pulse' : ''}`}
              >
                {isLoading ? 'Ajout en cours...' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogistiqueApp;
