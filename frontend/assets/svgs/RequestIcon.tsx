import React from "react";
import Svg, { Path } from "react-native-svg";

const SearchIcon: React.FC<{ size: number }> = ({}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h5q.425 0 .713.288T11 4t-.288.713T10 5H5v14h14v-5q0-.425.288-.712T20 13t.713.288T21 14v5q0 .825-.587 1.413T19 21zM16 8h-2q-.425 0-.712-.288T13 7t.288-.712T14 6h2V4q0-.425.288-.712T17 3t.713.288T18 4v2h2q.425 0 .713.288T21 7t-.288.713T20 8h-2v2q0 .425-.288.713T17 11t-.712-.288T16 10z"
      ></Path>
    </Svg>
  );
};

export default SearchIcon;
