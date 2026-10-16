import { test } from "node:test";
import assert from "node:assert/strict";
import { subtotalCents, ivaIncludedCents, totalCents } from "../src/cart.js";

test("subtotal sums unit*qty", () => assert.equal(subtotalCents([{ sku: "a", unitCents: 1000, qty: 2 }, { sku: "b", unitCents: 550, qty: 1 }]), 2550));
test("empty cart is 0", () => assert.equal(totalCents([]), 0));
test("rejects invalid qty and price", () => {
  assert.throws(() => subtotalCents([{ sku: "a", unitCents: 100, qty: 0 }]), /qty/);
  assert.throws(() => subtotalCents([{ sku: "a", unitCents: -1, qty: 1 }]), /price/);
  assert.throws(() => subtotalCents([{ sku: "a", unitCents: 1.5, qty: 1 }]), /price/);
});
test("IVA contained in a 116.00 total is 16.00", () => assert.equal(ivaIncludedCents(11600), 1600));
