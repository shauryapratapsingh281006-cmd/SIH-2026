# Pixelway — Intelligent Disaster Response & Relocation Platform

## Smart India Hackathon 2026

**Team Name:** Pixel01  
**Solution Name:** Pixelway  
**Problem Statement:** Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations  
**Problem Statement ID:** `SIH26191`
**Team ID:** `155956`

---

## 1. Overview

**Pixelway** is an intelligent disaster-response and community-coordination platform designed to help identify vulnerable populations, assess disaster risk, coordinate rescue operations, and support the immediate relocation of affected people to safe locations.

The platform connects:

- Individuals
- NGOs & community responders
- GPS/location intelligence
- Weather and hazard information
- AI-powered assistance
- Relief centres and shelters
- Emergency response teams

The primary objective is to create a **single connected ecosystem** where disaster information can move quickly from detection to response and finally to safe relocation.

---

## 2. Problem Statement

During natural disasters, one of the major challenges is not only identifying the hazard but also determining:

- Which areas are vulnerable?
- How many people are at risk?
- Who needs immediate assistance?
- Where are affected individuals located?
- How many people need relocation?
- Which shelters have available capacity?
- Which NGO or response team can reach them?
- Where should rescued people be relocated?

Traditional disaster response can involve multiple disconnected sources of information, which can make coordination difficult during time-critical situations.

**Pixelway addresses this gap by creating a connected digital response layer between vulnerable individuals and response organizations.**

---

## 3. Proposed Solution

Pixelway follows a two-sided platform model.

```text
                    PIXELWAY
                       │
          ┌────────────┴────────────┐
          │                         │
     INDIVIDUAL              NGO / COMMUNITY
          │                         │
          ▼                         ▼
    Risk Information          Response Centre
    Weather                   People at Risk
    GPS Sharing               GPS Locations
    AI Assistant              Rescue Dispatch
    Community Chat            Shelter Capacity
          │                         │
          └────────────┬────────────┘
                       ▼
                SAFE RELOCATION
```

The system provides different interfaces depending on the user's role.

---

## 4. Individual Module

When a user logs in as an **Individual**, Pixelway provides a personal safety dashboard.

### Disaster Probability

The dashboard displays the estimated probability/risk of a disaster occurring within the monitored region and time window.

Example:

```text
Disaster Probability
        68%

Risk Level: ELEVATED
Time Horizon: 3 Hours
Confidence: 87%
```

### Weather Information

The individual can view:

- Current temperature
- Rain probability
- Wind speed
- Humidity
- Weather alerts

### GPS Location Sharing

The individual can activate GPS sharing when assistance is required.

```text
GPS OFF
   ↓
Turn On GPS
   ↓
Location Permission
   ↓
Live Location Sharing
   ↓
Authorized Responder
```

The browser's geolocation capability can be used to obtain the user's current coordinates.

### Emergency Actions

- Emergency call
- Open map
- GPS sharing
- Safety instructions
- Responder information

---

## 5. AI Emergency Assistant

Pixelway includes an AI assistant designed to provide emergency-oriented information.

Users can ask questions such as:

```text
What should I do during heavy flooding?

Where should I go?

How do I prepare for evacuation?

What should I carry during evacuation?
```

> **Important:** The AI assistant is intended as a support layer and should not replace official emergency authorities or emergency services.

---

## 6. Community Communication

Pixelway also provides a community communication interface.

Individuals can share useful information such as:

```text
"Road near the bridge is flooded."

"We are safe at the community hall."

"Is anyone near this location?"

"Water and food are available here."
```

This can help create a local information network during emergencies.

---

## 7. NGO / Community Response Module

When a user logs in as an **NGO / Community Response Organization**, Pixelway opens a dedicated Response Command Centre.

The dashboard provides:

- People requiring assistance
- Critical cases
- Active responders
- Shelter capacity
- Weather alerts
- Risk information
- Rescue requests
- Location information

---

## 8. People Requiring Assistance

NGOs can view a list of affected individuals.

Each case can contain:

```text
Case ID
Person
Location
Area
Assistance Required
Priority
Estimated Response Time
Coordinates
```

Example:

```text
PX-1042
Priya S.
Kothrud
Medical Assistance
CRITICAL
ETA: 7 minutes
```

---

## 9. Rescue Dispatch

An NGO can select a specific individual and view their information.

Available actions include:

- View location
- Dispatch rescue team
- Navigate to location
- Send emergency alert

Workflow:

```text
Identify Person
      ↓
Check Priority
      ↓
View Location
      ↓
Dispatch Team
      ↓
Navigate
      ↓
Rescue
      ↓
Relocate to Safe Site
```

---

## 10. Hazard-Based Red Zones

Pixelway supports identification of areas where the hazard level is elevated.

Potential inputs include:

- Weather data
- Satellite data
- Historical disaster information
- Geographic information
- Environmental conditions
- Population/vulnerability information
- Real-time reports

These inputs can contribute to a risk-analysis layer.

```text
LOW RISK
   ↓
MODERATE RISK
   ↓
HIGH RISK
   ↓
RED ZONE
```

---

## 11. Carrying Capacity Assessment

Pixelway considers the capacity of safe relocation locations.

