'use client';

import { Button } from '@/components/ui/button';

interface PanelHeaderProps {
  title: string;
  isAdding: boolean;
  onToggleAdd: () => void;
}

export function PanelHeader({ title, isAdding, onToggleAdd }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
      <h2 className="text-white font-bold text-lg">{title}</h2>
      <Button
        variant="link"
        size="sm"
        className="text-sm text-amber-400 hover:text-amber-300"
        onClick={onToggleAdd}
      >
        {isAdding ? 'Cancel' : '+ Add'}
      </Button>
    </div>
  );
}
