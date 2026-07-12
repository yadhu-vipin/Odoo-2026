import React from "react";
import { Maximize2, MapPin } from "lucide-react";

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAL1kKHo3cyjry5uzYeYJUit0om9iELkivHWnQdL2PKAE0wWG-Ykg_hoorB4e2T2bwIoo0RaX_dyWTeXpwiCzcRr76Yj5FGW64Glp_07AkjvxpAHg9ujwEFrlPAUNu8DADMdkcEDHb8FqoNGfsyEQh4JsclkY7Mve5VUqSe_3KAohvShyfhhJSuE0HNELOMii4Il-TCvL-R4oyjJd8aa1Z_TkQNwfcGFruS4fb4dRAzOMUPOkyXruiqaXQVTGLX-dN1OxzZPngq-37f";

export default function FleetStatus() {
  return (
    <div className="bg-white rounded-3xl border border-[#EEDADF] shadow-sm overflow-hidden h-64 relative group">
      {/* Map Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
        style={{ backgroundImage: `url('${MAP_IMAGE}')` }}
      />
      
      {/* Backdrop soft overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Floating Status Label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-2 border border-[#EEDADF]/50">
          <span className="w-2.5 h-2.5 bg-[#4ADE80] rounded-full animate-pulse border border-white" />
          Live Fleet Status
        </span>
      </div>

      {/* Pulsing Beacon Overlays on Map */}
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 group">
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#9E003F]/40 opacity-75" />
          <span className="relative rounded-full h-3.5 w-3.5 bg-[#9E003F] border-2 border-white shadow-sm flex items-center justify-center">
            <MapPin className="h-2 w-2 text-white" />
          </span>
        </div>
      </div>

      <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 group">
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-green-400/40 opacity-75" />
          <span className="relative rounded-full h-3.5 w-3.5 bg-[#4ADE80] border-2 border-white shadow-sm" />
        </div>
      </div>

      {/* Fullscreen Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <button className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition text-[#5E4D50] hover:text-[#9E003F] border border-[#EEDADF]/50">
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
