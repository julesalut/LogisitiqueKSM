'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, RotateCcw, X } from 'lucide-react';

type ProductStatus = 'shelf' | 'ordered' | 'shipped' | 'restocked';

interface Product {
  id: string;
  reference: string;
  client: string;
  orderNumber: string;
  date: string;
  shelf: string;
  status: ProductStatus;
  shippedDate?: string;
  restockDate?: string;
}

interface NavButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState<ProductStatus>('shelf');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const initialProducts: Product[] = [
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

  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getStatusColor = (status: ProductStatus): string => {
    switch (status) {
      case 'shelf': return 'bg-yellow-500';
      case 'ordered': return 'bg-orange-500';
      case 'shipped': return 'bg-green-500';
      case 'restocked': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ProductStatus): string => {
    switch (status) {
      case 'shelf': return 'Sur Étagère';
      case 'ordered': return 'Commandes';
      case 'shipped': return 'Expédié';
      case 'restocked': return 'Remise Stock';
      default: return status;
    }
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      reference: formData.get('reference')?.toString() || '',
      client: formData.get('client')?.toString() || '',
      orderNumber: formData.get('orderNumber')?.toString() || '',
      shelf: formData.get('shelf')?.toString() || '',
      date: formData.get('date')?.toString() || new Date().toISOString().split('T')[0],
      status: 'shelf'
    };
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };

  const NavButton = ({ icon: Icon, label, isActive, onClick }: NavButtonProps) => (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-6 rounded-2xl
        ${isActive ? getStatusColor(label.toLowerCase() as ProductStatus) + ' text-white' : 'bg-gray-100 text-gray-600'}
        hover:scale-105 active:scale-95 transition-all duration-200
        shadow-md hover:shadow-lg w-full mx-2
      `}
    >
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-sm font-medium">{getStatusText(label.toLowerCase() as ProductStatus)}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{getStatusText(activeTab)}</h1>
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

      {/* Main Content */}
      <div className="pt-36 px-6">
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
              <div key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className={`p-4 ${getStatusColor(product.status)} text-white`}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">#{product.orderNumber}</span>
                    <span className="text-sm">Étagère {product.shelf}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-lg font-semibold">Client: {product.client}</p>
                    <p className="text-gray-600">Réf: {product.reference}</p>
                  </div>
                  <div className="pt-2 border-t space-y-2">
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-600">Date d'entrée:</span>
                      <span className="font-medium">{product.date}</span>
                    </p>
                    {product.shippedDate && (
                      <p className="flex justify-between text-sm">
                        <span className="text-gray-600">Date d'expédition:</span>
                        <span className="font-medium text-green-600">{product.shippedDate}</span>
                      </p>
                    )}
                    {product.restockDate && (
                      <p className="flex justify-between text-sm">
                        <span className="text-gray-600">Date de remise:</span>
                        <span className="font-medium text-pink-600">{product.restockDate}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed right-6 bottom-32 bg-blue-500 text-white rounded-full p-6 shadow-lg
          hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t p-4">
        <div className="flex justify-between max-w-6xl mx-auto">
          <NavButton
            icon={Package}
            label="shelf"
            isActive={activeTab === 'shelf'}
            onClick={() => setActiveTab('shelf')}
          />
          <NavButton
            icon={ShoppingCart}
            label="ordered"
            isActive={activeTab === 'ordered'}
            onClick={() => setActiveTab('ordered')}
          />
          <NavButton
            icon={Truck}
            label="shipped"
            isActive={activeTab === 'shipped'}
            onClick={() => setActiveTab('shipped')}
          />
          <NavButton
            icon={RotateCcw}
            label="restocked"
            isActive={activeTab === 'restocked'}
            onClick={() => setActiveTab('restocked')}
          />
        </div>
      </div>

      {/* Add Product Modal */}
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

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Référence</label>
                  <input
                    type="text"
                    name="reference"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client</label>
                  <input
                    type="text"
                    name="client"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">N° Commande</label>
                  <input
                    type="text"
                    name="orderNumber"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Étagère</label>
                  <input
                    type="text"
                    name="shelf"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date d'entrée</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
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
