/** Mini carrito de ejemplo para pruebas de AI Headquarters. Montos en centavos (enteros). */
export interface Line { sku: string; unitCents: number; qty: number }

export function subtotalCents(lines: Line[]): number {
  return lines.reduce((s, l) => {
    if (!Number.isInteger(l.unitCents) || l.unitCents < 0) throw new Error(`invalid price for ${l.sku}`);
    if (!Number.isInteger(l.qty) || l.qty <= 0) throw new Error(`invalid qty for ${l.sku}`);
    return s + l.unitCents * l.qty;
  }, 0);
}

/** IVA incluido en el precio (México 16 %): devuelve la porción de IVA contenida en el total. */
export function ivaIncludedCents(totalCents: number, ratePct = 16): number {
  return Math.round(totalCents - totalCents / (1 + ratePct / 100));
}

export function totalCents(lines: Line[]): number { return subtotalCents(lines); }
