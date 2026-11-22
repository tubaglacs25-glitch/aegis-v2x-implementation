# Limitations and safety

- This is a prototype, not a deployed or production-ready emergency response system.
- There is no authentication, authorization, durable database, or real-time multi-user event bus. Incident state is shared across sections within one page session and resets on reload.
- SOS countdown and incident creation are simulations. No authorities, hospitals, emergency contacts, or emergency services are notified.
- Vehicle nodes, sensor values, detections, visibility, speed recommendations, and authority actions are demo-only. No hardware, roadside infrastructure, or live traffic data is connected.
- No crash-detection ML model, false-positive evaluation, route engine, route hazard score, cause classification, or stopping-distance engine is implemented.
- State and city reports are aggregate tables, not GPS event records. The stylized India graphic is not a geospatial choropleth and must not be interpreted as precise regional boundaries or event locations.
- Hospital data comes from OpenStreetMap Overpass, which may be unavailable, incomplete, or rate-limited. Its records do not include confirmed emergency capacity or live acceptance; no capacity is estimated or invented.
- Device GPS is optional, accessed only after the user presses “Use my location,” and remains in page memory. On permission failure the UI retains a clearly identified New Delhi demo location.
- The interface includes an English/Hindi toggle, but translation coverage is partial. Some section-specific text remains English.
- Do not rely on this prototype for emergency decisions. In an emergency, contact local emergency services directly.
