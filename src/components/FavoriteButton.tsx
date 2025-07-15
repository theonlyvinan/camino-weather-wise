
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  townId: string;
  size?: 'sm' | 'default';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  townId, 
  size = 'sm',
  className = ''
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(townId);

  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'sm' : 'icon'}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(townId);
      }}
      className={`p-1 hover:bg-muted/60 transition-colors ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          favorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-muted-foreground hover:text-red-500/70'
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
