import { useState, useCallback, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { Navigation } from "lucide-react";
import { toast } from "sonner";

// Fix for default marker icon issues in Leaflet with build tools
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * Component to handle geocoding search
 */
function SearchField({ setPosition, onChange, placeholder }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: false, // We use our own LocationMarker
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: placeholder || "Enter address",
      keepResult: true,
      position: "topleft",
    });

    map.addControl(searchControl);

    const handleSearch = (result) => {
      const { location } = result;
      const newPos = { lat: location.y, lng: location.x };
      setPosition(newPos);
      if (onChange) onChange(newPos);
    };

    map.on("geosearch/showlocation", handleSearch);

    return () => {
      map.off("geosearch/showlocation", handleSearch);
      map.removeControl(searchControl);
    };
  }, [map, setPosition, onChange, placeholder]);

  return null;
}

/**
 * Custom control for Current Location
 */
function GeolocationButton({ setPosition, onChange }) {
  const map = useMap();

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.info("Accessing your location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(newPos);
        if (onChange) onChange(newPos);
        map.flyTo([newPos.lat, newPos.lng], 15);
        toast.success("Location found!");
      },
      (error) => {
        toast.error(`Error: ${error.message}`);
      }
    );
  }, [map, setPosition, onChange]);

  useEffect(() => {
    const control = L.control({ position: "topleft" });
    control.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
      const button = L.DomUtil.create("button", "locate-me-btn", div);
      button.title = "Locate Me";
      button.type = "button";
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`;
      
      L.DomEvent.disableClickPropagation(button);
      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.stopPropagation(e);
        handleLocateMe();
      });
      
      return div;
    };
    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, handleLocateMe]);

  return null;
}

/**
 * Component to handle map clicks and marker dragging
 */
function LocationMarker({ position, setPosition, mode, onChange }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      if (mode === "select") {
        const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(newPos);
        if (onChange) onChange(newPos);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = e.target;
        const newPos = marker.getLatLng();
        setPosition({ lat: newPos.lat, lng: newPos.lng });
        if (onChange) onChange({ lat: newPos.lat, lng: newPos.lng });
      },
    }),
    [setPosition, onChange],
  );

  if (!position.lat || !position.lng) return null;

  return (
    <Marker
      position={position}
      draggable={mode === "select"}
      eventHandlers={eventHandlers}
    />
  );
}

/**
 * Reusable Leaflet Map component
 * @param {object} props
 * @param {{lat: number, lng: number}} props.initialPosition
 * @param {'select'|'display'} props.mode
 * @param {function} props.onChange - Called when position changes (in select mode)
 * @param {string} props.className
 * @param {string} props.searchPlaceholder
 */
export default function LeafletMap({
  initialPosition,
  mode = "display",
  onChange,
  className = "h-[300px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm",
  searchPlaceholder,
}) {
  const [position, setPosition] = useState({
    lat: initialPosition?.lat || 30.0444, // Default to Cairo if not provided
    lng: initialPosition?.lng || 31.2357,
  });

  // Update internal state if initialPosition changes (e.g. from form input)
  useEffect(() => {
    if (
      initialPosition?.lat &&
      initialPosition?.lng &&
      (initialPosition.lat !== position.lat ||
        initialPosition.lng !== position.lng)
    ) {
      setPosition({ lat: initialPosition.lat, lng: initialPosition.lng });
    }
  }, [initialPosition]);

  const center = useMemo(() => {
    if (position.lat && position.lng) return [position.lat, position.lng];
    return [30.0444, 31.2357];
  }, [position]);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={mode === "select"}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mode === "select" && (
          <>
            <SearchField
              setPosition={setPosition}
              onChange={onChange}
              placeholder={searchPlaceholder}
            />
            <GeolocationButton setPosition={setPosition} onChange={onChange} />
          </>
        )}
        <LocationMarker
          position={position}
          setPosition={setPosition}
          mode={mode}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}
