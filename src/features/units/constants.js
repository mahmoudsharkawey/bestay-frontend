// UnitType enum
export const UNIT_TYPES = ["ROOM", "APARTMENT", "STUDIO"];

// RoomType enum
export const ROOM_TYPES = ["SINGLE", "DOUBLE", "SHARED"];

// GenderPreference enum
export const GENDER_TYPES = ["MALE_ONLY", "FEMALE_ONLY"];

// UnitStatus enum
export const UNIT_STATUSES = ["ACTIVE", "DELETED"];

export const FACILITIES = [
  "wifi",
  "kitchen",
  "washing_machine",
  "balcony",
  "ac",
  "parking",
  "gym",
  "pool",
  "desk",
  "garden",
  "elevator",
  "security",
];

export const SORT_OPTIONS = [
  { value: "createdAt_desc", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export const UNIT_STATUS_MAP = {
  ACTIVE: { label: "Active", color: "bg-success/10 text-success" },
  INACTIVE: { label: "Inactive", color: "bg-slate-100 text-slate-500" },
  PENDING: { label: "Pending", color: "bg-orange-light text-orange" },
};

export const DEFAULT_FILTERS = {
  city: "",
  university: "",
  minPrice: "",
  maxPrice: "",
  roomType: "",
  genderType: "",
  facilities: [],
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  limit: 9,
};
