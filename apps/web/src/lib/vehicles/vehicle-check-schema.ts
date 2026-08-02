import { z } from "zod";

export const vehicleCheckSchema = z.object({
  brand: z.string().min(1, "Select a brand"),
  model: z.string().min(1, "Select a model"),
  variant: z.string().min(1, "Select a variant"),
});

export type VehicleCheckFormValues = z.infer<typeof vehicleCheckSchema>;

export const vehicleCheckDefaultValues: VehicleCheckFormValues = {
  brand: "",
  model: "",
  variant: "",
};
