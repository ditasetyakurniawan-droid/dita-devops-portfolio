export const BAND_STEP = 760;
export const BAND_HEIGHT = 1120;
export const BAND_OVERLAP = 160;
export const SPOTLIGHT_SIZE = 840;

type Bounds = Readonly<{ left: number; top: number; width: number; height: number }>;
type Point = Readonly<{ x: number; y: number }>;

export function getBandCount(height: number): number {
  return Math.max(1, Math.ceil((height + BAND_OVERLAP) / BAND_STEP));
}

/** Viewport coordinates are resolved afresh on pointer move, scroll and resize. */
export function getSpotlightPlacement(bounds: Bounds, pointer: Point, size: number, gridSize: number) {
  const localX = pointer.x - bounds.left;
  const localY = pointer.y - bounds.top;
  if (localX < 0 || localY < 0 || localX > bounds.width || localY > bounds.height) return null;
  const x = localX - size / 2;
  const y = localY - size / 2;
  return { x, y, gridX: ((-x % gridSize) + gridSize) % gridSize, gridY: ((-y % gridSize) + gridSize) % gridSize };
}
