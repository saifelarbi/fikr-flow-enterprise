import React from 'react';

export const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`border-t border-slate-700 ${className}`} {...props} />
  )
);
Separator.displayName = 'Separator';
