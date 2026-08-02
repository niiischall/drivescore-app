export type VehicleVariant = {
  id: string;
  name: string;
};

export type VehicleModel = {
  id: string;
  name: string;
  variants: VehicleVariant[];
};

export type VehicleBrand = {
  id: string;
  name: string;
  logoPath: string;
  models: VehicleModel[];
};

export type VehicleBrandSummary = {
  id: string;
  name: string;
  logoPath: string;
};

export type VehicleModelSummary = {
  id: string;
  name: string;
};

export type VehicleSelection = {
  brand: string;
  model: string;
  variant: string;
  label: string;
};
