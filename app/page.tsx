'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  reference: string;
  client: string;
  orderNumber: string;
  date: string;
  shelf: string;
  status: 'shelf' | 'ordered' | 'shipped';
}

export default function LogistiqueApp() {
  const [activeTab, setActiveTab] = useState<'shelf' | 'ordered' | 'shipped'>('shelf');
  const [products, setProducts] = useState<Product[]>([
    {
      id: "P001",
      name: "Produit 1",
      reference: "REF123",
      client: "Client A",
      orderNumber: "CMD001",
      date: "2024-11-16",
      shelf: "A1",
      status: "shelf"
    }
  ]);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'shipped': return 'bg-emerald-500';
      case 'ordered': return 'bg-amber-500';
      case 'shelf': return 'bg-yellow-400';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: Product['status']) => {
    switch (status) {
      case 'shipped': return 'Expédié';
      case 'ordered': return 'En commande';
      case 'shelf': return 'Sur étagère';
      default: return 'Inconnu';
    }
  };

  const filteredProducts = products.filter(product => product.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {activeTab === 'shelf' ? 'Sur Étagère' : 
             activeTab === 'ordered' ? 'Commandes' : 'Expédié'}
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-gray-100 rounded-lg py-2 px-4 text-gray-700"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Commande #{product.orderNumber} • Client: {product.client}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(product.status)}`}>
                  {getStatusText(product.status)}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Référence: {product.reference}</p>
                <p>Étagère: {product.shelf}</p>
                <p>Date: {product.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-around">
          <button 
            onClick={() => setActiveTab('shelf')}
            className={`flex flex-col items-center p-2 ${activeTab === 'shelf' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <span className="text-sm">Sur Étagère</span>
          </button>
          <button 
            onClick={() => setActiveTab('ordered')}
            className={`flex flex-col items-center p-2 ${activeTab === 'ordered' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <span className="text-sm">Commandes</span>
          </button>
          <button 
            onClick={() => setActiveTab('shipped')}
            className={`flex flex-col items-center p-2 ${activeTab === 'shipped' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <span className="text-sm">Expédié</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
