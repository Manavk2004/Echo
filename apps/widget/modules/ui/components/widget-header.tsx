import { cn } from '@workspace/ui/lib/utils';
import React from 'react'

function WidgetHeader({
    children,
    className,
}:{
    children: React.ReactNode;
    className?: string
} ) {
  return (
    <div>
        <header className={cn(
            "bg-gradient-to-b! from-primary! to-[#0b63f]! p-4! text-primary-foreground!",
            className
        )}>
            {children}
        </header>
    </div>
  )
}

export default WidgetHeader
