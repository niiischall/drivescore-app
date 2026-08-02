import type {
  VehicleBrand,
  VehicleBrandSummary,
  VehicleModelSummary,
  VehicleSelection,
  VehicleVariant,
} from "./types";

const VEHICLE_CATALOG: VehicleBrand[] = [
  {
    id: "hyundai",
    name: "Hyundai",
    logoPath: "/logos/make-logo/logo-hyundai.webp",
    models: [
      {
        id: "creta",
        name: "Creta",
        variants: [
          { id: "e", name: "E" },
          { id: "executive", name: "Executive" },
          { id: "s", name: "S" },
          { id: "s-plus", name: "S+" },
          { id: "sx", name: "SX" },
          { id: "sx-o", name: "SX(O)" },
          { id: "knight", name: "Knight" },
        ],
      },
      {
        id: "venue",
        name: "Venue",
        variants: [
          { id: "e", name: "E" },
          { id: "s", name: "S" },
          { id: "s-plus", name: "S+" },
          { id: "sx", name: "SX" },
          { id: "sx-o", name: "SX(O)" },
        ],
      },
      {
        id: "verna",
        name: "Verna",
        variants: [
          { id: "ex", name: "EX" },
          { id: "s", name: "S" },
          { id: "sx", name: "SX" },
          { id: "sx-o", name: "SX(O)" },
        ],
      },
      {
        id: "exter",
        name: "Exter",
        variants: [
          { id: "ex", name: "EX" },
          { id: "s", name: "S" },
          { id: "sx", name: "SX" },
          { id: "sx-o", name: "SX(O)" },
        ],
      },
      {
        id: "alcazar",
        name: "Alcazar",
        variants: [
          { id: "executive", name: "Executive" },
          { id: "premium", name: "Premium" },
          { id: "prestige", name: "Prestige" },
          { id: "signature", name: "Signature" },
        ],
      },
      {
        id: "i20",
        name: "i20",
        variants: [
          { id: "magna", name: "Magna" },
          { id: "sportz", name: "Sportz" },
          { id: "asta", name: "Asta" },
          { id: "asta-o", name: "Asta(O)" },
        ],
      },
      {
        id: "aura",
        name: "Aura",
        variants: [
          { id: "e", name: "E" },
          { id: "s", name: "S" },
          { id: "sx", name: "SX" },
          { id: "sx-plus", name: "SX+" },
        ],
      },
      {
        id: "tucson",
        name: "Tucson",
        variants: [
          { id: "signature", name: "Signature" },
          { id: "signature-dark", name: "Signature Dark" },
        ],
      },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    logoPath: "/logos/make-logo/logo-kia.webp",
    models: [
      {
        id: "seltos",
        name: "Seltos",
        variants: [
          { id: "hte", name: "HTE" },
          { id: "htk", name: "HTK" },
          { id: "htk-plus", name: "HTK+" },
          { id: "htx", name: "HTX" },
          { id: "htx-plus", name: "HTX+" },
          { id: "gtx-plus", name: "GTX+" },
          { id: "x-line", name: "X-Line" },
        ],
      },
      {
        id: "sonet",
        name: "Sonet",
        variants: [
          { id: "hte", name: "HTE" },
          { id: "htk", name: "HTK" },
          { id: "htk-plus", name: "HTK+" },
          { id: "htx", name: "HTX" },
          { id: "htx-plus", name: "HTX+" },
          { id: "gtx-plus", name: "GTX+" },
          { id: "x-line", name: "X-Line" },
        ],
      },
      {
        id: "carens",
        name: "Carens",
        variants: [
          { id: "premium", name: "Premium" },
          { id: "prestige", name: "Prestige" },
          { id: "prestige-plus", name: "Prestige+" },
          { id: "luxury", name: "Luxury" },
          { id: "luxury-plus", name: "Luxury Plus" },
          { id: "x-line", name: "X-Line" },
        ],
      },
      {
        id: "syros",
        name: "Syros",
        variants: [
          { id: "htk", name: "HTK" },
          { id: "htk-plus", name: "HTK+" },
          { id: "htx", name: "HTX" },
          { id: "htx-plus", name: "HTX+" },
          { id: "gtx-plus", name: "GTX+" },
        ],
      },
      {
        id: "carnival",
        name: "Carnival",
        variants: [
          { id: "premium", name: "Premium" },
          { id: "prestige", name: "Prestige" },
          { id: "limousine", name: "Limousine" },
          { id: "limousine-plus", name: "Limousine+" },
        ],
      },
    ],
  },
  {
    id: "mahindra",
    name: "Mahindra",
    logoPath: "/logos/make-logo/logo-mahindra.webp",
    models: [
      {
        id: "xuv700",
        name: "XUV700",
        variants: [
          { id: "mx", name: "MX" },
          { id: "ax3", name: "AX3" },
          { id: "ax5", name: "AX5" },
          { id: "ax7", name: "AX7" },
          { id: "ax7-l", name: "AX7 L" },
        ],
      },
      {
        id: "xuv3xo",
        name: "XUV 3XO",
        variants: [
          { id: "mx1", name: "MX1" },
          { id: "ax5", name: "AX5" },
          { id: "ax5-l", name: "AX5 L" },
          { id: "ax7", name: "AX7" },
          { id: "ax7-l", name: "AX7 L" },
        ],
      },
      {
        id: "scorpio-n",
        name: "Scorpio N",
        variants: [
          { id: "z2", name: "Z2" },
          { id: "z4", name: "Z4" },
          { id: "z6", name: "Z6" },
          { id: "z8", name: "Z8" },
          { id: "z8-l", name: "Z8 L" },
        ],
      },
      {
        id: "thar",
        name: "Thar",
        variants: [
          { id: "ax", name: "AX" },
          { id: "ax-o", name: "AX(O)" },
          { id: "lx", name: "LX" },
        ],
      },
      {
        id: "thar-roxx",
        name: "Thar Roxx",
        variants: [
          { id: "mx1", name: "MX1" },
          { id: "ax5", name: "AX5" },
          { id: "ax7", name: "AX7" },
          { id: "ax7-l", name: "AX7 L" },
        ],
      },
      {
        id: "bolero",
        name: "Bolero",
        variants: [
          { id: "b4", name: "B4" },
          { id: "b6", name: "B6" },
          { id: "b6-o", name: "B6(O)" },
        ],
      },
      {
        id: "bolero-neo",
        name: "Bolero Neo",
        variants: [
          { id: "n4", name: "N4" },
          { id: "n8", name: "N8" },
          { id: "n10", name: "N10" },
          { id: "n10-o", name: "N10(O)" },
        ],
      },
      {
        id: "xuv400",
        name: "XUV400",
        variants: [
          { id: "ec", name: "EC" },
          { id: "el", name: "EL" },
          { id: "el-pro", name: "EL Pro" },
        ],
      },
    ],
  },
  {
    id: "renault",
    name: "Renault",
    logoPath: "/logos/make-logo/logo-renault.webp",
    models: [
      {
        id: "kiger",
        name: "Kiger",
        variants: [
          { id: "rxe", name: "RXE" },
          { id: "rxl", name: "RXL" },
          { id: "rxt", name: "RXT" },
          { id: "rxt-o", name: "RXT(O)" },
          { id: "rxz", name: "RXZ" },
        ],
      },
      {
        id: "triber",
        name: "Triber",
        variants: [
          { id: "rxe", name: "RXE" },
          { id: "rxl", name: "RXL" },
          { id: "rxt", name: "RXT" },
          { id: "rxz", name: "RXZ" },
        ],
      },
      {
        id: "kwid",
        name: "Kwid",
        variants: [
          { id: "rxe", name: "RXE" },
          { id: "rxl", name: "RXL" },
          { id: "rxt", name: "RXT" },
          { id: "climber", name: "Climber" },
          { id: "rxt-o", name: "RXT(O)" },
        ],
      },
    ],
  },
  {
    id: "skoda",
    name: "Skoda",
    logoPath: "/logos/make-logo/logo-skoda.webp",
    models: [
      {
        id: "kushaq",
        name: "Kushaq",
        variants: [
          { id: "active", name: "Active" },
          { id: "ambition", name: "Ambition" },
          { id: "style", name: "Style" },
          { id: "monte-carlo", name: "Monte Carlo" },
          { id: "onyx", name: "Onyx" },
        ],
      },
      {
        id: "slavia",
        name: "Slavia",
        variants: [
          { id: "active", name: "Active" },
          { id: "ambition", name: "Ambition" },
          { id: "style", name: "Style" },
          { id: "monte-carlo", name: "Monte Carlo" },
          { id: "onyx", name: "Onyx" },
        ],
      },
      {
        id: "kylaq",
        name: "Kylaq",
        variants: [
          { id: "classic", name: "Classic" },
          { id: "signature", name: "Signature" },
          { id: "signature-plus", name: "Signature+" },
          { id: "prestige", name: "Prestige" },
          { id: "prestige-plus", name: "Prestige+" },
        ],
      },
      {
        id: "kodiaq",
        name: "Kodiaq",
        variants: [
          { id: "sportline", name: "Sportline" },
          { id: "prestige", name: "Prestige" },
          { id: "l-k", name: "L&K" },
        ],
      },
      {
        id: "superb",
        name: "Superb",
        variants: [
          { id: "sportline", name: "Sportline" },
          { id: "l-k", name: "L&K" },
        ],
      },
    ],
  },
  {
    id: "suzuki",
    name: "Maruti Suzuki",
    logoPath: "/logos/make-logo/logo-suzuki.webp",
    models: [
      {
        id: "wagon-r",
        name: "Wagon R",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "swift",
        name: "Swift",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "baleno",
        name: "Baleno",
        variants: [
          { id: "sigma", name: "Sigma" },
          { id: "delta", name: "Delta" },
          { id: "zeta", name: "Zeta" },
          { id: "alpha", name: "Alpha" },
        ],
      },
      {
        id: "fronx",
        name: "Fronx",
        variants: [
          { id: "sigma", name: "Sigma" },
          { id: "delta", name: "Delta" },
          { id: "zeta", name: "Zeta" },
          { id: "alpha", name: "Alpha" },
          { id: "alpha-plus", name: "Alpha+" },
        ],
      },
      {
        id: "brezza",
        name: "Brezza",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "grand-vitara",
        name: "Grand Vitara",
        variants: [
          { id: "sigma", name: "Sigma" },
          { id: "delta", name: "Delta" },
          { id: "zeta", name: "Zeta" },
          { id: "zeta-plus", name: "Zeta+" },
          { id: "alpha", name: "Alpha" },
          { id: "alpha-plus", name: "Alpha+" },
        ],
      },
      {
        id: "ertiga",
        name: "Ertiga",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "dzire",
        name: "Dzire",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "invicto",
        name: "Invicto",
        variants: [
          { id: "zeta-plus", name: "Zeta+" },
          { id: "alpha", name: "Alpha" },
          { id: "alpha-plus", name: "Alpha+" },
        ],
      },
      {
        id: "jimny",
        name: "Jimny",
        variants: [
          { id: "zeta", name: "Zeta" },
          { id: "alpha", name: "Alpha" },
        ],
      },
      {
        id: "celerio",
        name: "Celerio",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "zxi", name: "ZXI" },
          { id: "zxi-plus", name: "ZXI+" },
        ],
      },
      {
        id: "alto-k10",
        name: "Alto K10",
        variants: [
          { id: "lxi", name: "LXI" },
          { id: "vxi", name: "VXI" },
          { id: "vxi-plus", name: "VXI+" },
          { id: "zxi", name: "ZXI" },
        ],
      },
    ],
  },
  {
    id: "tata",
    name: "Tata",
    logoPath: "/logos/make-logo/logo-tata.webp",
    models: [
      {
        id: "nexon",
        name: "Nexon",
        variants: [
          { id: "smart", name: "Smart" },
          { id: "smart-plus", name: "Smart+" },
          { id: "pure", name: "Pure" },
          { id: "pure-plus", name: "Pure+" },
          { id: "creative", name: "Creative" },
          { id: "creative-plus", name: "Creative+" },
          { id: "fearless", name: "Fearless" },
          { id: "fearless-plus", name: "Fearless+" },
        ],
      },
      {
        id: "punch",
        name: "Punch",
        variants: [
          { id: "pure", name: "Pure" },
          { id: "adventure", name: "Adventure" },
          { id: "accomplished", name: "Accomplished" },
          { id: "creative", name: "Creative" },
          { id: "empowered", name: "Empowered" },
        ],
      },
      {
        id: "harrier",
        name: "Harrier",
        variants: [
          { id: "smart", name: "Smart" },
          { id: "pure", name: "Pure" },
          { id: "adventure", name: "Adventure" },
          { id: "fearless", name: "Fearless" },
          { id: "fearless-plus", name: "Fearless+" },
        ],
      },
      {
        id: "safari",
        name: "Safari",
        variants: [
          { id: "smart", name: "Smart" },
          { id: "pure", name: "Pure" },
          { id: "adventure", name: "Adventure" },
          { id: "fearless", name: "Fearless" },
          { id: "fearless-plus", name: "Fearless+" },
        ],
      },
      {
        id: "altroz",
        name: "Altroz",
        variants: [
          { id: "xe", name: "XE" },
          { id: "xm", name: "XM" },
          { id: "xm-plus", name: "XM+" },
          { id: "xt", name: "XT" },
          { id: "xz", name: "XZ" },
          { id: "xz-plus", name: "XZ+" },
        ],
      },
      {
        id: "tiago",
        name: "Tiago",
        variants: [
          { id: "xe", name: "XE" },
          { id: "xm", name: "XM" },
          { id: "xt", name: "XT" },
          { id: "xz", name: "XZ" },
          { id: "xz-plus", name: "XZ+" },
        ],
      },
      {
        id: "tigor",
        name: "Tigor",
        variants: [
          { id: "xe", name: "XE" },
          { id: "xm", name: "XM" },
          { id: "xz", name: "XZ" },
          { id: "xz-plus", name: "XZ+" },
        ],
      },
      {
        id: "curvv",
        name: "Curvv",
        variants: [
          { id: "smart", name: "Smart" },
          { id: "pure", name: "Pure" },
          { id: "pure-plus", name: "Pure+" },
          { id: "creative", name: "Creative" },
          { id: "accomplished", name: "Accomplished" },
          { id: "empowered", name: "Empowered" },
        ],
      },
    ],
  },
  {
    id: "toyota",
    name: "Toyota",
    logoPath: "/logos/make-logo/logo-toyota.webp",
    models: [
      {
        id: "innova-crysta",
        name: "Innova Crysta",
        variants: [
          { id: "gx", name: "GX" },
          { id: "gx-plus", name: "GX+" },
          { id: "vx", name: "VX" },
          { id: "zx", name: "ZX" },
        ],
      },
      {
        id: "innova-hycross",
        name: "Innova Hycross",
        variants: [
          { id: "g", name: "G" },
          { id: "gx", name: "GX" },
          { id: "gx-plus", name: "GX+" },
          { id: "vx", name: "VX" },
          { id: "zx", name: "ZX" },
        ],
      },
      {
        id: "fortuner",
        name: "Fortuner",
        variants: [
          { id: "4x2", name: "4x2" },
          { id: "4x4", name: "4x4" },
          { id: "legender", name: "Legender" },
          { id: "gr-s", name: "GR-S" },
        ],
      },
      {
        id: "hyryder",
        name: "Hyryder",
        variants: [
          { id: "e", name: "E" },
          { id: "s", name: "S" },
          { id: "g", name: "G" },
          { id: "v", name: "V" },
        ],
      },
      {
        id: "glanza",
        name: "Glanza",
        variants: [
          { id: "e", name: "E" },
          { id: "s", name: "S" },
          { id: "g", name: "G" },
          { id: "v", name: "V" },
        ],
      },
      {
        id: "rumion",
        name: "Rumion",
        variants: [
          { id: "s", name: "S" },
          { id: "g", name: "G" },
          { id: "v", name: "V" },
        ],
      },
      {
        id: "taisor",
        name: "Taisor",
        variants: [
          { id: "e", name: "E" },
          { id: "s", name: "S" },
          { id: "s-plus", name: "S+" },
          { id: "g", name: "G" },
          { id: "v", name: "V" },
        ],
      },
      {
        id: "camry",
        name: "Camry",
        variants: [
          { id: "elegance", name: "Elegance" },
          { id: "sprint", name: "Sprint" },
        ],
      },
    ],
  },
];

