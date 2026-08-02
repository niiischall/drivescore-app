import type {
  VehicleBrandSummary,
  VehicleModelSummary,
  VehicleSelection,
  VehicleVariant,
} from "@/lib/vehicles/types";

export type VehicleCheckResponse = {
  ok: boolean;
  vehicle?: VehicleSelection;
  error?: string;
};

export class VehicleCheckApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VehicleCheckApiError";
  }
}

async function parseJson<T>(res: Response): Promise<T | null> {
  return (await res.json().catch(() => null)) as T | null;
}

export async function fetchBrands(): Promise<VehicleBrandSummary[]> {
  const res = await fetch("/api/vehicles");
  const data = await parseJson<{ brands?: VehicleBrandSummary[] }>(res);
  if (!res.ok || !data?.brands) {
    throw new VehicleCheckApiError("Couldn't load brands — try again");
  }
  return data.brands;
}

export async function fetchModels(
  brandId: string,
): Promise<VehicleModelSummary[]> {
  const res = await fetch(
    `/api/vehicles?brand=${encodeURIComponent(brandId)}`,
  );
  const data = await parseJson<{ models?: VehicleModelSummary[] }>(res);
  if (!res.ok || !data?.models) {
    throw new VehicleCheckApiError("Couldn't load models — try again");
  }
  return data.models;
}

export async function fetchVariants(
  brandId: string,
  modelId: string,
): Promise<VehicleVariant[]> {
  const res = await fetch(
    `/api/vehicles?brand=${encodeURIComponent(brandId)}&model=${encodeURIComponent(modelId)}`,
  );
  const data = await parseJson<{ variants?: VehicleVariant[] }>(res);
  if (!res.ok || !data?.variants) {
    throw new VehicleCheckApiError("Couldn't load variants — try again");
  }
  return data.variants;
}

export async function submitVehicleCheck(input: {
  brand: string;
  model: string;
  variant: string;
}): Promise<VehicleSelection> {
  const res = await fetch("/api/vehicle-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await parseJson<VehicleCheckResponse>(res);
  if (!res.ok || !data?.ok || !data.vehicle) {
    throw new VehicleCheckApiError(
      data?.error ?? "Couldn't check your car — try again",
    );
  }

  return data.vehicle;
}
