# AEGIS·V2X

**Track:** Open Innovation

## A Clear Problem in Our Community
Road accidents are a severe and **real problem** we see in our **community** every day. We needed a **clear problem** to tackle, and the lack of a connected accident response ecosystem is exactly that.

## A Working Solution Using Technology
AEGIS-V2X is our **working solution** to **solve it with technology**. We approached this with **creativity** by building an intelligent, data-driven road safety ecosystem. 

It is a bilingual-ready road-safety intelligence prototype for Indian roads. The current build combines supplied Ministry of Road Transport and Highways (MoRTH) report extracts with clearly labelled demo workflows. It is not an emergency service and does not contact responders.

## Run locally

Install dependencies with `pnpm install`, then run `pnpm dev` and open the local URL shown by Next.js. No API key is required for the dashboard. Nearby-facility discovery uses the public OpenStreetMap Overpass API and requires internet access.

## Demo flow

1. Open Overview and review national and state report summaries.
2. Select Driver and start the demo SOS countdown; cancel it or let it create a simulated incident.
3. Select Authority to see the same in-session event.
4. Select Hospitals and run the live OpenStreetMap facility search. The initial coordinate is explicitly a New Delhi demo location; device GPS is optional.
5. Select Analytics to inspect state and city extracts and data limitations.

All emergency alerts, vehicle nodes, speed/visibility readings, authority actions, and incident statuses are simulated. Hospital discovery lists only named facilities returned by Overpass; capacity and availability are not supplied.

## Current scope

This is an interactive prototype, not the complete production system described in the originating brief. Authentication, durable multi-user event storage, live vehicle/road feeds, crash-detection models, routing/risk overlays, dispatch integrations, audio guidance, and hardware connectivity are not implemented. Demo state is in-memory and resets on reload. See [LIMITATIONS.md](./LIMITATIONS.md), [SOURCES.md](./SOURCES.md), [HARDWARE_PLAN.md](./HARDWARE_PLAN.md), and [DEMO_SCRIPT.md](./DEMO_SCRIPT.md).
