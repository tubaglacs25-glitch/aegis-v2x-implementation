'use client'

import { useMemo } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import worldAtlas from 'world-atlas/countries-110m.json'

const locations = [
  { name: 'Delhi', coordinates: [77.209, 28.614] as [number, number], tone: 'bronze' },
  { name: 'Mumbai', coordinates: [72.878, 19.076] as [number, number], tone: 'red' },
  { name: 'Bengaluru', coordinates: [77.594, 12.972] as [number, number], tone: 'amber' },
  { name: 'Kolkata', coordinates: [88.364, 22.573] as [number, number], tone: 'red' },
  { name: 'Chennai', coordinates: [80.271, 13.083] as [number, number], tone: 'bronze' },
]

export function IndiaNetworkMap({ mode }: { mode: 'network' | 'ecosystem' | 'response' }) {
  const map = useMemo(() => {
    const topology = worldAtlas as unknown as Topology
    const countries = feature(
      topology,
      topology.objects.countries as GeometryCollection,
    ) as unknown as GeoJSON.FeatureCollection
    const india = countries.features.find((country) => String(country.id) === '356')
    const projection = geoMercator().center([80, 21]).scale(390).translate([160, 128])
    const path = geoPath(projection)
    return {
      boundary: india ? path(india) : null,
      point: (coordinates: [number, number]) => projection(coordinates),
      route: (coordinates: [number, number][]) => path({ type: 'LineString', coordinates }),
    }
  }, [])

  return (
    <div className={`india-map india-map-${mode}`} aria-hidden="true">
      <svg viewBox="0 0 320 250" role="presentation">
        <defs>
          <radialGradient id={`heat-${mode}`}><stop stopColor="#d94a42" stopOpacity=".48"/><stop offset="1" stopColor="#d94a42" stopOpacity="0"/></radialGradient>
        </defs>
        {map.boundary && <path className="india-map-boundary" d={map.boundary} />}
        <path className="india-route" d={map.route([[72.878, 19.076], [77.209, 28.614], [80.271, 13.083], [88.364, 22.573]]) ?? ''} />
        <path className="india-route india-route-secondary" d={map.route([[72.878, 19.076], [77.594, 12.972], [88.364, 22.573]]) ?? ''} />
        {locations.map((location, index) => {
          const point = map.point(location.coordinates)
          if (!point) return null
          const [x, y] = point
          return (
            <g key={location.name} className={`india-map-point point-${location.tone}`}>
              <circle cx={x} cy={y} r={index === 1 || index === 3 ? 16 : 11} fill={`url(#heat-${mode})`} />
              <circle className="india-map-pulse" cx={x} cy={y} r="3" />
              <circle cx={x} cy={y} r="1" fill="#f4e3c8" />
            </g>
          )
        })}
      </svg>
      <span className="india-map-caption">{mode === 'response' ? 'SIMULATED GPS RESPONSE' : 'INDIA ROAD NETWORK'}</span>
    </div>
  )
}
