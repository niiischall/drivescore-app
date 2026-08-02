import { NextResponse } from "next/server";
import { getBrands, getModels, getVariants } from "@/lib/vehicles/catalog";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brandId = searchParams.get("brand")?.trim() ?? "";
  const modelId = searchParams.get("model")?.trim() ?? "";

  if (!brandId) {
    return NextResponse.json({ brands: getBrands() });
  }

  const models = getModels(brandId);
  if (!models) {
    return NextResponse.json(
      { ok: false, error: "Unknown brand" },
      { status: 400 },
    );
  }

  if (!modelId) {
    return NextResponse.json({ models });
  }

  const variants = getVariants(brandId, modelId);
  if (!variants) {
    return NextResponse.json(
      { ok: false, error: "Unknown model" },
      { status: 400 },
    );
  }

  return NextResponse.json({ variants });
}
