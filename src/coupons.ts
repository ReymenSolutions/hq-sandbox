import { ivaIncludedCents } from "./cart.js";

export type Coupon = { kind: "percent"; value: number } | { kind: "fixed"; cents: number };

/** Descuento en centavos enteros (redondeo al centavo más cercano). Nunca excede el total ni es negativo. */
export function discountCents(totalCents: number, coupon: Coupon): number {
  if (!Number.isInteger(totalCents) || totalCents < 0) throw new Error("invalid total");
  if (coupon.kind === "percent") {
    if (!(coupon.value >= 0 && coupon.value <= 100)) throw new Error("invalid percent");
    return Math.min(totalCents, Math.round((totalCents * coupon.value) / 100));
  }
  if (!Number.isInteger(coupon.cents) || coupon.cents < 0) throw new Error("invalid fixed amount");
  return Math.min(totalCents, coupon.cents);
}

/** Total con cupón y el IVA incluido recalculado sobre el total ya descontado. */
export function applyCoupon(totalCents: number, coupon?: Coupon) {
  const discount = coupon ? discountCents(totalCents, coupon) : 0;
  const total = totalCents - discount;
  return { discountCents: discount, totalCents: total, ivaIncludedCents: ivaIncludedCents(total) };
}
