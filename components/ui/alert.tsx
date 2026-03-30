import React from 'react';

export const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' }>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: 'border-slate-700 bg-slate-800 text-slate-300',
      destructive: 'border-red-700 bg-red-900/20 text-red-200',
    };
    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Alert.displayName = 'Alert';

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`text-sm ${className}`} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';