For every shelter/relief centre, the platform can maintain:

```text
Shelter Name
Location
Total Capacity
Occupied Capacity
Available Capacity
Distance
Shelter Type
```

Example:

```text
Kothrud Community Hall

Total Capacity: 250
Occupied: 182
Available: 68
```

This helps responders determine whether a location can accommodate additional people.

---

## 12. Immediate Relocation

Pixelway connects rescue operations with shelter information.

```text
Hazard Detection
       ↓
Risk Analysis
       ↓
Vulnerable Population
       ↓
Location Identification
       ↓
Rescue Coordination
       ↓
Shelter Capacity Assessment
       ↓
Safe Relocation
```

---

## 13. System Architecture

```text
 ┌───────────────────────────────┐
 │        Data Sources           │
 │                               │
 │ Weather | Satellite | GPS     │
 │ Sensors | Reports | APIs      │
 └───────────────┬───────────────┘
                 │
                 ▼
 ┌───────────────────────────────┐
 │     Risk & Intelligence       │
 │          Engine               │
 │                               │
 │ Hazard Analysis               │
 │ Risk Assessment               │
 │ Red-Zone Identification       │
 └───────────────┬───────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
 ┌─────────────┐   ┌───────────────┐
 │ Individual  │   │ NGO / Response│
 │ Dashboard   │   │ Command Centre │
 └──────┬──────┘   └───────┬───────┘
        │                  │
        └────────┬─────────┘
                 ▼
       ┌─────────────────────┐
       │ Rescue & Relocation │
       │ Coordination        │
       └──────────┬──────────┘
                  ▼
          Safe Relief Centre
```

---

## 14. Technology Stack

### Frontend

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Lucide React Icons

### Browser Capabilities

- Geolocation API
- Responsive web interface
- Map/navigation integration

### Proposed Backend

The frontend is designed to connect to a backend containing:

- REST APIs
- Authentication
- User management
- Disaster/risk data
- GPS/location data
- NGO information
- Shelter information
- Rescue requests
- AI services

### Proposed Data Sources

- Weather APIs
- Satellite data
- Geographic data
- Government/open disaster datasets
- GPS/location data
- NGO-provided information
- AI/ML risk models

---

## 15. Current Prototype

The current prototype demonstrates:

- Original Pixelway landing page
- Individual login flow
- NGO/community login flow
- Individual safety dashboard
- NGO response dashboard
- Disaster probability interface
- Weather interface
- GPS sharing
- Emergency actions
- AI assistant prototype
- Community communication
- Rescue case management
- Responder interface
- Shelter capacity interface
- Navigation
- Dispatch interaction
- Emergency alert interaction

---

## 16. Prototype vs Production

The current frontend prototype uses demonstration data for several disaster-response values.

### Prototype

```text
Frontend
   ↓
Demo Data
   ↓
Interactive Dashboard
```

### Production

```text
Satellite / Weather / Sensors
             ↓
        Backend APIs
             ↓
      Risk Intelligence
             ↓
       Pixelway Platform
             ↓
 ┌───────────┴───────────┐
 ▼                       ▼
Individuals            NGOs
             ↓
       Rescue & Relocation
```

---

## 17. Installation

### Requirements

- Node.js
- npm
- Git

Verify:

```bash
node --version
npm --version
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open the local URL provided by Vite, generally:

```text
http://localhost:5173
```

---

## 18. User Flow

### Individual

```text
Landing Page
     ↓
Individual Login
     ↓
Safety Dashboard
     ↓
Risk & Weather
     ↓
GPS Sharing
     ↓
Emergency Assistance
     ↓
Responder Coordination
     ↓
Safe Relocation
```

### NGO / Community

```text
Landing Page
     ↓
NGO Login
     ↓
Response Command Centre
     ↓
View People at Risk
     ↓
Select Case
     ↓
View GPS Location
     ↓
Dispatch Team
     ↓
Navigate to Person
     ↓
Rescue
     ↓
Select Suitable Shelter
     ↓
Relocation
```

---

## 19. Future Scope

Future versions can include:

- Real-time satellite imagery
- ML-based disaster prediction
- Automated red-zone generation
- Population-density analysis
- Vulnerability scoring
- Real-time IoT sensor integration
- Government emergency system integration
- Advanced GIS maps
- Live NGO fleet tracking
- Ambulance integration
- Shelter optimization algorithms
- Multi-language AI assistant
- Voice-based emergency assistance
- Offline/PWA emergency mode
- SMS-based emergency alerts
- Automated evacuation recommendations
- Real-time capacity synchronization between shelters

---

## 20. Social Impact

Pixelway is designed around one fundamental principle:

> **Disaster response should not end with identifying the danger. It should continue until vulnerable people are connected with help and moved toward safety.**

The platform brings together:

**Risk → People → Location → Responders → Capacity → Relocation**

into one connected workflow.

---

## 21. Team

### Team Pixel01

**Project:** Pixelway  
**Event:** Smart India Hackathon 2026  
**Problem Statement:** Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations

---

# Pixelway

### **Predict. Locate. Respond. Relocate.**

> *Connecting people, intelligence, and response when every second matters.*

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

