import React from 'react'

export default function CloseIcon({ width = 24, height = 24, className }: SVGTypeParams) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" className={"fill-[#1C274C] " + className}>
      <g id="Menu / Close_LG">
        <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  )
}
