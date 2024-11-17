'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, X, RotateCcw } from 'lucide-react';

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
      case 'shipped': return 'bg-green-500 hover:bg-green-600';
      case 'ordered': return 'bg-orange-500 hover:bg-orange-600';
      case 'shelf': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'restocked': return 'bg-pink-500 hover:bg-pink-600';
      default: return 'bg-gray-500';
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

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newProduct = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      reference: formData.get('reference')?.toString() || '',
      client: formData.get('client')?.toString() || '',
      orderNumber: formData.get('orderNumber')?.toString() || '',
      shelf: formData.get('shelf')?.toString() || '',
      date: formData.get('date')?.toString() || new Date().toISOString().split('T')[0],
      status: 'shelf' as const
    };
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {getStatusText(activeTab)}
            </h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par référence, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="max-w-xl mx-auto px-4 pt-32 pb-6">
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
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className={`px-4 py-3 ${getStatusColor(product.status)} text-white`}>
                  <span className="font-medium">{getStatusText(product.status)}</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Commande #{product.orderNumber}</p>
                      <p className="text-sm text-gray-500">Client: {product.client}</p>
                    </div>
                    <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                      {product.shelf}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex justify-between">
                      <span>Référence:</span>
                      <span className="font-medium">{product.reference}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Date d'entrée:</span>
                      <span className="font-medium">{product.date}</span>
                    </p>
                    {product.shippedDate && (
                      <p className="flex justify-between">
                        <span>Date d'expédition:</span>
                        <span className="font-medium">{product.shippedDate}</span>
                      </p>
                    )}
                    {product.restockDate && (
                      <p className="flex justify-between">
                        <span>Date de remise en stock:</span>
                        <span className="font-medium">{product.restockDate}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bouton d'ajout */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed right-4 bottom-24 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t">
        <div className="max-w-xl mx-auto px-4 py-2 flex justify-around">
          <button 
            onClick={() => setActiveTab('shelf')}
            className={`flex flex-col items-center p-2 transition-colors ${
              activeTab === 'shelf' ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Package className="w-6 h-6" />
            <span className="text-xs mt-1">Sur Étagère</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ordered')}
            className={`flex flex-col items-center p-2 transition-colors ${
              activeTab === 'ordered' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Commandes</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('shipped')}
            className={`flex flex-col items-center p-2 transition-colors ${
              activeTab === 'shipped' ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            <Truck className="w-6 h-6" />
            <span className="text-xs mt-1">Expédié</span>
          </button>

          <button 
            onClick={() => setActiveTab('restocked')}
            className={`flex flex-col items-center p-2 transition-colors ${
              activeTab === 'restocked' ? 'text-pink-500' : 'text-gray-400'
            }`}
          >
            <RotateCcw className="w-6 h-6" />
            <span className="text-xs mt-1">Remise Stock</span>
          </button>
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
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
              <div>
                <label className="block text-sm font-medium mb-1">Référence</label>
                <input 
                  type="text" 
                  name="reference"
                  className="w-full rounded-lg border p-3 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <input 
                  type="text" 
                  name="client"
                  className="w-full rounded-lg border p-3 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">N° Commande</label>
                <input 
                  type="text" 
                  name="orderNumber"
                  className="w-full rounded-lg border p-3 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Étagère</label>
                <input 
                  type="text" 
                  name="shelf"
                  className="w-full rounded-lg border p-3 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  name="date"
                  className="w-full rounded-lg border p-3 bg-gray-50"
                  required
                />
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
      )}
    </div>
  );
};

export default LogistiqueApp;
