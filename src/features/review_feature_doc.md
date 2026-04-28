# 📝 Reviews Feature — Frontend Integration Guide

Complete documentation for the **Reviews** feature, covering backend API, frontend services, hooks, and components.

---

## 1. Backend API Endpoints

All endpoints are prefixed with your API base URL (e.g., `/api/v1`).

### Public / Authenticated

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/reviews/unit/:unitId` | ✅ Required | Any | Get all reviews for a unit |
| `GET` | `/reviews/:id` | ✅ Required | Any | Get a single review by ID |

### User-Only

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/reviews/unit/:unitId` | ✅ Required | `USER` | Create a review for a unit |
| `PUT` | `/reviews/:id` | ✅ Required | `USER` | Update own review |
| `DELETE` | `/reviews/:id` | ✅ Required | `USER` | Delete own review |

---

## 2. Request / Response Schemas

### `POST /reviews/unit/:unitId` — Create Review

**Request Body:**
```json
{
  "rating": 4,           // Required. Integer 1-5
  "comment": "Great place, very clean!"  // Optional. Max 1000 chars
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "unitId": "uuid",
    "rating": 4,
    "comment": "Great place, very clean!",
    "createdAt": "2026-04-28T12:00:00.000Z"
  }
}
```

**Error Responses:**
| Code | Reason |
|------|--------|
| `400` | Missing or invalid `rating` (must be 1-5) |
| `400` | Comment exceeds 1000 characters |
| `403` | Not a `USER` role |
| `404` | Unit not found |
| `409` | User already reviewed this unit |

---

### `PUT /reviews/:id` — Update Review

**Request Body (all fields optional):**
```json
{
  "rating": 5,
  "comment": "Updated: Even better than expected!"
}
```

> [!IMPORTANT]
> `userId` is **NOT** sent in the body. The server uses the JWT token to identify the user. Only the review owner can update.

**Response (200):**
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": { /* updated review object */ }
}
```

---

### `DELETE /reviews/:id` — Delete Review

**Response (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": { /* deleted review object */ }
}
```

---

### `GET /reviews/unit/:unitId` — Get Unit Reviews

**Response (200):**
```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "unitId": "uuid",
      "rating": 4,
      "comment": "Great place!",
      "createdAt": "2026-04-28T12:00:00.000Z",
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "picture": "https://..."
      }
    }
  ]
}
```

---

## 3. Frontend API Service

**File:** `src/features/reviews/services/reviews.api.js`

```js
import { apiClient } from "@/shared/lib/axios";

export const reviewsService = {
  /** Get all reviews for a unit */
  getUnitReviews: (unitId) =>
    apiClient.get(`/reviews/unit/${unitId}`).then((r) => r.data),

  /** Submit a new review for a unit */
  createReview: ({ unitId, rating, comment }) =>
    apiClient
      .post(`/reviews/unit/${unitId}`, { rating, comment })
      .then((r) => r.data),

  /** Update an existing review */
  updateReview: (id, reviewData) =>
    apiClient.put(`/reviews/${id}`, reviewData).then((r) => r.data),

  /** Delete a review */
  deleteReview: (id) =>
    apiClient.delete(`/reviews/${id}`).then((r) => r.data),

  /** Get a single review by ID */
  getReviewById: (id) =>
    apiClient.get(`/reviews/${id}`).then((r) => r.data),
};
```

---

## 4. Hooks

### `useReviews(unitId)` — Fetch Reviews

**File:** `src/features/reviews/hooks/useReviews.js`

```js
import { useQuery } from "@tanstack/react-query";
import { reviewsService } from "../services/reviews.api";

export function useReviews(unitId) {
  return useQuery({
    queryKey: ["reviews", "unit", unitId],
    queryFn: () => reviewsService.getUnitReviews(unitId),
    enabled: !!unitId,
  });
}
```

**Returns:** Standard React Query result (`{ data, isLoading, error }`)

| Property | Type | Description |
|----------|------|-------------|
| `data` | `{ success, data: Review[] }` | The API response |
| `isLoading` | `boolean` | True while fetching |
| `error` | `Error \| null` | Error if fetch failed |

---

### `useReviewActions(unitId)` — Create / Update / Delete

**File:** `src/features/reviews/hooks/useReviewActions.js`

```js
const { createReview, updateReview, deleteReview, isCreating, isUpdating, isDeleting } = useReviewActions(unitId);
```

