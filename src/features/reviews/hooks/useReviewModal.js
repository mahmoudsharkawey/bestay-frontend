import { useState, useEffect } from "react";

/**
 * Hook to manage ReviewModal form state (rating, comment, hover).
 * Resets when modal opens/closes or when editing a different review.
 */
export function useReviewModal({ isOpen, existingReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment || "");
      } else {
        setRating(5);
        setComment("");
      }
    }
  }, [isOpen, existingReview]);

  return {
    rating,
    setRating,
    comment,
    setComment,
    hoveredRating,
    setHoveredRating,
  };
}
