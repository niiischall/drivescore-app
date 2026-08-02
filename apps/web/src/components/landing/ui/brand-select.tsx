"use client";

import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import type { VehicleBrandSummary } from "@/lib/vehicles/types";

type BrandSelectProps = {
  id: string;
  brands: VehicleBrandSummary[];
  value: string;
  disabled?: boolean;
  loading?: boolean;
  invalid?: boolean;
  onChange: (brandId: string) => void;
  onBlur?: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

export function BrandSelect({
  id,
  brands,
  value,
  disabled = false,
  loading = false,
  invalid = false,
  onChange,
  onBlur,
  triggerRef,
}: BrandSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const internalTriggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const selected = brands.find((b) => b.id === value) ?? null;
  const isDisabled = disabled || loading;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        closeMenu();
      }
    }

    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function setTriggerRef(node: HTMLButtonElement | null) {
    internalTriggerRef.current = node;
    if (triggerRef) triggerRef.current = node;
  }

  function closeMenu() {
    setOpen(false);
    setHighlightIndex(-1);
    onBlur?.();
  }

  function selectBrand(brandId: string) {
    onChange(brandId);
    closeMenu();
    internalTriggerRef.current?.focus();
  }

  function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (isDisabled) return;

    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
        setHighlightIndex(
          selected ? brands.findIndex((b) => b.id === selected.id) : 0,
        );
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, brands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const brand = brands[highlightIndex >= 0 ? highlightIndex : 0];
      if (brand) selectBrand(brand.id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlightIndex(brands.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  }

  return (
    <div
      ref={rootRef}
      className={`landing-brand-select${open ? " landing-brand-select--open" : ""}`}
    >
      <button
        ref={setTriggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-disabled={isDisabled}
        aria-invalid={invalid || undefined}
        disabled={isDisabled}
        className="landing-brand-select__trigger landing-modal__input"
        onClick={() => {
          if (isDisabled) return;
          if (open) {
            closeMenu();
          } else {
            setOpen(true);
          }
        }}
        onBlur={onBlur}
        onKeyDown={handleTriggerKeyDown}
      >
        {selected ? (
          <>
            <BrandLogo brand={selected} />
            <span className="landing-brand-select__label">{selected.name}</span>
          </>
        ) : (
          <span className="landing-brand-select__placeholder">Select brand</span>
        )}
        <CaretDown
          weight="bold"
          size={14}
          className="landing-brand-select__chevron"
          aria-hidden
        />
      </button>

      {open && brands.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="landing-brand-select__menu"
        >
          {brands.map((brand, index) => {
            const isSelected = brand.id === value;
            const isHighlighted = index === highlightIndex;
            return (
              <li key={brand.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`landing-brand-select__option${isSelected ? " landing-brand-select__option--selected" : ""}${isHighlighted ? " landing-brand-select__option--highlighted" : ""}`}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => selectBrand(brand.id)}
                >
                  <BrandLogo brand={brand} />
                  <span className="landing-brand-select__label">{brand.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function BrandLogo({ brand }: { brand: VehicleBrandSummary }) {
  return (
    <span className="landing-brand-select__logo">
      <Image
        src={brand.logoPath}
        alt=""
        width={28}
        height={28}
        className="landing-brand-select__logo-img"
        unoptimized
      />
    </span>
  );
}
