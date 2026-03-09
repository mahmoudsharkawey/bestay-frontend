ok take this 
BeStay Backend — REST API Documentation
Base URL: http://localhost:<PORT>/api/v1 Format: All requests and responses use application/json unless stated otherwise.

Table of Contents
Global Configuration
Authentication Scheme
Standard Response Envelope
Auth
Users
Units
Bookings
Visits
Payments
Reviews
Favorites
Notifications
Uploads
Admin Dashboard
1. Global Configuration
Rate Limiting
Limiter	Window	Max Requests	Applied To
apiLimiter	15 min	100	All /api/v1/* routes
authLimiter	15 min	5	POST /auth/sign-in
passwordResetLimiter	60 min	3	POST /auth/forgot-password
When the limit is exceeded, the API returns 429 Too Many Requests.

CORS
All origins (*) are permitted. Allowed methods: GET, POST, PUT, DELETE, PATCH, OPTIONS. Allowed headers: Content-Type, Authorization.

Security
Helmet is applied globally to set secure HTTP headers.

2. Authentication Scheme
Protected routes require a Bearer token in the Authorization header:

Authorization: Bearer <jwt_token>
The JWT payload contains: { id, email, role }.

User Roles
Role	Description
USER	Regular tenant — can search, book, visit, review, favorite
LANDLORD	Property owner — can manage units, approve/reject visits
ADMIN	Platform administrator — full access to all resources
3. Standard Response Envelope
All successful responses return:

json
{
  "success": true,
  "statusCode": 200,
  "message": "Human-readable message",
  "data": { ... }
}
All error responses return:

json
{
  "success": false,
  "statusCode": 4xx|5xx,
  "message": "Error description"
}
4. Auth
Base path: /api/v1/auth

POST /sign-up
Register a new user account.

Access: Public

Request Body:

Field	Type	Required	Description
name	string	✅	Full name
email	string	✅	Unique email address
password	string	✅	Plain-text password (hashed server-side)
phone	string	❌	Phone number
role	string	❌	USER | LANDLORD (defaults to USER)
Success Response — 201:

json
{
  "data": {
    "user": { "id", "name", "email", "phone", "role", "createdAt" },
    "token": "<jwt>"
  }
}
POST /sign-in
Authenticate an existing user.

Access: Public (rate-limited: 5 req / 15 min)

Request Body:

Field	Type	Required
email	string	✅
password	string	✅
Success Response — 200: Same shape as /sign-up (user + token).

POST /forgot-password
Send a password-reset code to the user's email.

Access: Public (rate-limited: 3 req / hour)

Request Body:

Field	Type	Required
email	string	✅
Success Response — 200: { message: "Password reset email sent successfully" }

POST /verify-reset-code
Verify the 6-digit reset code sent by email.

Access: Public

Request Body:

Field	Type	Required
email	string	✅
resetCode	string	✅
Success Response — 200: { message: "Reset code verified successfully" }

POST /reset-password
Set a new password after the reset code has been verified.

Access: Public

Request Body:

Field	Type	Required
email	string	✅
newPassword	string	✅
Success Response — 200: { message: "Password reset successfully" }

POST /google-login
Authenticate (or register) a user via Google OAuth token.

Access: Public

Request Body:

Field	Type	Required
token	string	✅
Success Response — 200: { data: { user, token } }

5. Users
Base path: /api/v1/users
All routes require Bearer token (Authenticate middleware).

GET /me
Get the authenticated user's full profile.

Access: Any authenticated user

Success Response — 200:

json
{
  "data": { "id", "name", "email", "phone", "role", "picture", "preferences", ... }
}
PUT /me
Update the authenticated user's profile.

Access: Any authenticated user

Request Body (all optional):

Field	Type	Description
name	string	Display name
phone	string	Phone number
picture	string	Avatar URL
Success Response — 200: Updated user object.

DELETE /me
Soft-delete the authenticated user's account.

Access: Any authenticated user

Success Response — 200: { message: "User profile deleted successfully" }

PATCH /change-password
Change the current user's password.

Access: Any authenticated user

Request Body:

Field	Type	Required
oldPassword	string	✅
newPassword	string	✅
Success Response — 200: { message: "Password changed successfully" }

GET /me/preferences
Retrieve user preferences (e.g. preferred city, room type).

Access: Any authenticated user

Success Response — 200: { data: { ...preferences } }

POST /me/preferences
Create or update user preferences (upsert).

Access: Any authenticated user

Request Body: Preference fields (city, roomType, genderType, etc.)

Success Response — 200: Updated preferences object.

6. Units
Base path: /api/v1/units

GET /all
Retrieve all units (unpaginated, public).

Access: Public

Query Params:

Param	Type	Default	Description
page	number	1	Page number
limit	number	10	Items per page
Success Response — 200: { data: { units: [...], total, page, limit } }

GET /
Search and filter units (public).

Access: Public

Query Params:

Param	Type	Description
city	string	Filter by city
university	string	Filter by nearby university
minPrice	number	Minimum price
maxPrice	number	Maximum price
roomType	string	Room type (e.g. SINGLE, DOUBLE)
genderType	string	MALE | FEMALE | MIXED
facilities	string	Comma-separated list of facilities
page	number	Default 1
limit	number	Default 10
sortBy	string	Default createdAt
sortOrder	string	asc | desc (default desc)
Success Response — 200: { data: { units: [...], total, page, limit } }

GET /my
Get all units owned by the authenticated landlord/admin.

Access: LANDLORD, ADMIN only

Success Response — 200: { data: { units: [...] } }

GET /:id
Get a single unit by ID.

Access: Any authenticated user

Path Param: id — Unit ID

Success Response — 200: { data: { unit } }

POST /
Create a new rental unit.

Access: LANDLORD, ADMIN only

NOTE

Admins can set ownerId to assign the unit to another landlord. Non-admins always become the owner.

Request Body:

Field	Type	Required	Description
title	string	✅	Unit title
description	string	✅	Detailed description
city	string	✅	City
university	string	✅	Nearby university
price	number	✅	Monthly rent
roomType	string	✅	SINGLE | DOUBLE | etc.
genderType	string	✅	MALE | FEMALE | MIXED
facilities	string[]	❌	Array of facility names
images	string[]	❌	Array of image URLs
ownerId	string	❌	Admin only — assign to a landlord
Success Response — 201: { data: { unit } }

PUT /:id
Update a unit by ID.

Access: LANDLORD, ADMIN only

Path Param: id — Unit ID
Request Body: Any subset of unit fields.

Success Response — 200: { data: { unit } }

DELETE /:id
Soft-delete a unit by ID.

Access: LANDLORD, ADMIN only

Path Param: id — Unit ID

Success Response — 200: { data: { deletedUnit } }

7. Bookings
Base path: /api/v1/bookings

NOTE

Bookings are created automatically when a Visit is confirmed and payment is completed via the Stripe webhook flow.

GET /my
Get all bookings for the authenticated caller.

USER → sees their own bookings.
LANDLORD → sees bookings on their units.
Access: Any authenticated user

Success Response — 200:

json
{
  "data": [
    {
      "id", "unitId", "userId", "startDate", "endDate",
      "status", "paymentId", "createdAt"
    }
  ]
}
8. Visits
Base path: /api/v1/visits

The visit lifecycle follows this state machine:

PENDING → APPROVED → (payment) → CONFIRMED
        → REJECTED
        → RESCHEDULED → ACCEPTED → APPROVED
                      → REJECTED → CANCELLED
        → CANCELLED
POST /:unitId
User requests a visit to a unit.

Access: USER only

Path Param: unitId — Target unit ID

Request Body:

Field	Type	Required	Description
proposedDate	string (ISO 8601)	✅	Requested visit date
Success Response — 201: { data: { visit } }

GET /my
Get all visits for the authenticated caller.

USER → their own visits.
LANDLORD → visits on their units.
Access: Any authenticated user

Success Response — 200: { data: [{ visit }] }

GET /:visitId
Get a single visit's details.

Access: Visit's owner (USER) or unit's owner (LANDLORD)

Success Response — 200: { data: { visit } }

PUT /:visitId/approve
Landlord approves a pending visit request.

Access: LANDLORD only

Success Response — 200: { data: { visit } }

POST /:visitId/reject
Landlord rejects a pending visit request.

Access: LANDLORD only

Success Response — 200: { data: { visit } }

POST /:visitId/reschedule
Landlord proposes a new date for the visit.

Access: LANDLORD only

Request Body:

Field	Type	Required
newDate	string (ISO 8601)	✅
Success Response — 200: { data: { visit } }

POST /:visitId/reschedule/accept
User accepts the landlord's reschedule proposal.

Access: USER only

Success Response — 200: { data: { visit } }

POST /:visitId/reschedule/reject
User rejects the landlord's reschedule proposal.

Access: USER only

Success Response — 200: { data: { visit } }

POST /:visitId/cancel
User cancels a visit before its proposed date.

Access: USER only

Success Response — 200: { data: { visit } }

POST /:visitId/confirm
Landlord confirms the visit was physically completed.

IMPORTANT

The visit must have been APPROVED and the associated payment must be in PAID status before this action is allowed.

Access: LANDLORD only

Success Response — 200: { data: { visit } }

9. Payments
Base path: /api/v1/payments

The payment flow is:

User calls POST /intent → gets a Stripe clientSecret.
Client-side code uses the secret to confirm the payment via Stripe.js.
Stripe calls the webhook → server marks payment as PAID and creates the booking.
POST /intent
Create a Stripe PaymentIntent for an approved visit.

Access: USER only

Request Body:

Field	Type	Required
visitId	string	✅
Success Response — 201:

json
{
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "amount": 5000
  }
}
POST /webhook (Stripe)
Receives raw Stripe webhook events for signature verification.

CAUTION

This route is registered outside the standard API middleware chain. It must receive the raw request body (not parsed JSON) for Stripe signature verification. Do NOT call this endpoint directly.

Headers: stripe-signature: <stripe_signature_header>

Handled events: payment_intent.succeeded

Success Response — 200: { received: true }

GET /my
Get the authenticated user's payment history.

Access: USER only

Success Response — 200:

json
{
  "data": [
    { "id", "amount", "status", "visitId", "bookingId", "createdAt" }
  ]
}
GET /
Get all payments (admin view, paginated).

Access: ADMIN only

Query Params:

Param	Type	Default
page	number	1
limit	number	10
Success Response — 200: { data: { payments: [...], total } }

POST /:id/refund
Issue a full refund for a PAID payment via Stripe.

Access: ADMIN only

Path Param: id — Payment record ID

Success Response — 200: { data: { payment (status: REFUNDED) } }

10. Reviews
Base path: /api/v1/reviews

POST /unit/:unitId
Create a review for a unit.

Access: USER only

Path Param: unitId

Request Body:

Field	Type	Required	Description
rating	number	✅	1–5
comment	string	❌	Optional text review
Success Response — 201: { data: { review } }

GET /unit/:unitId
Get all reviews for a specific unit.

Access: Any authenticated user

Success Response — 200: { data: [{ review }] }

GET /:id
Get a single review by ID.

Access: Any authenticated user

Success Response — 200: { data: { review } }

PUT /:id
Update a review (own reviews only).

Access: USER only

Request Body:

Field	Type	Required
userId	string	✅
rating	number	❌
comment	string	❌
Success Response — 200: { data: { review } }

DELETE /:id
Delete a review (own reviews only).

Access: USER only

Success Response — 200: { data: { deletedReview } }

11. Favorites
Base path: /api/v1/favorites

POST /
Add a unit to a user's favorites.

Access: USER, LANDLORD

Request Body:

Field	Type	Required
userId	string	✅
unitId	string	✅
Success Response — 201: { data: { favorite } }

DELETE /:unitId
Remove a unit from a user's favorites.

Access: USER, LANDLORD

Path Param: unitId
Request Body: { userId: string }

Success Response — 200: { data: { deletedFavorite } }

GET /user/:userId
Get all favorited units for a specific user.

Access: Any authenticated user

Path Param: userId

Success Response — 200: { data: [{ favorite + unit }] }

GET /check/:unitId/:userId
Check if a unit is already favorited by a user.

Access: Any authenticated user

Success Response — 200: { data: { isFavorited: true | false } }

12. Notifications
Base path: /api/v1/notifications

Notifications are created server-side on key events (visit approved/rejected, reschedule proposed, payment received, etc.).

GET /my
Fetch all notifications for the authenticated user.

Access: Any authenticated user

Success Response — 200:

json
{
  "data": [
    { "id", "message", "isRead", "createdAt", "type" }
  ]
}
PATCH /read-all
Mark every unread notification as read for the caller.

Access: Any authenticated user

Success Response — 200: { data: { count: <number marked> } }

PATCH /:id/read
Mark a single notification as read.

Access: Any authenticated user (must own the notification)

Path Param: id — Notification ID

Success Response — 200: { data: { notification } }

DELETE /:id
Delete a single notification.

Access: Any authenticated user (must own the notification)

Path Param: id — Notification ID

Success Response — 200: { message: "Notification deleted successfully" }

13. Uploads
Base path: /api/v1/uploads

Images are stored on Cloudinary. The returned URLs can then be used in unit creation or profile updates.

POST /
Upload one or more images.

Access: Any authenticated user

Content-Type: multipart/form-data

Form Fields:

Field	Type	Required	Description
files	File[]	✅	Up to 10 image files
context	string	❌	Cloudinary folder context, e.g. "user_avatar", "unit_images", defaults to "general"
Success Response — 201:

json
{
  "data": {
    "urls": ["https://res.cloudinary.com/..."]
  }
}
14. Admin Dashboard
Base path: /api/v1/admin

IMPORTANT

Every route in this section requires ADMIN role. Requests without a valid admin token return 403 Forbidden.

Overview & KPIs
GET /dashboard/overview
High-level platform KPIs: total users, units, bookings, revenue, visits, active users.

Visits & Traffic Analytics
GET /dashboard/visits-stats or /charts/visits
Visit statistics over time.

Query Params:

Param	Values	Description
period	daily | monthly	Aggregation period
GET /dashboard/top-units
Most visited or most booked units.

Query Params:

Param	Type	Default	Description
by	string	—	Ranking criterion (e.g. visits, bookings)
limit	number	10	Number of units to return
GET /charts/conversion-funnel
Shows visit → booking conversion rates across the platform.

GET /charts/visits-status
Distribution of visits by status (PENDING, APPROVED, REJECTED, CONFIRMED, CANCELLED).

Bookings & Revenue Analytics
GET /dashboard/bookings-stats or /charts/bookings
Booking volume over time.

Query Params: period (monthly)

GET /dashboard/revenue-stats or /charts/revenue
Revenue trends over time.

Query Params: period (monthly)

GET /charts/bookings-status
Distribution of bookings by status.

Users & Growth Charts
GET /charts/users-growth
User registrations over time.

Query Params: period (monthly)

GET /charts/users-by-role
Breakdown of users by role (USER, LANDLORD, ADMIN).

User Management
GET /users
Paginated list of all platform users.

Query Params: page (default 1), limit (default 10)

GET /users/:id
Get full details for a single user.

PATCH /users/:id/block
Soft-block a user, preventing login.

PATCH /users/:id/unblock
Remove a block from a user.

PATCH /users/:id/role
Change a user's role.

Request Body: { role: "USER" | "LANDLORD" | "ADMIN" }

Bookings Monitoring
GET /bookings
All bookings with pagination and date filtering.

Query Params: page, limit, from (ISO date), to (ISO date)

GET /bookings/:id
Detailed view of a single booking.

Visits Monitoring
GET /visits
All visits with pagination and date filtering.

Query Params: page, limit, from (ISO date), to (ISO date)

GET /visits/:id
Detailed view of a single visit.

Reviews & Ratings Analytics
GET /reviews
All reviews with pagination.

Query Params: page, limit

GET /dashboard/ratings-summary
Aggregate ratings summary: average rating per unit, distribution (1–5 stars), top-rated units.

Error Reference
Status	Meaning
400	Bad Request — missing or invalid fields
401	Unauthorized — missing/invalid JWT
403	Forbidden — insufficient role
404	Not Found — resource does not exist
409	Conflict — duplicate record
422	Unprocessable Entity — validation failed
429	Too Many Requests — rate limit hit
500	Internal Server Error