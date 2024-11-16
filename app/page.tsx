'use client';

import React, { useState } from 'react';
import { Plus, Search, Package, Truck, ShoppingCart, X, MoreVertical, Edit, Trash2 } from 'lucide-react';

const LogistiqueApp = () => {
  const [activeTab, setActiveTab] = useState('shelf');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "iPhone 15 Pro",
      reference: "REF123",
      client: "Martin Dupont",
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
      <div className="border-t border-gray-100 mt-2">
        <button 
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-blue-500"
        >
          <Edit className="w-4 h-4" />
          Modifier
        </button>
        <button 
          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-500"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </button>
      </div>
    </div>
  );

  // Le reste du code reste identique, mais remplacez le rendu des cartes par ceci :
  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${statusColors[product.status]} shadow-sm`}>
            {product.status === 'shipped' ? 'Expédié' : 
             product.status === 'ordered' ? 'En commande' : 'Sur étagère'}
          </span>
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowActionMenu(showActionMenu === product.id ? null : product.id);
              }}
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

  return (
    // ... le reste du code reste identique
  );
};

export default LogistiqueApp;
