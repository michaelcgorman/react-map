import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Map from '../../src/components/Map';

export default function App() {
  return (
    <>
      <Map style={'https://demotiles.maplibre.org/style.json'} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
