import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full text-xs font-semibold',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        info:
          'bg-blue-400 text-white shadow-xs hover:bg-blue-400/90',
        success:
          'bg-green-200 text-black shadow-xs hover:bg-green-400/90',
        inverted:
          'bg-foreground text-background shadow-xs hover:bg-foreground/90',

        // outline:
        //   'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        // secondary:
        //   'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        // ghost: 'hover:bg-accent hover:text-accent-foreground',
        // link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-6 px-2 py-2',
        sm: 'h-5 rounded-md px-1 text-xs',
        lg: 'h-7 rounded-md px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        data-nosnippet // Prevent badge from being indexed by search engines
        aria-hidden="true" // Hide badge from screen readers
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

const FieldBadges = ({ type, required = false, multiple, min, max, options, defaultValue, hideOptional }: {
  type: React.ReactNode;
  required: boolean;
  multiple?: boolean;
  min?: number;
  max?: number;
  options?: string[];
  defaultValue?: string | number | boolean | null;
  hideOptional?: boolean;
}) => {
  const defaultProps = {
    size: 'sm' as const,
    // className: 'hidden-in-toc'
  };

  return (<div className='inline-flex flex-wrap gap-2 hidden-in-toc'>
    <Badge {...defaultProps} variant={'default'}>Type: {type}</Badge>

    {(required || !hideOptional) && (<Badge {...defaultProps} variant={required ? 'destructive' : 'info'}>{required ? 'Required' : 'Optional'}</Badge>)}
    {multiple && <Badge {...defaultProps} variant={'info'}>Multiple</Badge>}
    {typeof defaultValue !== 'undefined' && <Badge {...defaultProps} variant={'info'}>Default: {`${defaultValue}`}</Badge>}

    {typeof min === 'number' && <Badge {...defaultProps} variant={'success'}>Min: {min}</Badge>}
    {typeof max === 'number' && <Badge {...defaultProps} variant={'success'}>Max: {max}</Badge>}

    {options && <Badge {...defaultProps} variant={'inverted'}>Options: {options.join(', ')}</Badge>}
  </div>);
}
FieldBadges.displayName = 'FieldBadges';

export { Badge, badgeVariants, FieldBadges };
