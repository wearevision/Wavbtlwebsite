import React from 'react';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getCharCountStatus } from '../../utils/validation';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  charCount?: number;
  placeholder?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  tooltip,
  error,
  required = false,
  multiline = false,
  rows = 3,
  maxLength,
  charCount,
  placeholder,
  disabled = false
}) => {
  const hasError = !!error;
  
  let countStatus: 'error' | 'warning' | 'success' = 'success';
  if (charCount !== undefined && maxLength) {
    countStatus = getCharCountStatus(charCount, 0, maxLength);
  }

  const inputClassName = `w-full bg-neutral-900 border ${
    hasError ? 'border-red-500' : 'border-neutral-800'
  } rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className={`text-sm font-medium ${hasError ? 'text-red-400' : 'text-neutral-300'}`}>
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
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
        
        {charCount !== undefined && maxLength && (
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono ${
              countStatus === 'error' ? 'text-red-400' :
              countStatus === 'warning' ? 'text-yellow-400' :
              'text-neutral-500'
            }`}>
              {charCount}/{maxLength}
            </span>
            {countStatus === 'success' && charCount > 0 && (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            )}
            {countStatus === 'error' && (
              <AlertCircle className="w-3 h-3 text-red-400" />
            )}
          </div>
        )}
      </div>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClassName} resize-none`}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}

      {error && (
        <div className="flex items-center gap-1 text-red-400 text-[11px] animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
