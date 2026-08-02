"use client";

import { useMutation } from "@tanstack/react-query";
import type { VehicleSelection } from "@/lib/vehicles/types";
import type { VehicleCheckFormValues } from "@/lib/vehicles/vehicle-check-schema";
import { submitVehicleCheck } from "@/lib/vehicle-check-api";

export function useSubmitVehicleCheck() {
  return useMutation({
    mutationFn: (input: VehicleCheckFormValues) => submitVehicleCheck(input),
  });
}

export type { VehicleSelection };
