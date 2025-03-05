import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Componente para el ícono de perfil
const ProfileIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none" // Esto define que el SVG no tenga relleno por defecto
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zM12 14c-2.61 0-7.5 1.315-7.5 3.5v1.5h15v-1.5c0-2.185-4.89-3.5-7.5-3.5z"
        fill="#000000" // Cambia el color aquí si es necesario
      />
    </Svg>
  );
};

export default ProfileIcon;
