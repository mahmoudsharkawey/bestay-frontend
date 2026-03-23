// UnitType enum (preference-specific)
export const PREFERENCE_UNIT_TYPES = ["ROOM", "APARTMENT", "STUDIO"];

// GenderType enum
export const PREFERENCE_GENDER_TYPES = ["MALE_ONLY", "FEMALE_ONLY"];

// Available facilities
export const PREFERENCE_FACILITIES = [
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

// Default form values
export const DEFAULT_PREFERENCE_VALUES = {
  unitType: "",
  minBudget: "",
  maxBudget: "",
  city: "",
  university: "",
  maxDistance: "",
  rooms: "",
  furnished: false,
  genderType: "",
  facilities: [],
};
