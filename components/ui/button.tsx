import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'bg-blue-600 hover:bg-blue-700 text-white',
      outline: 'border border-slate-700 text-slate-300 hover:bg-slate-800',
      destructive: 'bg-red-600 hover:bg-red-700 text-white',
    };

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
