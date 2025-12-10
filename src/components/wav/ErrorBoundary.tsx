import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <Modal event={event} />
 * </ErrorBoundary>
 * ```
 * 
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('🚨 [ErrorBoundary] Caught error:', error);
    console.error('🚨 [ErrorBoundary] Component stack:', info.componentStack);
    
    // TODO: Send error to analytics service (e.g., Sentry, LogRocket)
    // Example: sendToAnalytics(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided by parent
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI - WAV Brand Style
      return (
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
          <div className="text-center px-6 max-w-md">
            {/* Error Icon */}
            <div className="mb-6">
              <svg 
                className="w-16 h-16 mx-auto text-white/40" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-wider">
              Algo salió mal
            </h2>

            {/* Description */}
            <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
              Lo sentimos, ocurrió un error inesperado. Por favor recarga la página para continuar.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors mb-2">
                  Ver detalles técnicos
                </summary>
                <pre className="text-xs text-red-400 bg-black/50 p-4 rounded overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                Recargar Página
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-white/10 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/20 transition-colors border border-white/20"
              >
                Volver Atrás
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
