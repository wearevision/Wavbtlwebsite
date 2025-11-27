import { useMemo } from 'react';
import { 
  validateEvent, 
  hasOnlyAllowedFields, 
  ValidationResult,
  ValidationError
} from '../../utils/validation';
import { generateSlug } from '../../utils/slug';

export interface EventValidationState {
  isValid: boolean;
  errors: Map<string, string>; // field -> error message
  forbiddenFields: string[];
  slug: string; // Auto-generated slug
}

export function useEventValidation(events: any[]): Map<number, EventValidationState> {
  return useMemo(() => {
    const validationMap = new Map<number, EventValidationState>();

    events.forEach((event, index) => {
      // Run validation
      const result = validateEvent(event);
      
      // Check for forbidden fields
      const forbidden = hasOnlyAllowedFields(event);
      
      // Generate slug with UNIVERSAL FORMAT: brand-title
      const slug = generateSlug(
        event.brand || 'marca', 
        event.title || '', 
        event.id
      );

      // Convert errors array to Map for easy lookup
      const errorMap = new Map<string, string>();
      result.errors.forEach((err: ValidationError) => {
        errorMap.set(err.field, err.message);
      });

      validationMap.set(index, {
        isValid: result.isValid && forbidden.length === 0,
        errors: errorMap,
        forbiddenFields: forbidden,
        slug
      });
    });

    return validationMap;
  }, [events]);
}