'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, X } from 'lucide-react';

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState('shelf');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newProduct = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      name: formData.get('name')?.toString() || '',
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {activeTab === 'shelf' ? 'Sur Étagère' : 
               activeTab === 'ordered' ? 'Commandes' : 'Expédié'}
            </h1>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pl-10"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      <div className="max-w-xl mx-auto px-4 pt-32 pb-6">
        <div className="space-y-4">
          {products
            .filter(product => {
              const matchesSearch = (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.client.toLowerCase().includes(searchTerm.toLowerCase())
              );
              return matchesSearch && (activeTab === product.status);
            })
            .map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Commande #{product.orderNumber} • Client: {product.client}</p>
                  <p>Référence: {product.reference}</p>
                  <p>Étagère: {product.shelf}</p>
                  <p>Date: {product.date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bouton d'ajout */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed right-4 bottom-24 bg-blue-500 text-white rounded-full p-4 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t">
        <div className="max-w-xl mx-auto px-4 py-2 flex justify-around">
          <button 
            onClick={() => setActiveTab('shelf')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'shelf' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <Package className="w-6 h-6" />
            <span className="text-xs mt-1">Sur Étagère</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ordered')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'ordered' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">Commandes</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('shipped')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'shipped' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <Truck className="w-6 h-6" />
            <span className="text-xs mt-1">Expédié</span>
          </button>
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Nouveau Produit</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input 
                  type="text" 
                  name="name"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Référence</label>
                <input 
                  type="text" 
                  name="reference"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <input 
                  type="text" 
                  name="client"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">N° Commande</label>
                <input 
                  type="text" 
                  name="orderNumber"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Étagère</label>
                <input 
                  type="text" 
                  name="shelf"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  name="date"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 mt-4"
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
