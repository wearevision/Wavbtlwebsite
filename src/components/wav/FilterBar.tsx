/**
 * FilterBar — Sistema de Filtros para Lista de Eventos
 * 
 * Permite filtrar eventos por:
 * - Búsqueda de texto (marca, título, descripción)
 * - Categoría
 */

import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { EventCategory } from '../../utils/contentRules';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | 'all';
  onCategoryChange: (category: string | 'all') => void;
  selectedBrand: string | 'all';
  onBrandChange: (brand: string | 'all') => void;
  totalEvents: number;
  filteredCount: number;
  categories: EventCategory[]; // Pass categories dynamically
  brands: string[]; // Available brands
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  totalEvents,
  filteredCount,
  categories,
  brands
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onBrandChange('all');
  };

  const hasActiveFilters = searchQuery.length > 0 || selectedCategory !== 'all' || selectedBrand !== 'all';

  const selectedCategoryInfo = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por marca, título o descripción..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-md pl-10 pr-10 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Brand Filter */}
        <div className="relative">
          <button
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            className={`w-full md:w-auto px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              selectedBrand === 'all'
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            {selectedBrand === 'all' ? 'Todas las marcas' : selectedBrand}
          </button>

          {/* Brand Dropdown */}
          {showBrandDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowBrandDropdown(false)}
              />
              
              <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-20 overflow-hidden max-h-96 overflow-y-auto">
                <button
                  onClick={() => {
                    onBrandChange('all');
                    setShowBrandDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-800 transition-colors ${
                    selectedBrand === 'all' ? 'bg-neutral-800 text-purple-500 font-bold' : 'text-white'
                  }`}
                >
                  <div className="font-medium">Todas las marcas</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Mostrar todos los eventos</div>
                </button>

                <div className="border-t border-neutral-800" />

                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      onBrandChange(brand);
                      setShowBrandDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-800 transition-colors ${
                      selectedBrand === brand 
                        ? 'bg-neutral-800 text-purple-500 font-bold' 
                        : 'text-white'
                    }`}
                  >
                    <div className="font-medium">{brand}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className={`w-full md:w-auto px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            {selectedCategory === 'all' 
              ? 'Todas las categorías' 
              : selectedCategoryInfo?.label || 'Categoría'}
          </button>

          {/* Dropdown */}
          {showCategoryDropdown && (
            <>
              {/* Overlay to close dropdown */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowCategoryDropdown(false)}
              />
              
              <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-20 overflow-hidden">
                {/* All Categories Option */}
                <button
                  onClick={() => {
                    onCategoryChange('all');
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-800 transition-colors ${
                    selectedCategory === 'all' ? 'bg-neutral-800 text-pink-500 font-bold' : 'text-white'
                  }`}
                >
                  <div className="font-medium">Todas las categorías</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Mostrar todos los eventos</div>
                </button>

                <div className="border-t border-neutral-800" />

                {/* Category Options */}
                {categories.filter(cat => !cat.isArchived).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-800 transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-neutral-800 text-pink-500 font-bold' 
                        : 'text-white'
                    }`}
                  >
                    <div className="font-medium">{category.label}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{category.description}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results Counter & Clear Filters */}
      <div className="flex items-center justify-between text-xs">
        <div className="text-neutral-400">
          Mostrando <span className="text-white font-bold">{filteredCount}</span> de{' '}
          <span className="text-neutral-300">{totalEvents}</span> eventos
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};
