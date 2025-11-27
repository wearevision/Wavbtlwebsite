import React from 'react';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getCharCountStatus } from '../../utils/validation';

interface FormFieldProps {
  label: string;
  tooltip?: string;
  error?: string;
  children: React.ReactNode;
  charCount?: {
    current: number;
    min: number;
    max: number;
  };
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  tooltip,
  error,
  children,
  charCount
}) => {
  const hasError = !!error;
  
  let countStatus: 'error' | 'warning' | 'success' = 'success';
  if (charCount) {
    countStatus = getCharCountStatus(charCount.current, charCount.min, charCount.max);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className={`text-xs font-medium ${hasError ? 'text-red-400' : 'text-neutral-400'}`}>
            {label}
            {error && <span className="text-red-400 ml-1">*</span>}
          </label>
          {tooltip && (
            <div className="group relative">
              <Info className="w-3 h-3 text-neutral-500 cursor-help" />
              <div className="absolute left-0 top-5 w-64 p-2 bg-black border border-neutral-700 rounded-md text-[10px] text-neutral-300 leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-xl">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        
        {charCount && (
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono ${
              countStatus === 'error' ? 'text-red-400' :
              countStatus === 'warning' ? 'text-yellow-400' :
              'text-neutral-500'
            }`}>
              {charCount.current}/{charCount.max}
            </span>
            {countStatus === 'success' && charCount.current >= charCount.min && (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            )}
            {countStatus === 'error' && (
              <AlertCircle className="w-3 h-3 text-red-400" />
            )}
          </div>
        )}
      </div>

      {children}

      {error && (
        <div className="flex items-center gap-1 text-red-400 text-[11px] animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
