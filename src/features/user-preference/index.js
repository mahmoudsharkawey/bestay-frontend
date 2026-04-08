// Pages
export { default as UserPreferencePage } from "./pages/UserPreferencePage";
export { default as RecommendationsPage } from "./pages/RecommendationsPage";

// Components
export { default as UserPreferenceForm } from "./components/UserPreferenceForm";
export { default as PreferenceCard } from "./components/PreferenceCard";
export { default as MatchingUnitsList } from "./components/MatchingUnitsList";
export { default as RecommendationCard } from "./components/RecommendationCard";
export { default as MatchScoreBadge } from "./components/MatchScoreBadge";
export { default as ScoreBreakdown } from "./components/ScoreBreakdown";
export { default as AIReasonCard } from "./components/AIReasonCard";

// Hooks
export { useUserPreference } from "./hooks/useUserPreference";
export { useMatchingUnits } from "./hooks/useMatchingUnits";
export { useRecommendations } from "./hooks/useRecommendations";

// Services
export { userPreferenceService } from "./services/userPreference.api";
export { recommendationService } from "./services/recommendation.api";

// Constants & Schema
export * from "./constants";
export * from "./schemas/userPreference.schema";
