# Hardware integration plan

The dashboard's edge nodes are simulated. Before connecting real devices, define and validate:

1. **Device identity and trust:** per-device credentials, secure provisioning, rotation/revocation, signed firmware, secure boot, and audit trails.
2. **Transport:** authenticated TLS ingestion through a managed gateway; device telemetry must never be accepted directly from an unauthenticated browser.
3. **Telemetry schema:** versioned timestamps, device ID, coordinate accuracy, units, sensor provenance, calibration state, and explicit missing/invalid values.
4. **Safety controls:** sensor plausibility checks, conservative thresholds, hysteresis, offline behavior, human review for physical actions, and fail-safe operation independent of cloud connectivity.
5. **Privacy:** data minimization, retention limits, consent and legal review for location/video/audio, access controls, and documented incident handling.
6. **Resilience:** local buffering, duplicate/idempotent delivery, clock drift handling, observability, regional outages, and tested rollback procedures.
7. **Validation:** bench and controlled-road trials; independent safety review; accessibility and language review; false-positive/negative reporting before any alert is treated as operational.

No hardware protocol, vendor, connectivity, or roadside actuation is currently implemented or implied.
