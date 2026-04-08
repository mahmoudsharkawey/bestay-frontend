# 💰 Pricing Suggestions — Frontend Integration Guide

## API Endpoints

| # | Method | URL | Role | Purpose |
|---|---|---|---|---|
| 1 | `POST` | `/api/v1/pricing/suggest` | `LANDLORD` | Pricing analysis for a **hypothetical** unit |
| 2 | `GET` | `/api/v1/pricing/unit/:unitId` | `LANDLORD` | Pricing analysis for an **existing** unit |

Both require `Authorization: <JWT>` header.

---

## Endpoint 1: `POST /api/v1/pricing/suggest`

Use when the landlord is exploring pricing **before creating** a unit, or comparing hypothetical scenarios.

### Request Body

```ts
interface PricingSuggestRequest {
  city: string;              // required
  rooms: number;             // required — positive integer
  roomType: "SINGLE" | "DOUBLE" | "SHARED";    // required
  genderType: "MALE_ONLY" | "FEMALE_ONLY";     // required
  furnished?: boolean;       // optional
  facilities?: string[];     // optional — e.g. ["wifi", "parking"]
  price?: number;            // optional — landlord's current/planned price
  university?: string;       // optional
}
```

### Example Request

```js
await api.post("/pricing/suggest", {
  city: "Cairo",
  rooms: 2,
  roomType: "SINGLE",
  genderType: "MALE_ONLY",
  furnished: true,
  facilities: ["wifi", "parking"],
  price: 3000,
  university: "AUC"
});
```

---

## Endpoint 2: `GET /api/v1/pricing/unit/:unitId`

Use when the landlord wants pricing analysis for a **unit they already own**. No body needed — all data is pulled from the existing unit.

```js
await api.get(`/pricing/unit/${unitId}`);
```

> The unit **must** belong to the authenticated landlord (403 otherwise).

---

## Response Shape (Both Endpoints)

```ts
interface PricingResponse {
  success: string;
  statusCode: number;
  message: string;
  data: PricingSuggestion;
}

interface PricingSuggestion {
  unitSummary: {
    city: string;
    rooms: number;
    roomType: string;
    genderType: string;
    furnished: boolean;
    facilities: string[];
    price: number | "not set";
    university: string | "not specified";
  };

  marketAnalysis: {
    comparableCount: number;  // how many similar units were found
    averagePrice: number;
    medianPrice: number;
    minPrice: number;
    maxPrice: number;
    percentile25: number;     // 25th percentile (budget range floor)
    percentile75: number;     // 75th percentile (budget range ceiling)
  } | null;                   // null when no comparables found

  pricePosition:
    | "BELOW_MARKET"          // price < 25th percentile
    | "COMPETITIVE"           // 25th ≤ price ≤ 75th percentile
    | "ABOVE_MARKET"          // 75th < price ≤ max
    | "PREMIUM"               // price > max of all comparables
    | "NO_DATA"               // no comparable units exist
    | "NOT_PROVIDED";         // landlord didn't provide a price

  suggestedRange: {
    min: number;              // 25th percentile (rounded)
    max: number;              // 75th percentile (rounded)
  } | null;                   // null when no comparables

  aiInsight: string | null;   // Gemini-powered advice (null if AI unavailable)
}
```

---

## Example Response

```json
{
  "success": "true",
  "statusCode": 200,
  "message": "Pricing suggestion generated successfully",
  "data": {
    "unitSummary": {
      "city": "Cairo",
      "rooms": 2,
      "roomType": "SINGLE",
      "genderType": "MALE_ONLY",
      "furnished": true,
      "facilities": ["wifi", "parking"],
      "price": 3000,
      "university": "AUC"
    },
    "marketAnalysis": {
      "comparableCount": 15,
      "averagePrice": 3200,
      "medianPrice": 3100,
      "minPrice": 2000,
      "maxPrice": 5500,
      "percentile25": 2600,
      "percentile75": 3800
    },
    "pricePosition": "COMPETITIVE",
    "suggestedRange": { "min": 2600, "max": 3800 },
    "aiInsight": "Your unit is priced competitively. Adding gym access could justify a 10-15% increase to ~3450."
  }
}
```

### No Comparables Response

```json
{
  "data": {
    "unitSummary": { ... },
    "marketAnalysis": null,
    "pricePosition": "NO_DATA",
    "suggestedRange": null,
    "aiInsight": "No comparable units found in this area. Consider researching local rental prices manually."
  }
}
```

---

## Error Responses

| Status | Condition | Message |
|---|---|---|
| `401` | No/invalid JWT | `"No token provided"` |
| `403` | Not LANDLORD role | `"Forbidden: Insufficient role"` |
| `403` | Unit not owned by user | `"You can only get pricing suggestions for your own units"` |
| `404` | Unit not found | `"Unit not found"` |
| `400` | Validation error | `"Validation failed: city: City is required"` |

---

## UI Implementation Guide

### 1. Service: `pricingService`

