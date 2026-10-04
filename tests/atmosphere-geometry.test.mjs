import test from "node:test";
import assert from "node:assert/strict";
import {
  getSpotlightPlacement, getBandCount,
  SPOTLIGHT_SIZE, BAND_HEIGHT, BAND_STEP, BAND_OVERLAP,
} from "../src/components/background/atmosphere-geometry.ts";

test("the halo stays centered below the old 950px cut-off and through expertise", () => {
  const bounds = { left: 0, top: 80, width: 1920, height: 5400 };
  for (const depth of [100, 949, 950, 951, 1800, 3200, 5399]) {
    const result = getSpotlightPlacement(bounds, { x: 320, y: depth + 80 }, SPOTLIGHT_SIZE, 76);
    assert.ok(result, "Halo should exist at depth " + depth);
    assert.equal(result.x + SPOTLIGHT_SIZE / 2, 320);
    assert.equal(result.y + SPOTLIGHT_SIZE / 2, depth);
  }
});

test("a stationary pointer remains centered in the viewport after scrolling", () => {
  const pointer = { x: 260, y: 420 };
  for (const top of [80, -870, -1800, -3900]) {
    const result = getSpotlightPlacement({ left: 0, top, width: 1920, height: 5400 }, pointer, SPOTLIGHT_SIZE, 76);
    assert.ok(result);
    assert.equal(top + result.y + SPOTLIGHT_SIZE / 2, pointer.y);
  }
});

test("revealed grid lines stay aligned for negative and positive halo origins", () => {
  const bounds = { left: 25, top: -1200, width: 1920, height: 5400 };
  for (const pointer of [{ x: 26, y: 10 }, { x: 720, y: 530 }, { x: 1910, y: 980 }]) {
    const result = getSpotlightPlacement(bounds, pointer, SPOTLIGHT_SIZE, 76);
    assert.ok(result);
    assert.ok(Math.abs((result.x + result.gridX) % 76) < 0.000001);
    assert.ok(Math.abs((result.y + result.gridY) % 76) < 0.000001);
  }
});

test("the halo is hidden outside the shared scene", () => {
  const bounds = { left: 20, top: -500, width: 1200, height: 1800 };
  for (const pointer of [{ x: 0, y: 200 }, { x: 1300, y: 200 }, { x: 600, y: 1301 }]) {
    assert.equal(getSpotlightPlacement(bounds, pointer, SPOTLIGHT_SIZE, 76), null);
  }
});

test("short, desktop and tall mobile layouts all retain overlapping background coverage", () => {
  for (const height of [640, 950, 2700, 5400, 8000]) {
    const count = getBandCount(height);
    const intervals = Array.from({ length: count }, (_, index) => ({
      start: index * BAND_STEP - BAND_OVERLAP,
      end: index * BAND_STEP - BAND_OVERLAP + BAND_HEIGHT,
    }));
    assert.ok(intervals[0].start < 0);
    assert.ok(intervals.at(-1).end > height);
    for (let i = 1; i < intervals.length; i++) {
      assert.ok(intervals[i].start < intervals[i - 1].end);
    }
  }
});
