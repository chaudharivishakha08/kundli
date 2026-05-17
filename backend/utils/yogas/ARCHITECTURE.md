/**
 * YOGA REGISTRY PATTERN - ARCHITECTURE DIAGRAM
 * 
 * Visual representation of how all components work together
 */

/*

═══════════════════════════════════════════════════════════════════════════════
                      SYSTEM ARCHITECTURE OVERVIEW
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                          Frontend (React)                                    │
│  Sends: { day, month, year, hour, min, lat, lon }                           │
└─────────────────────────────┬──────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                    getKundliChartData() Controller                           │
│  ├─ Calls Prokerala API for planet positions                                │
│  ├─ Calculates house placements                                             │
│  ├─ Calculates aspects                                                      │
│  └─ Calls calculateYogas(planets, houses) ◄─── YOGA CALCULATION             │
└──────────────────────┬─────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                     calculateYogas() Function                                │
│  Checks: Is YogaRegistry initialized?                                       │
│  ├─ If NO:  Call initializeYogaRegistry()                                   │
│  │           (Load all yoga classes, create instances, register)            │
│  └─ If YES: Skip initialization (already loaded)                            │
│                                                                              │
│  Then: Call yogaRegistry.calculateAllYogas(planets, houses)                │
└──────────────────────┬────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                    YogaRegistry.calculateAllYogas()                          │
│                                                                              │
│  Iterates through all registered yoga instances:                            │
│                                                                              │
│    FOR EACH yoga in this.yogas:                                            │
│      result = yoga.calculateYoga(planets, houses)                           │
│      IF result is found:                                                    │
│        foundYogas.push(result)                                              │
│                                                                              │
│  RETURN foundYogas array                                                    │
└──────────────────────┬────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┬──────────────┐
        │              │              │              │              │
        ▼              ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ SaturnThird  │ │ SaturnNinth  │ │ RahuFirst    │ │JupiterFirst  │ │ VenusSeventh │
│ Yoga         │ │ Yoga         │ │ Yoga         │ │ Yoga         │ │ Yoga         │
│              │ │              │ │              │ │              │ │              │
│calculateYoga │ │calculateYoga │ │calculateYoga │ │calculateYoga │ │calculateYoga │
│(planets,     │ │(planets,     │ │(planets,     │ │(planets,     │ │(planets,     │
│ houses)      │ │ houses)      │ │ houses)      │ │ houses)      │ │ houses)      │
│              │ │              │ │              │ │              │ │              │
│Checks:       │ │Checks:       │ │Checks:       │ │Checks:       │ │Checks:       │
│Saturn in     │ │Saturn in     │ │Rahu in       │ │Jupiter in    │ │Venus in      │
│3rd house     │ │9th house     │ │1st house     │ │1st house     │ │7th house     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │                │
       └────────────────┼────────────────┼────────────────┼────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
    Found Yoga 1   Found Yoga 2   (More if present)
    
    {                {
      id: 1,         id: 2,
      name: "...",   name: "...",
      planet: 7,     planet: 7,
      house: 3,      house: 9,
      effect_en: "", effect_en: "",
      ...            ...
    }                }


═══════════════════════════════════════════════════════════════════════════════
                     CLASS INHERITANCE STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

                        ┌─────────────┐
                        │  BaseYoga   │
                        │  (Abstract) │
                        └──────┬──────┘
                               │ extends
         ┌─────────────────────┼─────────────────────┬──────────────┐
         │                     │                     │              │
         ▼                     ▼                     ▼              ▼
    ┌─────────────┐   ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
    │SaturnThirdY │   │SaturnNinthY │   │RahuFirstYoga │   │JupiterFirstY │
    │oga          │   │oga          │   │              │   │oga           │
    │             │   │             │   │              │   │              │
    │constructor()│   │constructor()│   │constructor() │   │constructor() │
    │calculateYog │   │calculateYog │   │calculateYoga │   │calculateYoga │
    │a()          │   │a()          │   │()            │   │()            │
    └─────────────┘   └─────────────┘   └──────────────┘   └──────────────┘
                                                                    │
                                                                    ▼
                                                         ┌──────────────────┐
                                                         │VenusSeventhYoga  │
                                                         │                  │
                                                         │constructor()     │
                                                         │calculateYoga()   │
                                                         └──────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                         REGISTRY PATTERN FLOW
═══════════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────────────┐
│                        YogaRegistry (Singleton)                              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────┐         │
│  │ private yogas: Map<id, yogaInstance>                           │         │
│  │ {                                                              │         │
│  │   1 → SaturnThirdYoga instance                                │         │
│  │   2 → SaturnNinthYoga instance                                │         │
│  │   3 → RahuFirstYoga instance                                  │         │
│  │   4 → JupiterFirstYoga instance                               │         │
│  │   5 → VenusSeventhYoga instance                               │         │
│  │ }                                                              │         │
│  └────────────────────────────────────────────────────────────────┘         │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────┐         │
│  │ PUBLIC METHODS:                                                │         │
│  │                                                                │         │
│  │ ✓ register(yogaInstance)                                      │         │
│  │   └─ Adds single yoga to registry                             │         │
│  │                                                                │         │
│  │ ✓ registerMultiple(yogaInstances[])                           │         │
│  │   └─ Adds multiple yogas to registry                          │         │
│  │                                                                │         │
│  │ ✓ calculateAllYogas(planets, houses)                          │         │
│  │   └─ Runs calculateYoga() on all registered yogas             │         │
│  │   └─ Returns array of found yogas                             │         │
│  │                                                                │         │
│  │ ✓ getYoga(id)                                                 │         │
│  │   └─ Get specific yoga by ID                                  │         │
│  │                                                                │         │
│  │ ✓ getAllYogas()                                               │         │
│  │   └─ Get all registered yoga instances                        │         │
│  │                                                                │         │
│  │ ✓ getCount()                                                  │         │
│  │   └─ Get number of registered yogas                           │         │
│  │                                                                │         │
│  │ ✓ getInfo()                                                   │         │
│  │   └─ Get registry information for debugging                   │         │
│  │                                                                │         │
│  │ ✓ unregister(id)                                              │         │
│  │   └─ Remove yoga from registry                                │         │
│  │                                                                │         │
│  │ ✓ clear()                                                     │         │
│  │   └─ Remove all yogas from registry                           │         │
│  └────────────────────────────────────────────────────────────────┘         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                      DATA FLOW: REQUEST TO RESPONSE
═══════════════════════════════════════════════════════════════════════════════

Client Request
    │
    ├─ POST /api/kundli
    │  {
    │    day: 15, month: 6, year: 1990,
    │    hour: 10, min: 30,
    │    lat: 19.076, lon: 72.877
    │  }
    │
    ▼
getKundliChartData() Controller
    │
    ├─ Get Planet Data from Prokerala API
    │  {
    │    planet_position: [
    │      { id: 7, name: "Saturn", rasi: { id: 1 }, ... },
    │      { id: 4, name: "Venus", rasi: { id: 7 }, ... },
    │      ...
    │    ]
    │  }
    │
    ├─ Calculate Houses
    │  [
    │    { house: 1, planet_id: 1, planet_name: "Sun", ... },
    │    { house: 2, planet_id: 2, planet_name: "Moon", ... },
    │    { house: 3, planet_id: 7, planet_name: "Saturn", ... },  ◄─ Saturn in 3rd!
    │    ...
    │  ]
    │
    ├─ Call calculateYogas(planets, houses)
    │    │
    │    ├─ Check if registry empty?
    │    │  YES → Initialize registry with all yoga classes
    │    │
    │    └─ Call yogaRegistry.calculateAllYogas(planets, houses)
    │        │
    │        ├─ SaturnThirdYoga.calculateYoga()
    │        │  └─ Finds Saturn in 3rd house → MATCH! ✓
    │        │     Returns: { id: 1, name: "...", house: 3, ... }
    │        │
    │        ├─ SaturnNinthYoga.calculateYoga()
    │        │  └─ Looks for Saturn in 9th → Not found
    │        │     Returns: null
    │        │
    │        ├─ RahuFirstYoga.calculateYoga()
    │        │  └─ Looks for Rahu in 1st → Not found
    │        │     Returns: null
    │        │
    │        ├─ JupiterFirstYoga.calculateYoga()
    │        │  └─ Looks for Jupiter in 1st → Not found
    │        │     Returns: null
    │        │
    │        └─ VenusSeventhYoga.calculateYoga()
    │           └─ Looks for Venus in 7th → MATCH! ✓
    │              Returns: { id: 5, name: "...", house: 7, ... }
    │
    │    Returns: [
    │      { id: 1, name: "Saturn in 3rd House Yoga", ... },
    │      { id: 5, name: "Venus in 7th House Yoga", ... }
    │    ]
    │
    ▼
HTTP Response 200
    │
    └─ {
         "success": true,
         "data": {
           "planets": [...],
           "houses": [...],
           "aspects": [...],
           "yogas": [
             {
               "id": 1,
               "name": "Saturn in 3rd House Yoga",
               "description": "Saturn in 3rd house...",
               "planet": "Saturn",
               "planet_id": 7,
               "house": 3,
               "effect_en": "Success comes after challenges",
               "effect_mr": "शनी पराक्रमात असल्यामुळे...",
               "found": true
             },
             {
               "id": 5,
               "name": "Venus in 7th House Yoga",
               "description": "Venus in 7th house...",
               "planet": "Venus",
               "planet_id": 4,
               "house": 7,
               "effect_en": "Blessed with marital happiness",
               "effect_mr": "विवाह सुख प्रदान करते",
               "found": true
             }
           ],
           "exaltation_debilitation": [...]
         }
       }
    │
    ▼
Frontend receives complete Kundli data with all yogas

═══════════════════════════════════════════════════════════════════════════════

This architecture ensures:
✓ Clean separation of concerns
✓ Easy to add new yogas
✓ Easy to test individual yogas
✓ Easy to debug issues
✓ Scalable to many yogas
✓ Follows SOLID principles

*/
