import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaUniversity,
  FaBuilding,
  FaUtensils,
  FaLandmark,
  FaFlask,
  FaBed,
  FaMapMarkerAlt,
  FaMosque,
  FaStethoscope,
  FaFootballBall,
  FaWarehouse,
  FaBook,
} from "react-icons/fa";

const iconColors = {
  academic: "#1E40AF", // blue-800
  admin: "#6B7280", // gray-500
  food: "#EA580C", // orange-600
  auditorium: "#7C3AED", // purple-600
  recreation: "#16A34A", // green-600
  research: "#0D9488", // teal-600
  library: "#CA8A04", // yellow-700 (gold)
  workshop: "#7C2D12", // brown-800
  dormitory: "#B91C1C", // red-700
  bank: "#111827", // black-ish
  interest: "#DB2777", // pink-600
  mosque: "#166534", // green-700 (dark green)
  medical: "#7F1D1D", // red-900 (maroon)
};

const categoryIcons = {
  academic: <FaUniversity color="white" size={16} />,
  admin: <FaBuilding color="white" size={16} />,
  food: <FaUtensils color="white" size={16} />,
  auditorium: <FaLandmark color="white" size={16} />,
  recreation: <FaFootballBall color="white" size={16} />,
  research: <FaFlask color="white" size={16} />,
  library: <FaBook color="white" size={16} />,
  workshop: <FaWarehouse color="white" size={16} />,
  dormitory: <FaBed color="white" size={16} />,
  bank: <FaMapMarkerAlt color="white" size={16} />,
  interest: <FaLandmark color="white" size={16} />,
  mosque: <FaMosque color="white" size={16} />,
  medical: <FaStethoscope color="white" size={16} />,
};

