import React from 'react';
import { IQManiaLogo, IQManiaRocketIcon } from './IQManiaLogo';

interface BrainLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  textVariant?: 'horizontal' | 'stacked';
}

export const BrainLogo: React.FC<BrainLogoProps> = ({ 
  size = 'md', 
  showText = true,
  className = '',
  textVariant = 'horizontal'
}) => {
  return (
    <IQManiaLogo
      size={size}
      showText={showText}
      textVariant={textVariant}
      className={className}
    />
  );
};

export { IQManiaRocketIcon };

