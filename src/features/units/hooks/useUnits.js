import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { unitsService } from "@/features/units/services/units.api";
import { DEFAULT_FILTERS } from "@/features/units/constants";

/**
 * Hook for public units search/listing page.
 * Filters and pagination are synced with URL search params.
 */
export function useUnits() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filters from URL
  const filters = useMemo(
    () => ({
      city: searchParams.get("city") || DEFAULT_FILTERS.city,
      university: searchParams.get("university") || DEFAULT_FILTERS.university,
      minPrice: searchParams.get("minPrice") || DEFAULT_FILTERS.minPrice,
      maxPrice: searchParams.get("maxPrice") || DEFAULT_FILTERS.maxPrice,
      roomType: searchParams.get("roomType") || DEFAULT_FILTERS.roomType,
      genderType: searchParams.get("genderType") || DEFAULT_FILTERS.genderType,
      facilities: searchParams.get("facilities") || "",
      sortBy: searchParams.get("sortBy") || DEFAULT_FILTERS.sortBy,
      sortOrder: searchParams.get("sortOrder") || DEFAULT_FILTERS.sortOrder,
      page: Number(searchParams.get("page") || DEFAULT_FILTERS.page),
      limit: DEFAULT_FILTERS.limit,
    }),
    [searchParams],
  );

  // Build clean params (exclude empty strings)
  const queryParams = useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) params[k] = v;
    });
    return params;
  }, [filters]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["units", queryParams],
    queryFn: () => unitsService.searchUnits(queryParams),
    keepPreviousData: true,
  });

  const setFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters, page: 1 };
    const params = {};
    Object.entries(updated).forEach(([k, v]) => {
      if (
        (v !== "" && v !== null && v !== undefined && v !== 1) ||
        k === "page"
      ) {
        params[k] = v;
      }
    });
    setSearchParams(params);
  };

  const setPage = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  const resetFilters = () => setSearchParams({});

  return {
    units: data?.data?.units || [],
    total: data?.data?.total || 0,
    page: filters.page,
    limit: filters.limit,
    filters,
    isLoading,
    isError,
    error,
    setFilters,
    setPage,
    resetFilters,
  };
}