function createDivIcon(color, iconSvg) {
  // Wrap the icon SVG string in a colored circle div.
  // We use a small container with inline SVG icon in white color.
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0 3px rgba(0,0,0,0.4);
        border: 2px solid white;
      ">
        ${iconSvg}
      </div>
    `,
    className: "", // Remove default leaflet styles
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

// Convert react-icons component to SVG string for embedding inside DivIcon
import { renderToStaticMarkup } from "react-dom/server";

const AccessibleMap = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredLocations = activeCategory
    ? locations.filter((loc) => loc.type === activeCategory)
    : locations;

  const uniqueCategories = [...new Set(locations.map((loc) => loc.type))];

  return (
    <div className="flex flex-col md:flex-row h-[85vh] w-full border rounded-xl shadow-md overflow-hidden">
      {/* Sidebar */}
      <aside
        className="md:w-1/4 w-full bg-white p-4 overflow-y-auto border-r focus:outline-none"
        aria-label="Campus Map Category Navigation"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filter by Category</h2>
        <nav className="space-y-2">
          {uniqueCategories.map((type) => (
            <button
              key={type}
              className={`flex items-center gap-2 px-3 py-2 rounded-md w-full text-left transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                activeCategory === type ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(type === activeCategory ? null : type)}
              aria-pressed={activeCategory === type}
            >
              <span className="text-lg">{categoryIcons[type]}</span>
              <span className="capitalize">{type}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Map */}
      <MapContainer
        center={[24.9194, 91.8316]}
        zoom={17}
        scrollWheelZoom
        className="flex-1 h-full z-0"
        aria-label="Interactive map of Shahjalal University of Science and Technology campus"
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((loc, index) => {
          const iconColor = iconColors[loc.type] || "#2563EB"; // fallback blue
          const iconComponent = categoryIcons[loc.type] || <FaMapMarkerAlt color="white" size={16} />;
          // Convert React icon to SVG string
          const iconSvg = renderToStaticMarkup(iconComponent);

          return (
            <Marker
              key={index}
              position={loc.coords}
              title={loc.name}
              icon={createDivIcon(iconColor, iconSvg)}
            >
              <Popup>
                <p className="font-semibold">{loc.name}</p>
                <p className="text-sm capitalize">Category: {loc.type}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

const locations = [
  { name: "Academic Building A", type: "academic", coords: [24.920199, 91.832611] },
  { name: "Academic Building A Extension", type: "academic", coords: [24.919988, 91.83281] },
  { name: "Academic Building B", type: "academic", coords: [24.921109, 91.83318] },
  { name: "Academic Building C", type: "academic", coords: [24.920953, 91.833612] },
  { name: "Academic Building D", type: "academic", coords: [24.920569, 91.831482] },
  { name: "Academic Building E", type: "academic", coords: [24.920278, 91.834229] },
  { name: "Dr. M Wazed Mia IICT Building", type: "academic", coords: [24.918113, 91.830817] },
  { name: "New Social Science Building", type: "academic", coords: [24.921262, 91.832016] },
  { name: "Central Library", type: "library", coords: [24.9199, 91.83171] },
  { name: "Sonali Bank", type: "bank", coords: [24.922403, 91.832633] },
  { name: "SUST Central Auditorium", type: "auditorium", coords: [24.924043, 91.832566] },
  { name: "Mini Auditorium", type: "auditorium", coords: [24.920467, 91.832947] },
  { name: "E building Tong", type: "food", coords: [24.920868, 91.834167] },
  { name: "Gifari", type: "food", coords: [24.918726, 91.832547] },
  { name: "Central Cafeteria", type: "food", coords: [24.920421, 91.83344] },
  { name: "Staff Canteen", type: "food", coords: [24.920584, 91.833132] },
  { name: "New Food Court", type: "food", coords: [24.919426, 91.832456] },
  { name: "Central Field", type: "recreation", coords: [24.923038, 91.835116] },
  { name: "SUST Basketball Field", type: "recreation", coords: [24.922894, 91.832955] },
  { name: "Handball Ground", type: "recreation", coords: [24.91991, 91.832255] },
  { name: "Girls' Handball Ground", type: "recreation", coords: [24.921654, 91.831249] },
  { name: "SUST Medical Center", type: "medical", coords: [24.92307, 91.833502] },
  { name: "Central Mosque", type: "mosque", coords: [24.917166, 91.831079] },
  { name: "Shah Paran Hall Mosque", type: "mosque", coords: [24.924681, 91.835747] },
  { name: "Shaheed Minar", type: "interest", coords: [24.923271, 91.831696] },
  { name: "Chetona '71", type: "interest", coords: [24.920632, 91.832501] },
  { name: "University Roundabout", type: "interest", coords: [24.91934, 91.831718] },
  { name: "Muktomoncho", type: "interest", coords: [24.919621, 91.832362] },
  { name: "Registrar Building", type: "admin", coords: [24.919131, 91.830964] },
  { name: "University Centre", type: "interest", coords: [24.922396, 91.832396] },
  { name: "Forestry Research Centre", type: "research", coords: [24.921063, 91.834596] },
  { name: "FET Tea Research", type: "research", coords: [24.926023, 91.83653] },
  { name: "FET Tea Lab", type: "research", coords: [24.92576, 91.835629] },
  { name: "Electrochemistry and Catalysis Research Lab", type: "research", coords: [24.921459, 91.832917] },
  { name: "Begum Fazilatunnesa Mujib Hall", type: "dormitory", coords: [24.923016, 91.830057] },
  { name: "Jahanara Imam Hall", type: "dormitory", coords: [24.921973, 91.830718] },
  { name: "Begum Sirajunnesa Chowdhury Hall", type: "dormitory", coords: [24.92215, 91.829224] },
  { name: "Bangabandhu Sheikh Mujibur Rahman Hall", type: "dormitory", coords: [24.924656, 91.837463] },
  { name: "Syed Mujtaba Ali Hall", type: "dormitory", coords: [24.926436, 91.835715] },
  { name: "Shahporan Hall", type: "dormitory", coords: [24.924738, 91.835082] },
  { name: "Sonali Bank Limited ATM", type: "bank", coords: [24.919555, 91.831045] },
  { name: "IPE Workshop", type: "workshop", coords: [24.922795, 91.832466] },
];

export default AccessibleMap;
