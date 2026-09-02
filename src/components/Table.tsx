import { forwardRef } from 'react';
import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { cn } from '../lib/cn';

export type TableCellAlign = 'start' | 'center' | 'end';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Accessible name for the keyboard-focusable horizontal scroll region. */
  scrollLabel?: string;
  /** Class applied to the horizontal scroll region. */
  containerClassName?: string;
  /** Minimum table width before the container begins scrolling. */
  minWidth?: CSSProperties['minWidth'];
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      scrollLabel = 'Scrollable data table',
      containerClassName,
      className,
      minWidth = '40rem',
      style,
      ...props
    },
    ref,
  ) => (
    <div
      className={cn('bits-component bits-table-container', containerClassName)}
      role="region"
      aria-label={scrollLabel}
      tabIndex={0}
    >
      <table
        {...props}
        ref={ref}
        className={cn('bits-table', className)}
        style={{ minWidth, ...style }}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption {...props} ref={ref} className={cn('bits-table__caption', className)} />
));
TableCaption.displayName = 'TableCaption';

export const TableHead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead {...props} ref={ref} className={cn('bits-table__head', className)} />
));
TableHead.displayName = 'TableHead';

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody {...props} ref={ref} className={cn('bits-table__body', className)} />
));
TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot {...props} ref={ref} className={cn('bits-table__footer', className)} />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr {...props} ref={ref} className={cn('bits-table__row', className)} />
));
TableRow.displayName = 'TableRow';

export type TableHeaderProps = Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> & {
  align?: TableCellAlign;
};

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ align = 'start', className, scope = 'col', ...props }, ref) => (
    <th
      {...props}
      ref={ref}
      scope={scope}
      className={cn('bits-table__header', `bits-table__cell--${align}`, className)}
      data-align={align}
    />
  ),
);
TableHeader.displayName = 'TableHeader';

export type TableCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> & {
  align?: TableCellAlign;
};

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = 'start', className, ...props }, ref) => (
    <td
      {...props}
      ref={ref}
      className={cn('bits-table__cell', `bits-table__cell--${align}`, className)}
      data-align={align}
    />
  ),
);
TableCell.displayName = 'TableCell';

export interface TableCellContentProps extends HTMLAttributes<HTMLDivElement> {
  primary: ReactNode;
  secondary?: ReactNode;
}

export const TableCellContent = forwardRef<HTMLDivElement, TableCellContentProps>(
  ({ primary, secondary, className, ...props }, ref) => (
    <div {...props} ref={ref} className={cn('bits-table__cell-content', className)}>
      <span className="bits-table__cell-primary">{primary}</span>
      {secondary === undefined ? null : (
        <span className="bits-table__cell-secondary">{secondary}</span>
      )}
    </div>
  ),
);
TableCellContent.displayName = 'TableCellContent';
