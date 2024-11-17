'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, RotateCcw, X } from 'lucide-react';

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState('shelf');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const products = [
    {
      id: "P001",
      reference: "REF123",
      client: "Client A",
      orderNumber: "CMD001",
      date: "2024-11-16",
      shelf: "A1",
      status: "shelf"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'shelf': return 'bg-yellow-500';
      case 'ordered': return 'bg-orange-500';
      case 'shipped': return 'bg-green-500';
      case 'restocked': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const NavButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button 
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-6 rounded-2xl
        ${isActive ? getStatusColor(label.toLowerCase().replace(' ', '')) + ' text-white' : 'bg-gray-100 text-gray-600'}
        hover:scale-105 active:scale-95 transition-all duration-200 
        w-full mx-2 shadow-md hover:shadow-lg
      `}
    >
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* En-tête */}
      <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{activeTab === 'shelf' ? 'Sur Étagère' : 
              activeTab === 'ordered' ? 'Commandes' : 
              activeTab === 'shipped' ? 'Expédié' : 'Remise en Stock'}</h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par référence, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-4 px-12 text-lg
                focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="pt-36 px-6">
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} 
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className={`p-4 ${getStatusColor(product.status)} text-white`}>
                <span className="text-lg font-semibold">#{product.orderNumber}</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">Client: {product.client}</p>
                    <p className="text-sm text-gray-500">Réf: {product.reference}</p>
                  </div>
                  <span className="bg-gray-100 px-4 py-2 rounded-xl font-medium">
                    {product.shelf}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Date d'entrée:</span>
                    <span className="font-medium">{product.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton d'ajout */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed right-6 bottom-32 bg-blue-500 text-white rounded-full p-6 shadow-lg
          hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Navigation du bas */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4">
        <div className="flex justify-between max-w-6xl mx-auto">
          <NavButton 
            icon={Package} 
            label="Sur Étagère"
            isActive={activeTab === 'shelf'}
            onClick={() => setActiveTab('shelf')}
          />
          <NavButton 
            icon={ShoppingCart} 
            label="Commandes"
            isActive={activeTab === 'ordered'}
            onClick={() => setActiveTab('ordered')}
          />
          <NavButton 
            icon={Truck} 
            label="Expédié"
            isActive={activeTab === 'shipped'}
            onClick={() => setActiveTab('shipped')}
          />
          <NavButton 
            icon={RotateCcw} 
            label="Remise Stock"
            isActive={activeTab === 'restocked'}
            onClick={() => setActiveTab('restocked')}
          />
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Nouveau Produit</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Référence</label>
                <input 
                  type="text"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <input 
                  type="text"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">N° Commande</label>
                <input 
                  type="text"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Étagère</label>
                <input 
                  type="text"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date d'entrée</label>
                <input 
                  type="date"
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-500 text-white rounded-xl py-4 font-medium
                  hover:bg-blue-600 active:scale-98 transition-all duration-200"
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
