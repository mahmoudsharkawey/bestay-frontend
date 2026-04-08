# 🏠 Smart Unit Recommendations — Frontend Integration Guide

## API Endpoint

```
GET /api/v1/recommendations
```

| Property | Value |
|---|---|
| **Auth** | Required — `Authorization: <JWT>` |
| **Role** | `USER` only |
| **Prerequisite** | User must have preferences set via `POST /api/v1/user-preferences` |

---

## Request

No body or query params needed. The backend reads the authenticated user's saved preferences automatically.

```js
// Example: service layer
const getRecommendations = async () => {
  const response = await api.get("/recommendations");
  return response.data;
};
```

---

## Response Shape

```ts
// TypeScript interface for reference
interface RecommendationResponse {
  success: string;
  statusCode: number;
  message: string;
  data: {
    total: number;
    recommendations: RecommendedUnit[];
  };
}

interface RecommendedUnit {
  // — Standard unit fields —
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  rooms: number;
  furnished: boolean;
  university: string | null;
  distance: number | null;       // km from university
  roomType: "SINGLE" | "DOUBLE" | "SHARED";
  genderType: "MALE_ONLY" | "FEMALE_ONLY";
  facilities: string[];
  images: string[];
  averageRating: number;
  status: "ACTIVE";
  createdAt: string;             // ISO date

  // — Owner info —
  owner: {
    id: string;
    name: string;
    picture: string | null;
  };

  // — Counts —
  _count: {
    favorites: number;
    bookings: number;
    reviews: number;
  };

  // — AI fields (new) —
  matchScore: number;            // 0–100, pre-sorted descending
  scoreBreakdown: {
    price: number;               // 0–100
    location: number;            // 0–100
    facilities: number;          // 0–100
    reviews: number;             // 0–100
    popularity: number;          // 0–100
  };
  aiReason: string | null;       // Gemini explanation (may be null)
}
```

---

## Example Response

```json
{
  "success": "true",
  "statusCode": 200,
  "message": "Recommendations retrieved successfully",
  "data": {
    "total": 3,
    "recommendations": [
      {
        "id": "a1b2c3d4",
        "title": "Modern Studio near AUC",
        "price": 3000,
        "city": "Cairo",
        "rooms": 2,
        "furnished": true,
        "facilities": ["wifi", "parking", "gym"],
        "images": ["https://res.cloudinary.com/..."],
        "averageRating": 4.5,
        "owner": { "id": "x1", "name": "Ahmed", "picture": "https://..." },
        "_count": { "favorites": 12, "bookings": 3, "reviews": 8 },

        "matchScore": 92.3,
        "scoreBreakdown": {
          "price": 100,
          "location": 98,
          "facilities": 100,
          "reviews": 90,
          "popularity": 52.3
        },
        "aiReason": "Perfect fit — within your budget, 1km from AUC, and has all requested facilities."
      },
      {
        "id": "e5f6g7h8",
        "title": "Cozy Room in Maadi",
        "price": 2800,
        "matchScore": 74.1,
        "scoreBreakdown": { "price": 85, "location": 50, "facilities": 75, "reviews": 80, "popularity": 40 },
        "aiReason": "Good price but further from your university. Missing parking."
      }
    ]
  }
}
```

---

## Error Responses

| Status | Condition | Message |
|---|---|---|
| `401` | No/invalid JWT | `"No token provided"` |
| `403` | Not a USER role | `"Forbidden: Insufficient role"` |
| `404` | User has no preferences | `"Please set your preferences first before getting recommendations"` |

---

## UI Implementation Guide

### 1. Hook: `useRecommendations`

```js
import { useState, useEffect } from "react";
import { recommendationService } from "@/services/recommendationService";

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await recommendationService.getRecommendations();
      setRecommendations(res.data.data.recommendations);
      setTotal(res.data.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchRecommendations(); }, []);

  return { recommendations, total, isLoading, error, refetch: fetchRecommendations };
};
```

### 2. Service: `recommendationService`

```js
import api from "@/lib/api"; // your axios instance

export const recommendationService = {
  getRecommendations: () => api.get("/recommendations"),
};
```

### 3. UI Components Needed

#### Match Score Badge
```
┌──────────────┐
│  92% Match   │  ← Green for >80, Yellow for 50-80, Gray for <50
└──────────────┘
```

#### Score Breakdown (expandable)
```
Price       ██████████████████░░  95%
Location    ████████████████████  100%
Facilities  ████████████████░░░░  80%
Reviews     ██████████████████░░  90%
Popularity  ██████████░░░░░░░░░░  52%
```

#### AI Reason Card
```
┌─ 🤖 Why this matches ──────────────────────┐
│ Perfect fit — within your budget, 1km from  │
│ AUC, and has all requested facilities.      │
└─────────────────────────────────────────────┘
```

### 4. Handling Edge Cases

| Case | What to show |
|---|---|
| `total === 0` | Empty state: "No matches found. Try adjusting your preferences." with link to preferences page |
| `aiReason === null` | Hide the AI reason card, show only the score |
| `404` error | Prompt: "Set your preferences first" with CTA to preferences page |
| Loading | Skeleton cards (same shape as unit cards) |

### 5. Color Coding for `matchScore`

```js
const getScoreColor = (score) => {
  if (score >= 80) return "text-green-500";   // Excellent match
  if (score >= 60) return "text-yellow-500";  // Good match
  if (score >= 40) return "text-orange-500";  // Fair match
  return "text-gray-400";                     // Weak match
};

const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Fair Match";
  return "Weak Match";
};
```

### 6. Recommended Page Flow

```
User opens "For You" / "Recommendations" page
  │
  ├─ Has preferences? ──── No ──→ Show "Set Preferences" CTA
  │
  └─ Yes ──→ Fetch GET /recommendations
               │
               ├─ Loading ──→ Skeleton cards
               │
               ├─ Results ──→ Unit cards sorted by matchScore
               │               Each card shows:
               │               • Unit image, title, price
               │               • Match score badge (92% Match)
               │               • AI reason (if available)
               │               • Click → Unit detail page
               │
               └─ Empty ──→ "No matches. Adjust preferences?"
```
