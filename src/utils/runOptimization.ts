/**
 * Run optimization script
 * 
 * Execute this in the browser console to optimize all events:
 * 
 * import('/utils/runOptimization.ts').then(m => m.runOptimization())
 */

import { optimizeAllEvents } from './optimize';
import { supabase } from './supabase/client';

export async function runOptimization() {
  console.log('Starting optimization of all events...');
  console.log('This may take a few minutes depending on the number of events.');
  
  try {
    // Get authentication token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      console.error('❌ Not authenticated. Please log in to the Admin Panel first.');
      throw new Error('Authentication required. Please log in to the Admin Panel.');
    }
    
    console.log('✓ Authentication token obtained');
    
    const result = await optimizeAllEvents(session.access_token);
    
    console.log('\n=== OPTIMIZATION COMPLETE ===\n');
    console.log(`Total events: ${result.total}`);
    console.log(`Optimized: ${result.optimized}`);
    console.log(`Skipped (already complete): ${result.skipped}`);
    console.log(`Errors: ${result.errors}`);
    console.log('\nMessage:', result.message);
    
    if (result.results.length > 0) {
      console.log('\n=== DETAILED RESULTS ===\n');
      result.results.forEach(r => {
        if (r.fieldsUpdated.length > 0) {
          console.log(`✓ ${r.brand} - ${r.title}`);
          console.log(`  Updated: ${r.fieldsUpdated.join(', ')}`);
          if (r.category) {
            console.log(`  Category: ${r.category}`);
          }
        } else if (r.error) {
          console.error(`✗ ${r.brand} - ${r.title}`);
          console.error(`  Error: ${r.error}`);
        }
      });
    }
    
    console.log('\nRefresh the page to see the optimized events.');
    
    return result;
  } catch (error) {
    console.error('Optimization failed:', error);
    throw error;
  }
}

// Auto-run if loaded directly
if (typeof window !== 'undefined') {
  (window as any).runOptimization = runOptimization;
  console.log('Optimization utility loaded. Run: runOptimization()');
}
