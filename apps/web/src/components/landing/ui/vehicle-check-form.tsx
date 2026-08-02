"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useVehicleBrands,
  useVehicleModels,
  useVehicleVariants,
} from "@/hooks/use-vehicle-catalog";
import { useSubmitVehicleCheck } from "@/hooks/use-submit-vehicle-check";
import {
  trackVehicleCheckBrandSelected,
  trackVehicleCheckCatalogLoadFailed,
  trackVehicleCheckFormViewed,
  trackVehicleCheckGoogleSignInClicked,
  trackVehicleCheckModelSelected,
  trackVehicleCheckSubmitAttempted,
  trackVehicleCheckSubmitFailed,
  trackVehicleCheckSubmitted,
  trackVehicleCheckSuccessViewed,
  trackVehicleCheckValidationFailed,
  trackVehicleCheckVariantSelected,
  type VehicleCheckAnalyticsContext,
} from "@/lib/vehicle-check-analytics";
import {
  vehicleCheckDefaultValues,
  vehicleCheckSchema,
  type VehicleCheckFormValues,
} from "@/lib/vehicles/vehicle-check-schema";
import type { VehicleSelection } from "@/lib/vehicles/types";
import { BrandSelect } from "./brand-select";
import type { VehicleCheckSource } from "./vehicle-check-modal";

type VehicleCheckFormProps = {
  source: VehicleCheckSource;
  variant?: "modal" | "hero";
  autoFocus?: boolean;
};

function VehicleCheckFieldSkeleton({
  button = false,
}: {
  button?: boolean;
}) {
  return (
    <div
      className={
        button
          ? "landing-form-skeleton landing-form-skeleton--button"
          : "landing-form-skeleton"
      }
      aria-hidden
    />
  );
}

