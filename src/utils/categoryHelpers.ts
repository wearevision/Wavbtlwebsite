/**
 * Category Helpers — Validaciones, Analytics y Utilidades
 * 
 * Este archivo contiene funciones auxiliares para el sistema de categorías dinámicas.
 */

import { EventCategory } from './contentRules';
import { WavEvent } from '../types';

/**
 * Normaliza texto para comparación (lowercase, sin tildes, sin espacios extra)
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover tildes
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Genera un ID slug-safe desde un label
 */
export const generateCategoryId = (label: string): string => {
  return normalizeText(label)
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-')         // Espacios a guiones
    .replace(/-+/g, '-')          // Múltiples guiones a uno
    .replace(/^-|-$/g, '');       // Remover guiones al inicio/fin
};

/**
 * Valida que un ID de categoría sea único
 */
export const isCategoryIdUnique = (id: string, categories: EventCategory[], excludeId?: string): boolean => {
  return !categories.some(cat => cat.id === id && cat.id !== excludeId);
};

/**
 * Calcula similaridad entre dos strings (0-1)
 * Usa algoritmo de Levenshtein simplificado
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Jaccard similarity (simple pero efectivo)
  const words1 = new Set(s1.split(' '));
  const words2 = new Set(s2.split(' '));
  
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
};

/**
 * Encuentra categorías similares que podrían ser duplicadas
 */
export const findSimilarCategories = (
  categories: EventCategory[],
  threshold: number = 0.7
): Array<{ cat1: EventCategory; cat2: EventCategory; similarity: number }> => {
  const similar: Array<{ cat1: EventCategory; cat2: EventCategory; similarity: number }> = [];
  
  for (let i = 0; i < categories.length; i++) {
    for (let j = i + 1; j < categories.length; j++) {
      const sim = calculateSimilarity(categories[i].label, categories[j].label);
      if (sim >= threshold) {
        similar.push({
          cat1: categories[i],
          cat2: categories[j],
          similarity: sim
        });
      }
    }
  }
  
  return similar.sort((a, b) => b.similarity - a.similarity);
};

/**
 * Valida estructura de categoría
 */
export interface CategoryValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export const validateCategory = (
  category: Partial<EventCategory>,
  allCategories: EventCategory[] = []
): CategoryValidationError[] => {
  const errors: CategoryValidationError[] = [];
  
  // ID requerido y válido
  if (!category.id) {
    errors.push({
      field: 'id',
      message: 'El ID es obligatorio',
      severity: 'error'
    });
  } else if (!/^[a-z0-9-]+$/.test(category.id)) {
    errors.push({
      field: 'id',
      message: 'El ID solo puede contener letras minúsculas, números y guiones',
      severity: 'error'
    });
  } else if (!isCategoryIdUnique(category.id, allCategories)) {
    errors.push({
      field: 'id',
      message: 'Este ID ya existe',
      severity: 'error'
    });
  }
  
  // Label requerido
  if (!category.label || category.label.trim().length === 0) {
    errors.push({
      field: 'label',
      message: 'El nombre es obligatorio',
      severity: 'error'
    });
  } else if (category.label.length > 50) {
    errors.push({
      field: 'label',
      message: 'El nombre no debe exceder 50 caracteres',
      severity: 'error'
    });
  }
  
  // Description requerida
  if (!category.description || category.description.trim().length === 0) {
    errors.push({
      field: 'description',
      message: 'La descripción es obligatoria',
      severity: 'warning'
    });
  }
  
  // SEO Description validación
  if (category.seoDescription) {
    if (category.seoDescription.length < 100) {
      errors.push({
        field: 'seoDescription',
        message: 'La descripción SEO debería tener al menos 100 caracteres',
        severity: 'warning'
      });
    } else if (category.seoDescription.length > 200) {
      errors.push({
        field: 'seoDescription',
        message: 'La descripción SEO no debería exceder 200 caracteres',
        severity: 'warning'
      });
    }
  } else {
    errors.push({
      field: 'seoDescription',
      message: 'Considera agregar una descripción optimizada para SEO',
      severity: 'warning'
    });
  }
  
  // Keywords validación
  if (!category.keywords || category.keywords.length === 0) {
    errors.push({
      field: 'keywords',
      message: 'Agrega al menos 3 keywords para mejorar la auto-detección',
      severity: 'warning'
    });
  } else if (category.keywords.length < 3) {
    errors.push({
      field: 'keywords',
      message: 'Se recomiendan al menos 3 keywords',
      severity: 'warning'
    });
  }
  
  return errors;
};

/**
 * Calcula estadísticas de uso de categorías
 */
export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  archivedCategories: number;
  eventsByCategoryId: Record<string, number>;
  uncategorizedEvents: number;
  mostUsedCategories: Array<{ id: string; label: string; count: number }>;
  leastUsedCategories: Array<{ id: string; label: string; count: number }>;
  unusedCategories: Array<{ id: string; label: string }>;
}

