import { track } from "@/lib/analytics";
import type { VehicleSelection } from "@/lib/vehicles/types";

export type VehicleCheckSource = "hero" | "sticky" | "sample" | "header";
export type VehicleCheckFormVariant = "hero" | "modal";
export type VehicleCheckCatalogLevel = "brands" | "models" | "variants";

export type VehicleCheckAnalyticsContext = {
  source: VehicleCheckSource;
  form_variant: VehicleCheckFormVariant;
};

function baseProps(ctx: VehicleCheckAnalyticsContext) {
  return {
    source: ctx.source,
    form_variant: ctx.form_variant,
  };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "unknown";
}

export function trackVehicleCheckCtaClicked(
  source: VehicleCheckSource,
) {
  track("vehicle_check_cta_clicked", { source });
}

export function trackVehicleCheckModalOpened(source: VehicleCheckSource) {
  track("vehicle_check_modal_opened", { source });
}

export function trackVehicleCheckModalClosed(source: VehicleCheckSource) {
  track("vehicle_check_modal_closed", { source });
}

export function trackVehicleCheckFormViewed(ctx: VehicleCheckAnalyticsContext) {
  track("vehicle_check_form_viewed", baseProps(ctx));
}

export function trackVehicleCheckBrandSelected(
  ctx: VehicleCheckAnalyticsContext,
  brand: string,
) {
  track("vehicle_check_brand_selected", { ...baseProps(ctx), brand });
}

export function trackVehicleCheckModelSelected(
  ctx: VehicleCheckAnalyticsContext,
  brand: string,
  model: string,
) {
  track("vehicle_check_model_selected", { ...baseProps(ctx), brand, model });
}

export function trackVehicleCheckVariantSelected(
  ctx: VehicleCheckAnalyticsContext,
  brand: string,
  model: string,
  variant: string,
) {
  track("vehicle_check_variant_selected", {
    ...baseProps(ctx),
    brand,
    model,
    variant,
  });
}

export function trackVehicleCheckValidationFailed(
  ctx: VehicleCheckAnalyticsContext,
  fields: string[],
) {
  track("vehicle_check_validation_failed", {
    ...baseProps(ctx),
    fields: fields.join(","),
    field_count: fields.length,
  });
}

export function trackVehicleCheckSubmitAttempted(
  ctx: VehicleCheckAnalyticsContext,
  values: { brand: string; model: string; variant: string },
) {
  track("vehicle_check_submit_attempted", {
    ...baseProps(ctx),
    ...values,
  });
}

export function trackVehicleCheckSubmitted(
  ctx: VehicleCheckAnalyticsContext,
  vehicle: VehicleSelection,
) {
  track("vehicle_check_submitted", {
    ...baseProps(ctx),
    brand: vehicle.brand,
    model: vehicle.model,
    variant: vehicle.variant,
    vehicle_label: vehicle.label,
  });
}

export function trackVehicleCheckSubmitFailed(
  ctx: VehicleCheckAnalyticsContext,
  error: unknown,
  values?: Partial<{ brand: string; model: string; variant: string }>,
) {
  track("vehicle_check_submit_failed", {
    ...baseProps(ctx),
    error: errorMessage(error),
    ...(values?.brand ? { brand: values.brand } : {}),
    ...(values?.model ? { model: values.model } : {}),
    ...(values?.variant ? { variant: values.variant } : {}),
  });
}

export function trackVehicleCheckSuccessViewed(
  ctx: VehicleCheckAnalyticsContext,
  vehicle: VehicleSelection,
) {
  track("vehicle_check_success_viewed", {
    ...baseProps(ctx),
    brand: vehicle.brand,
    model: vehicle.model,
    variant: vehicle.variant,
    vehicle_label: vehicle.label,
  });
}

export function trackVehicleCheckGoogleSignInClicked(
  ctx: VehicleCheckAnalyticsContext,
  vehicle: VehicleSelection,
) {
  track("google_signin_clicked", {
    ...baseProps(ctx),
    brand: vehicle.brand,
    model: vehicle.model,
    variant: vehicle.variant,
    vehicle_label: vehicle.label,
  });
}

export function trackVehicleCheckCatalogLoadFailed(
  ctx: VehicleCheckAnalyticsContext,
  level: VehicleCheckCatalogLevel,
  error: unknown,
  selection?: Partial<{ brand: string; model: string }>,
) {
  track("vehicle_check_catalog_load_failed", {
    ...baseProps(ctx),
    level,
    error: errorMessage(error),
    ...(selection?.brand ? { brand: selection.brand } : {}),
    ...(selection?.model ? { model: selection.model } : {}),
  });
}
