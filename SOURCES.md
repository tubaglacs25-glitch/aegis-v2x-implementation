# Data sources

## Supplied reports

- `data/raw/national-2020-2024.csv`: annual all-India road crashes, fatalities, and injuries for 2020–2024. Used for dashboard national totals and trend.
- `data/raw/state-fatalities-2020-2024.csv`: state/UT fatality totals and year-over-year percentage for 2020–2024. Used for state ranking and reported change.
- `data/raw/cities-2023-2024.csv`: city crash, fatality, and injury comparisons for the report's 50 selected cities. Dashboard currently shows selected rows.

The attached excerpts identify the source as the Ministry of Road Transport and Highways (MoRTH) annual road-accident reporting. Preserve the supplied files as raw inputs; the UI uses a small curated subset pending a robust CSV ingestion pipeline. Values are reported totals, not live incident feeds or exposure-adjusted risk.

## External service

Nearby hospitals/clinics/doctors are queried from the public OpenStreetMap Overpass API at runtime (5 km search radius). Internet connectivity and service availability are required. Returned facilities are not verified for emergency intake, trauma capability, beds, staffing, or current operating status. Routing links open OpenStreetMap directions; no route-risk calculation is performed.

## Visualization

State risk marks in the Overview are an illustrative, state-level aggregate visualization, not geocoded crash locations. No crash coordinates were provided and none are fabricated.
