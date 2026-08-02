"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchBrands,
  fetchModels,
  fetchVariants,
} from "@/lib/vehicle-check-api";

export function useVehicleBrands() {
  return useQuery({
    queryKey: ["vehicles", "brands"],
    queryFn: fetchBrands,
    staleTime: Infinity,
  });
}

export function useVehicleModels(brandId: string) {
  return useQuery({
    queryKey: ["vehicles", "models", brandId],
    queryFn: () => fetchModels(brandId),
    enabled: Boolean(brandId),
    staleTime: Infinity,
  });
}

export function useVehicleVariants(brandId: string, modelId: string) {
  return useQuery({
    queryKey: ["vehicles", "variants", brandId, modelId],
    queryFn: () => fetchVariants(brandId, modelId),
    enabled: Boolean(brandId) && Boolean(modelId),
    staleTime: Infinity,
  });
}
