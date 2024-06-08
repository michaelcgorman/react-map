import React from 'react';
import { type MapOptions as MapLibreMapOptions, type StyleSpecification, Map as MaplibreMap } from 'maplibre-gl';

const mapFactory = (container: string | HTMLElement, style: string | StyleSpecification) => {
  if (container && style) {
    return new MaplibreMap({ container, style });
  } else {
    return MaplibreMap.prototype;
  }
};

const MapContext = React.createContext<MaplibreMap>(mapFactory('', ''));

type MapOptions = Omit<MapLibreMapOptions, 'container'> & {
  id?: string;
  children?: React.ReactNode;
}

const Map = ({ children, id, style }: MapOptions) => {
  const autoId = React.useId();
  const actualId = React.useMemo(() => id ?? autoId, [id, autoId]);
  const containerRef = React.useRef(null);

  const [mapObj, setMapObj] = React.useState<MaplibreMap | null>(null);

  React.useEffect(() => {
    setMapObj(new MaplibreMap({ container: actualId, style }));
  }, [actualId, style]);

  return (
    <div id={actualId} style={{ height: '100%' }} ref={containerRef}>
      {mapObj && <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>}
    </div>
  );
};

export default Map;
