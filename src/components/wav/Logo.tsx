import React from 'react';
import logoAsset from "figma:asset/92a3b785dc625256d86bdd9c883bcbe054fc7639.png";

export function Logo() {
  return (
    <div className="flex justify-center items-center mb-8 z-20 relative">
      <img 
        src={logoAsset} 
        alt="WAV Logo" 
        className="w-24 h-24 md:w-40 md:h-40 object-contain"
      />
    </div>
  );
}