| Function | Args | Description |
|----------|------|-------------|
| `createReview` | `{ rating: number, comment?: string }` | Creates a review. `unitId` is injected automatically. |
| `updateReview` | `{ id: string, data: { rating?, comment? } }` | Updates a review by ID. |
| `deleteReview` | `id: string` | Deletes a review by ID. |

All three automatically:
- Invalidate `["reviews", "unit", unitId]` and `["unit", unitId]` query caches
- Show toast notifications on success/error
- Use i18n keys: `reviews.submitSuccess`, `reviews.updateSuccess`, `reviews.deleteSuccess`

---

### `useReviewModal()` — Modal State Manager

**File:** `src/features/reviews/hooks/useReviewModal.js`

```js
const { isOpen, existingReview, openCreate, openEdit, close } = useReviewModal();
```

| Property / Method | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Whether the modal is visible |
| `existingReview` | `Review \| null` | The review being edited (null = create mode) |
| `openCreate()` | `() => void` | Opens modal in create mode |
| `openEdit(review)` | `(review) => void` | Opens modal in edit mode with pre-filled data |
| `close()` | `() => void` | Closes the modal |

---

## 5. Components

### `<ReviewList unitId={unitId} />`

**File:** `src/features/reviews/components/ReviewList.jsx`

Renders all reviews for a given unit with:
- Star ratings (visual)
- User avatar, name, date
- Review comment text
- Edit/Delete buttons for the review owner

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `unitId` | `string` | ✅ | The unit to display reviews for |

---

### `<ReviewModal />`

**File:** `src/features/reviews/components/ReviewModal.jsx`

A dialog form for creating or editing a review.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `unitId` | `string` | ✅ | The unit being reviewed |
| `isOpen` | `boolean` | ✅ | Controls modal visibility |
| `onClose` | `() => void` | ✅ | Called when modal should close |
| `existingReview` | `Review \| null` | ❌ | Pass to pre-fill for editing |

**Form fields:**
- **Rating** — Interactive star selector (1-5, required)
- **Comment** — Textarea (optional, max 1000 chars)

---

## 6. Usage Example — UnitDetailPage

```jsx
import { useReviews } from "@/features/reviews/hooks/useReviews";
import { useReviewActions } from "@/features/reviews/hooks/useReviewActions";
import { useReviewModal } from "@/features/reviews/hooks/useReviewModal";
import ReviewList from "@/features/reviews/components/ReviewList";
import ReviewModal from "@/features/reviews/components/ReviewModal";

function UnitDetailPage({ unitId }) {
  const { data: reviewsData, isLoading } = useReviews(unitId);
  const { createReview, updateReview, isCreating, isUpdating } = useReviewActions(unitId);
  const { isOpen, existingReview, openCreate, openEdit, close } = useReviewModal();

  return (
    <div>
      {/* ... unit details ... */}

      {/* Review button — only show for eligible users */}
      <Button onClick={openCreate}>Add Review</Button>

      {/* Reviews section */}
      <ReviewList unitId={unitId} />

      {/* Review modal */}
      <ReviewModal
        unitId={unitId}
        isOpen={isOpen}
        onClose={close}
        existingReview={existingReview}
      />
    </div>
  );
}
```

---

## 7. i18n Translation Keys

Make sure these keys exist in your translation files (`en.json` / `ar.json`):

```json
{
  "reviews": {
    "title": "Reviews",
    "submitSuccess": "Review submitted successfully",
    "updateSuccess": "Review updated successfully",
    "deleteSuccess": "Review deleted successfully",
    "noReviews": "No reviews yet",
    "addReview": "Add Review",
    "editReview": "Edit Review",
    "rating": "Rating",
    "comment": "Comment",
    "submit": "Submit",
    "cancel": "Cancel",
    "deleteConfirm": "Are you sure you want to delete this review?"
  }
}
```

---

## 8. Review Eligibility Logic

A user can only leave a review if they have a **completed booking** for the unit. This is checked via the `useCompletedBookingForUnit` hook (implemented separately), which verifies:

1. The user has a booking for `unitId`
2. The booking status is `CONFIRMED` or `BOOKED`
3. The booking's `endDate` has passed

If the user already has a review, show the **"Edit Review"** button instead.

---

> [!TIP]
> The frontend service layer (`reviews.api.js`) has been aligned with the backend routes:
> - `POST /reviews/unit/:unitId` (unitId in URL, not body)
> - `PUT /reviews/:id` (not PATCH)
> - `userId` is never sent from the frontend — the backend extracts it from the JWT