function findBrand(brandId: string): VehicleBrand | undefined {
  return VEHICLE_CATALOG.find((b) => b.id === brandId);
}

export function getBrands(): VehicleBrandSummary[] {
  return VEHICLE_CATALOG.map(({ id, name, logoPath }) => ({
    id,
    name,
    logoPath,
  }));
}

export function getModels(brandId: string): VehicleModelSummary[] | null {
  const brand = findBrand(brandId);
  if (!brand) return null;
  return brand.models.map(({ id, name }) => ({ id, name }));
}

export function getVariants(
  brandId: string,
  modelId: string,
): VehicleVariant[] | null {
  const brand = findBrand(brandId);
  if (!brand) return null;
  const model = brand.models.find((m) => m.id === modelId);
  if (!model) return null;
  return model.variants;
}

export function buildVehicleLabel(
  brandId: string,
  modelId: string,
  variantId: string,
): string | null {
  const brand = findBrand(brandId);
  if (!brand) return null;
  const model = brand.models.find((m) => m.id === modelId);
  if (!model) return null;
  const variant = model.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  return `${brand.name} ${model.name} ${variant.name}`;
}

export function isValidSelection(
  brandId: string,
  modelId: string,
  variantId: string,
): boolean {
  return buildVehicleLabel(brandId, modelId, variantId) !== null;
}

export function resolveVehicleSelection(
  brandId: string,
  modelId: string,
  variantId: string,
): VehicleSelection | null {
  const label = buildVehicleLabel(brandId, modelId, variantId);
  if (!label) return null;
  return { brand: brandId, model: modelId, variant: variantId, label };
}
