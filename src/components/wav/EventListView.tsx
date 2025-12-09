/**
 * EventListView — Vista de Lista Principal del CMS
 * 
 * Contenedor que integra:
 * - FilterBar (búsqueda y filtros)
 * - EventBarCard[] (lista de eventos)
 * - Empty states
 * - Skeleton UI
 */

import React, { useState, useMemo } from 'react';
import { WavEvent } from '../../types';
import { FilterBar } from './FilterBar';
import { EventBarCard, SkeletonEventBar } from './EventBarCard';
import { EventCategory } from '../../utils/contentRules';
import { Inbox } from 'lucide-react';

interface EventListViewProps {
  events: WavEvent[];
  onSelectEvent: (index: number) => void;
  selectedEventId?: string | null;
  loading?: boolean;
  categories?: EventCategory[]; // Pass categories dynamically
}

export const EventListView: React.FC<EventListViewProps> = ({
  events,
  onSelectEvent,
  selectedEventId = null,
  loading = false,
  categories = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | 'all'>('all');

  // Extract unique brands from events
  const brands = useMemo(() => {
    const uniqueBrands = new Set<string>();
    events.forEach(event => {
      if (event.brand && event.brand.trim()) {
        uniqueBrands.add(event.brand);
      }
    });
    return Array.from(uniqueBrands).sort();
  }, [events]);

  // Filtrado de eventos
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filtro por búsqueda de texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => {
        const searchableText = [
          event.brand,
          event.title,
          event.description,
          event.summary,
          event.keywords?.join(' '),
          event.hashtags?.join(' ')
        ].filter(Boolean).join(' ').toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Filtro por marca
    if (selectedBrand !== 'all') {
      result = result.filter(event => event.brand === selectedBrand);
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      result = result.filter(event => event.category === selectedCategory);
    }

    return result;
  }, [events, searchQuery, selectedBrand, selectedCategory]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-neutral-900 border border-neutral-800 rounded-lg animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <SkeletonEventBar key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state (no events at all)
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 bg-neutral-900 rounded-full mb-4">
          <Inbox className="w-12 h-12 text-neutral-600" />
        </div>
        <h3 className="font-bold text-white mb-2">No hay eventos</h3>
        <p className="text-sm text-neutral-400 max-w-md">
          Crea tu primer evento usando el botón "Nuevo Evento" en la parte superior.
        </p>
      </div>
    );
  }

  // Empty state (no results after filtering)
  const showNoResults = filteredEvents.length === 0 && (searchQuery.trim() || selectedCategory !== 'all' || selectedBrand !== 'all');

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        totalEvents={events.length}
        filteredCount={filteredEvents.length}
        categories={categories}
        brands={brands}
      />

      {/* No Results State */}
      {showNoResults && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 bg-neutral-900 rounded-full mb-4">
            <Inbox className="w-10 h-10 text-neutral-600" />
          </div>
          <h3 className="font-bold text-white mb-2">No se encontraron eventos</h3>
          <p className="text-sm text-neutral-400 max-w-md mb-4">
            No hay eventos que coincidan con los filtros aplicados.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedBrand('all');
            }}
            className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Events List */}
      {!showNoResults && (
        <div className="space-y-3">
          {filteredEvents.map((event, index) => {
            // Encontrar el índice original del evento en el array completo
            const originalIndex = events.findIndex(e => e.id === event.id);
            
            return (
              <EventBarCard
                key={event.id || index}
                event={event}
                onClick={() => onSelectEvent(originalIndex)}
                isSelected={event.id === selectedEventId}
                categories={categories}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