function VehicleCheckFormSkeleton({
  formClass,
}: {
  formClass: string;
}) {
  return (
    <div
      className={`${formClass} landing-form-skeleton-wrap`}
      aria-busy="true"
      aria-label="Loading vehicle form"
    >
      <VehicleCheckFieldSkeleton />
      <VehicleCheckFieldSkeleton />
      <VehicleCheckFieldSkeleton />
      <VehicleCheckFieldSkeleton button />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="landing-modal__field-error" role="alert">
      {message}
    </p>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden
      className="flex-none"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.61z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.16.29-1.71V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

function VehicleCheckSuccess({
  vehicle,
  analytics,
}: {
  vehicle: VehicleSelection;
  analytics: VehicleCheckAnalyticsContext;
}) {
  useEffect(() => {
    trackVehicleCheckSuccessViewed(analytics, vehicle);
  }, [analytics, vehicle]);

  function handleGoogleClick() {
    trackVehicleCheckGoogleSignInClicked(analytics, vehicle);
    console.log("[google-signin] stub", vehicle);
  }

  return (
    <div className="landing-form-success" role="status" aria-live="polite">
      <span className="landing-form-success__icon" aria-hidden>
        <Check weight="bold" size={22} />
      </span>
      <div className="landing-form-success__copy">
        <p className="landing-form-success__message">
          <span className="font-semibold text-text-primary">Great news!</span> We
          have an E20 compatibility score for your{" "}
          <span className="font-semibold text-text-primary">{vehicle.label}</span>
          .
        </p>
      </div>
      <div className="landing-form-success__actions">
        <p className="landing-form-success__subline">
          Sign in to view your full report.
        </p>
        <button
          type="button"
          className="landing-form-success__cta landing-google-btn"
          onClick={handleGoogleClick}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export function VehicleCheckForm({
  source,
  variant = "modal",
  autoFocus = false,
}: VehicleCheckFormProps) {
  const brandId = useId();
  const modelId = useId();
  const variantId = useId();
  const brandRef = useRef<HTMLButtonElement>(null);
  const catalogErrorsTracked = useRef<Set<string>>(new Set());

  const [submittedVehicle, setSubmittedVehicle] =
    useState<VehicleSelection | null>(null);

  const analytics = useMemo<VehicleCheckAnalyticsContext>(
    () => ({ source, form_variant: variant }),
    [source, variant],
  );

  const brandsQuery = useVehicleBrands();
  const submitCheck = useSubmitVehicleCheck();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleCheckFormValues>({
    resolver: zodResolver(vehicleCheckSchema),
    defaultValues: vehicleCheckDefaultValues,
    mode: "onSubmit",
  });

  const brand = watch("brand");
  const model = watch("model");
  const selectedVariant = watch("variant");

  const modelsQuery = useVehicleModels(brand);
  const variantsQuery = useVehicleVariants(brand, model);

  const formClass =
    variant === "hero" ? "landing-hero__form" : "landing-modal__form";

  const loading = submitCheck.isPending;
  const canSubmit = Boolean(brand && model && selectedVariant) && !loading;

  const errorMessage =
    submitCheck.error instanceof Error
      ? submitCheck.error.message
      : "Couldn't check your car — try again";

  useEffect(() => {
    if (!autoFocus) return;
    const timer = window.setTimeout(() => brandRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [autoFocus]);

  useEffect(() => {
    if (brandsQuery.isLoading || brandsQuery.isError) return;
    trackVehicleCheckFormViewed(analytics);
  }, [analytics, brandsQuery.isLoading, brandsQuery.isError]);

  useEffect(() => {
    if (!brandsQuery.isError) return;
    const key = "brands";
    if (catalogErrorsTracked.current.has(key)) return;
    catalogErrorsTracked.current.add(key);
    trackVehicleCheckCatalogLoadFailed(analytics, "brands", brandsQuery.error);
  }, [analytics, brandsQuery.error, brandsQuery.isError]);

  useEffect(() => {
    if (!brand || !modelsQuery.isError) return;
    const key = `models:${brand}`;
    if (catalogErrorsTracked.current.has(key)) return;
    catalogErrorsTracked.current.add(key);
    trackVehicleCheckCatalogLoadFailed(
      analytics,
      "models",
      modelsQuery.error,
      { brand },
    );
  }, [analytics, brand, modelsQuery.error, modelsQuery.isError]);

  useEffect(() => {
    if (!brand || !model || !variantsQuery.isError) return;
    const key = `variants:${brand}:${model}`;
    if (catalogErrorsTracked.current.has(key)) return;
    catalogErrorsTracked.current.add(key);
    trackVehicleCheckCatalogLoadFailed(
      analytics,
      "variants",
      variantsQuery.error,
      { brand, model },
    );
  }, [analytics, brand, model, variantsQuery.error, variantsQuery.isError]);

  function resetDependentFields(level: "model" | "variant") {
    if (level === "model") {
      setValue("model", "");
      setValue("variant", "");
    } else {
      setValue("variant", "");
    }

    if (submitCheck.isError) submitCheck.reset();
  }

  const onSubmit = handleSubmit(
    (values) => {
      trackVehicleCheckSubmitAttempted(analytics, values);

      submitCheck.mutate(values, {
        onSuccess: (vehicle) => {
          trackVehicleCheckSubmitted(analytics, vehicle);
          setSubmittedVehicle(vehicle);
        },
        onError: (error) => {
          trackVehicleCheckSubmitFailed(analytics, error, values);
        },
      });
    },
    (fieldErrors) => {
      trackVehicleCheckValidationFailed(analytics, Object.keys(fieldErrors));
    },
  );

  if (submittedVehicle) {
    return (
      <VehicleCheckSuccess vehicle={submittedVehicle} analytics={analytics} />
    );
  }

  if (brandsQuery.isLoading) {
    return <VehicleCheckFormSkeleton formClass={formClass} />;
  }

  const formBusy =
    loading || modelsQuery.isLoading || variantsQuery.isLoading;

  const modelField = register("model");
  const variantField = register("variant");

  return (
    <form
      onSubmit={onSubmit}
      className={formClass}
      aria-busy={formBusy}
      noValidate
    >
      <label className="landing-modal__label" htmlFor={brandId}>
        Brand
      </label>
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <BrandSelect
            id={brandId}
            brands={brandsQuery.data ?? []}
            value={field.value}
            disabled={loading}
            invalid={Boolean(errors.brand)}
            onChange={(value) => {
              field.onChange(value);
              if (value) trackVehicleCheckBrandSelected(analytics, value);
              resetDependentFields("model");
            }}
            onBlur={field.onBlur}
            triggerRef={brandRef}
          />
        )}
      />
      <FieldError message={errors.brand?.message} />

      <label className="landing-modal__label" htmlFor={modelId}>
        Model
      </label>
      {modelsQuery.isLoading ? (
        <VehicleCheckFieldSkeleton />
      ) : (
        <select
          id={modelId}
          {...modelField}
          value={model}
          disabled={!brand || loading}
          aria-invalid={errors.model ? true : undefined}
          onChange={(e) => {
            const nextModel = e.target.value;
            modelField.onChange(e);
            if (nextModel) {
              trackVehicleCheckModelSelected(analytics, brand, nextModel);
            }
            resetDependentFields("variant");
          }}
          className="landing-modal__input landing-modal__select"
        >
          <option value="">Select model</option>
          {modelsQuery.data?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      )}
      <FieldError message={errors.model?.message} />

      <label className="landing-modal__label" htmlFor={variantId}>
        Variant
      </label>
      {variantsQuery.isLoading ? (
        <VehicleCheckFieldSkeleton />
      ) : (
        <select
          id={variantId}
          {...variantField}
          value={selectedVariant}
          disabled={!model || loading}
          aria-invalid={errors.variant ? true : undefined}
          onChange={(e) => {
            const nextVariant = e.target.value;
            variantField.onChange(e);
            if (nextVariant) {
              trackVehicleCheckVariantSelected(
                analytics,
                brand,
                model,
                nextVariant,
              );
            }
            if (submitCheck.isError) submitCheck.reset();
          }}
          className="landing-modal__input landing-modal__select"
        >
          <option value="">Select variant</option>
          {variantsQuery.data?.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      )}
      <FieldError message={errors.variant?.message} />

      <button
        type="submit"
        disabled={!canSubmit || formBusy}
        className="landing-cta landing-modal__submit"
        aria-label={loading ? "Checking your car" : undefined}
      >
        {loading ? (
          <span className="landing-form-submit-loader" aria-hidden />
        ) : (
          <>
            Check your car
            <ArrowRight weight="bold" size={18} className="ml-1.5" />
          </>
        )}
      </button>

      {submitCheck.isError ? (
        <p className="landing-modal__error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