```js
import api from "@/lib/api";

export const pricingService = {
  // Hypothetical pricing analysis
  getSuggestion: (data) => api.post("/pricing/suggest", data),

  // Existing unit analysis
  getUnitPricing: (unitId) => api.get(`/pricing/unit/${unitId}`),
};
```

### 2. Hook: `usePricingSuggestion`

```js
import { useState } from "react";
import { pricingService } from "@/services/pricingService";

export const usePricingSuggestion = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSuggestion = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await pricingService.getSuggestion(data);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get pricing suggestion");
    } finally {
      setIsLoading(false);
    }
  };

  const getUnitPricing = async (unitId) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await pricingService.getUnitPricing(unitId);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get pricing data");
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, getSuggestion, getUnitPricing };
};
```

### 3. UI Components

#### A. Price Position Badge

```
 ┌──────────────────┐
 │  ✅ COMPETITIVE  │   ← Green
 └──────────────────┘

 ┌──────────────────┐
 │  ⬇ BELOW MARKET  │   ← Blue (opportunity to increase!)
 └──────────────────┘

 ┌──────────────────┐
 │  ⬆ ABOVE MARKET  │   ← Orange (may need to lower)
 └──────────────────┘

 ┌──────────────────┐
 │  👑 PREMIUM      │   ← Purple (significantly above market)
 └──────────────────┘
```

```js
const positionConfig = {
  COMPETITIVE:  { label: "Competitive",  color: "text-green-500",  icon: "✅", desc: "Well-priced for your area" },
  BELOW_MARKET: { label: "Below Market", color: "text-blue-500",   icon: "⬇",  desc: "You could charge more" },
  ABOVE_MARKET: { label: "Above Market", color: "text-orange-500", icon: "⬆",  desc: "Consider lowering or adding amenities" },
  PREMIUM:      { label: "Premium",      color: "text-purple-500", icon: "👑", desc: "Significantly above comparable units" },
  NO_DATA:      { label: "No Data",      color: "text-gray-400",   icon: "❓", desc: "No comparable units found" },
  NOT_PROVIDED: { label: "Set a Price",  color: "text-gray-400",   icon: "💡", desc: "Add a price to see your market position" },
};
```

#### B. Market Range Chart

```
  Min     P25    Median    P75     Max
   |───────|───────|────────|───────|
  2000    2600   3100     3800    5500
                    ▲
               Your price: 3000
            ─── Suggested Range ───
               2600 — 3800
```

A horizontal bar/range chart showing the market distribution with the landlord's price marked.

#### C. AI Insight Card

```
┌─ 🤖 AI Pricing Advice ──────────────────────────┐
│ Your unit is priced competitively. Adding gym     │
│ access could justify a 10-15% increase to ~3450. │
└──────────────────────────────────────────────────┘
```

#### D. Stats Grid

```
┌──────────────┬──────────────┬──────────────┐
│  15 units    │  Avg: 3,200  │  Med: 3,100  │
│  compared    │     EGP      │     EGP      │
├──────────────┼──────────────┼──────────────┤
│  Min: 2,000  │  Max: 5,500  │  You: 3,000  │
│     EGP      │     EGP      │     EGP      │
└──────────────┴──────────────┴──────────────┘
```

### 4. Handling Edge Cases

| Case | What to show |
|---|---|
| `marketAnalysis === null` | "No comparable units in this area" empty state |
| `pricePosition === "NOT_PROVIDED"` | Prompt: "Enter your planned price to see market position" |
| `aiInsight === null` | Hide AI card, show stats only |
| `suggestedRange === null` | Hide suggested range section |
| Loading | Skeleton with pulse animation |

### 5. Where to Use These Endpoints

| Context | Endpoint to use |
|---|---|
| **"My Units" page** — "Get Pricing Insight" button per unit | `GET /pricing/unit/:unitId` |
| **Create Unit form** — "Check Market Price" before publishing | `POST /pricing/suggest` (from form fields) |
| **Edit Unit page** — Show market comparison in sidebar | `GET /pricing/unit/:unitId` |
| **Dedicated Pricing Tool page** — Explore "what if" scenarios | `POST /pricing/suggest` (manual form) |

### 6. Page Flow

```
Landlord opens "Pricing Tool" or clicks "Get Pricing Insight"
  │
  ├─ From existing unit ─→ GET /pricing/unit/:id
  │                          │
  └─ From form/explorer ──→ POST /pricing/suggest
                             │
                   ┌─────────┴──────────┐
                   │  Loading spinner   │
                   └─────────┬──────────┘
                             │
              ┌──────────────┴──────────────────┐
              │                                 │
         Has data                          No comparables
              │                                 │
   ┌──────────┴──────────────┐         "No comparable units
   │  • Position badge       │          found. Try a different
   │  • Market range chart   │          city or room type."
   │  • Stats grid           │
   │  • Suggested range      │
   │  • AI insight card      │
   └─────────────────────────┘
```