export const calculateCategoryStats = (
  categories: EventCategory[],
  events: WavEvent[]
): CategoryStats => {
  const eventsByCategoryId: Record<string, number> = {};
  let uncategorizedEvents = 0;
  
  // Inicializar contadores
  for (const cat of categories) {
    if (!cat.isArchived) {
      eventsByCategoryId[cat.id] = 0;
    }
  }
  
  // Contar eventos por categoría
  for (const event of events) {
    if (!event.category) {
      uncategorizedEvents++;
    } else if (eventsByCategoryId.hasOwnProperty(event.category)) {
      eventsByCategoryId[event.category]++;
    }
  }
  
  // Ordenar por uso
  const sorted = Object.entries(eventsByCategoryId)
    .map(([id, count]) => ({
      id,
      label: categories.find(c => c.id === id)?.label || id,
      count
    }))
    .sort((a, b) => b.count - a.count);
  
  const mostUsed = sorted.slice(0, 5);
  const leastUsed = sorted.slice(-5).reverse();
  const unused = sorted.filter(s => s.count === 0);
  
  return {
    totalCategories: categories.length,
    activeCategories: categories.filter(c => !c.isArchived).length,
    archivedCategories: categories.filter(c => c.isArchived).length,
    eventsByCategoryId,
    uncategorizedEvents,
    mostUsedCategories: mostUsed,
    leastUsedCategories: leastUsed,
    unusedCategories: unused
  };
};

/**
 * Detecta problemas al intentar archivar/eliminar una categoría
 */
export interface CategoryDeletionWarning {
  type: 'HAS_EVENTS' | 'IS_CORE' | 'DUPLICATE_FOUND';
  message: string;
  affectedEventCount?: number;
  suggestedAction: string;
}

export const validateCategoryDeletion = (
  categoryId: string,
  categories: EventCategory[],
  events: WavEvent[]
): CategoryDeletionWarning[] => {
  const warnings: CategoryDeletionWarning[] = [];
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return warnings;
  
  // Contar eventos afectados
  const affectedEvents = events.filter(e => e.category === categoryId);
  
  if (affectedEvents.length > 0) {
    warnings.push({
      type: 'HAS_EVENTS',
      message: `Esta categoría tiene ${affectedEvents.length} evento(s) asignado(s)`,
      affectedEventCount: affectedEvents.length,
      suggestedAction: 'Re-asignar eventos a otra categoría antes de archivar'
    });
  }
  
  if (category.isCore) {
    warnings.push({
      type: 'IS_CORE',
      message: 'Esta es una categoría core recomendada para SEO',
      suggestedAction: 'Considera mantenerla activa o reemplazarla con otra categoría core'
    });
  }
  
  return warnings;
};

/**
 * Sugiere una categoría de reemplazo para eventos huérfanos
 */
export const suggestReplacementCategory = (
  deletedCategoryId: string,
  categories: EventCategory[],
  events: WavEvent[]
): string | null => {
  const affectedEvents = events.filter(e => e.category === deletedCategoryId);
  if (affectedEvents.length === 0) return null;
  
  // Analizar keywords comunes en los eventos afectados
  const allText = affectedEvents
    .map(e => `${e.brand || ''} ${e.title || ''} ${e.description || ''}`)
    .join(' ')
    .toLowerCase();
  
  // Scoring de categorías alternativas basado en keywords
  const scores: Record<string, number> = {};
  
  for (const cat of categories) {
    if (cat.id === deletedCategoryId || cat.isArchived) continue;
    
    scores[cat.id] = 0;
    for (const keyword of cat.keywords) {
      const occurrences = (allText.match(new RegExp(keyword, 'gi')) || []).length;
      scores[cat.id] += occurrences;
    }
  }
  
  // Retornar la categoría con mayor score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 && sorted[0][1] > 0 ? sorted[0][0] : null;
};

/**
 * Re-asigna eventos de una categoría a otra
 */
export const reassignEvents = (
  events: WavEvent[],
  fromCategoryId: string,
  toCategoryId: string | null
): WavEvent[] => {
  return events.map(event => {
    if (event.category === fromCategoryId) {
      return {
        ...event,
        category: toCategoryId || undefined
      };
    }
    return event;
  });
};

/**
 * Crea snapshot de categorías para rollback
 */
export interface CategorySnapshot {
  timestamp: string;
  categories: EventCategory[];
  eventCount: number;
  description: string;
}

export const createSnapshot = (
  categories: EventCategory[],
  events: WavEvent[],
  description: string = 'Manual snapshot'
): CategorySnapshot => {
  return {
    timestamp: new Date().toISOString(),
    categories: JSON.parse(JSON.stringify(categories)), // Deep clone
    eventCount: events.length,
    description
  };
};

/**
 * Valida que un snapshot sea compatible con el estado actual
 */
export const validateSnapshot = (
  snapshot: CategorySnapshot,
  currentEvents: WavEvent[]
): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  
  // Verificar que todas las categorías usadas en eventos actuales existen en el snapshot
  const snapshotCategoryIds = new Set(snapshot.categories.map(c => c.id));
  const usedCategoryIds = new Set(
    currentEvents
      .map(e => e.category)
      .filter(Boolean) as string[]
  );
  
  for (const categoryId of usedCategoryIds) {
    if (!snapshotCategoryIds.has(categoryId)) {
      warnings.push(
        `La categoría "${categoryId}" está en uso pero no existe en el snapshot. ` +
        `Los eventos con esta categoría quedarán sin categorizar.`
      );
    }
  }
  
  // Si hay warnings, no es 100% seguro pero puede proceder con confirmación
  return {
    valid: true, // Siempre retorna true, pero con warnings
    warnings
  };
};
