# Pixelway SIH – Functional Integration

This build preserves the original Pixelway landing-page components and design.

## Flow
Original landing page -> Individual or NGO / Community -> login -> role dashboard -> Exit -> original landing page.

## Added
- Individual Safety Console: disaster probability, 3-hour outlook, weather, GPS sharing, nearby responders, emergency actions, AI assistant prototype, community chat.
- NGO Response Command Centre: people needing help, priorities, selected-person location, dispatch action, navigation, emergency alerts, shelter capacity/recommendations, weather/risk/routing intelligence.

## Important
The uploaded frontend does not include the satellite/ML/backend service, so dashboard data is local prototype data. The UI is structured so these values can later be replaced by API responses.

## Premium polish
The original landing page remains intact; the new authenticated dashboards receive a restrained premium glass/lighting layer through `src/index.css`.
