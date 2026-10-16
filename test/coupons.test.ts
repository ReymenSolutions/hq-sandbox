import { test } from "node:test";
import assert from "node:assert/strict";
import { applyCoupon, discountCents } from "../src/coupons.js";

test("percent coupon", () => assert.deepEqual(applyCoupon(11600, { kind: "percent", value: 10 }), { discountCents: 1160, totalCents: 10440, ivaIncludedCents: 1440 }));
test("fixed coupon", () => assert.equal(applyCoupon(5000, { kind: "fixed", cents: 1000 }).totalCents, 4000));
test("coupon larger than total never goes below 0", () => assert.deepEqual(applyCoupon(500, { kind: "fixed", cents: 9999 }), { discountCents: 500, totalCents: 0, ivaIncludedCents: 0 }));
test("100% coupon", () => assert.equal(applyCoupon(777, { kind: "percent", value: 100 }).totalCents, 0));
test("no coupon leaves total unchanged", () => assert.equal(applyCoupon(1000).totalCents, 1000));
test("empty cart", () => assert.equal(applyCoupon(0, { kind: "percent", value: 50 }).totalCents, 0));
test("invalid coupons are rejected", () => {
  assert.throws(() => discountCents(1000, { kind: "percent", value: 101 }), /percent/);
  assert.throws(() => discountCents(1000, { kind: "percent", value: -1 }), /percent/);
  assert.throws(() => discountCents(1000, { kind: "fixed", cents: -5 }), /fixed/);
  assert.throws(() => discountCents(1000, { kind: "fixed", cents: 1.5 }), /fixed/);
  assert.throws(() => discountCents(-1, { kind: "fixed", cents: 1 }), /total/);
});
