import React from "react";
import { Navigation, MapPin } from "lucide-react";

interface RouteMapProps {
  source: string;
  destination: string;
  progress?: number;
}

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAL1kKHo3cyjry5uzYeYJUit0om9iELkivHWnQdL2PKAE0wWG-Ykg_hoorB4e2T2bwIoo0RaX_dyWTeXpwiCzcRr76Yj5FGW64Glp_07AkjvxpAHg9ujwEFrlPAUNu8DADMdkcEDHb8FqoNGfsyEQh4JsclkY7Mve5VUqSe_3KAohvShyfhhJSuE0HNELOMii4Il-TCvL-R4oyjJd8aa1Z_TkQNwfcGFruS4fb4dRAzOMUPOkyXruiqaXQVTGLX-dN1OxzZPngq-37f";

export default function RouteMap({ source, destination, progress = 0 }: RouteMapProps) {
  return (
    <div className="bg-white border border-[#EEDADF] rounded-3xl overflow-hidden shadow-sm h-80 relative group">
      {/* Map Image Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${MAP_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-black/5" />

      {/* Floating Status Indicator */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-[#EEDADF]/50">
          <Navigation className="h-3 w-3 text-[#9E003F]" />
          Active Route Tracking
        </span>
        <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-[#EEDADF]/50">
          <span className="w-1.5 h-1.5 bg-[#9E003F] rounded-full" />
          Origin: {source}
        </span>
      </div>

      {/* Center path indicator line */}
      <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-[#9E003F]/20 rounded-full transform -translate-y-1/2 border border-dashed border-[#9E003F]/40" />

      {/* Progress path line */}
      {progress > 0 && (
        <div
          className="absolute top-1/2 left-[15%] h-1 bg-[#9E003F] rounded-full transform -translate-y-1/2 transition-all duration-1000"
          style={{ width: `${progress * 0.7}%` }}
        />
      )}

      {/* Origin Pin */}
      <div className="absolute top-1/2 left-[15%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
        <div className="bg-[#9E003F] p-1.5 rounded-full border border-white shadow text-white">
          <MapPin className="h-3.5 w-3.5" />
        </div>
        <span className="bg-[#2B2325] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
          {source}
        </span>
      </div>

      {/* Destination Pin */}
      <div className="absolute top-1/2 right-[15%] transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
        <div className="bg-[#00677f] p-1.5 rounded-full border border-white shadow text-white">
          <MapPin className="h-3.5 w-3.5" />
        </div>
        <span className="bg-[#2B2325] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
          {destination}
        </span>
      </div>
    </div>
  );
}
