import { NextResponse } from "next/server";
import { resolveVehicleSelection } from "@/lib/vehicles/catalog";

export const runtime = "nodejs";

type VehicleCheckBody = {
  brand?: unknown;
  model?: unknown;
  variant?: unknown;
};

function asId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let body: VehicleCheckBody;
  try {
    body = (await request.json()) as VehicleCheckBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const brand = asId(body.brand);
  const model = asId(body.model);
  const variant = asId(body.variant);

  if (!brand || !model || !variant) {
    return NextResponse.json(
      { ok: false, error: "Brand, model, and variant are required" },
      { status: 400 },
    );
  }

  const vehicle = resolveVehicleSelection(brand, model, variant);
  if (!vehicle) {
    return NextResponse.json(
      { ok: false, error: "Unknown vehicle selection" },
      { status: 400 },
    );
  }

  console.log("[vehicle-check]", { brand, model, variant });

  return NextResponse.json({ ok: true, vehicle });
}
