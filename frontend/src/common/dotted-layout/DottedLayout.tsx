import { ReactNode } from 'react';

export interface DottedLayoutProps {
  children: ReactNode;
}

export const DottedLayout = ({ children }: DottedLayoutProps) => (
  <div className="w-screen min-h-screen inset-0 bg-[radial-gradient(#686868_1px,transparent_1px)] [background-size:32px_32px]">
    {children}
  </div>
);
