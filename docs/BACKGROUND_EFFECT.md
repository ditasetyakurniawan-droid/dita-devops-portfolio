# Continuous atmosphere — Phase 3.4

## Scope and fix

One decorative surface covers Hero → system demo → the entire Expertise section.
Work begins outside that surface. The cursor halo works anywhere inside it.

The previous implementation clipped the spotlight at 950px, restricted topology
to a 930px SVG, and only refreshed cursor coordinates on pointer movement.
These three constraints are removed:

- The spotlight is an 840px square centered on the pointer, translated within the
  whole surface. Its soft radial mask travels with it; there is no 950px boundary.
- Pointer, scroll and resize events share one scheduled animation frame. A
  stationary cursor stays centered while the document scrolls underneath it.
- The spotlight grid offsets compensate for its position, keeping the grid
  aligned with the static 76px grid.
- Topology is a repeating SVG whose main path meets at the top and bottom edges.
- ResizeObserver measures scene height and supplies enough overlapping animation
  bands for desktop, mobile and later content changes. Bands fade into one another.

## Integration

The single shared wrapper already lives in src/app/page.tsx:

```tsx
<div className="relative isolate overflow-hidden">
  <AmbientAtmosphere />
  <div className="relative z-10">
    <HeroSection />
    {/* Keep the existing terminal section and its layout classes here. */}
    <ExpertiseSection />
  </div>
</div>
```

Do not put a second background inside HeroSection. The decorative root owns
absolute inset-0 z-0 pointer-events-none and aria-hidden; content owns relative z-10.

## Motion and lifecycle

- Aura drift: 16–18s. Orbital light: 23–26s. Signal: 6.5s with a 0.8s pause.
- Each 1120px band starts 760px after its predecessor; soft masks overlap.
- Each band observes its own visibility. Transform/opacity loops stop when its
  band is outside the viewport or the document is hidden.
- Reduced motion produces a static scene and disables spotlight, signals and
  orbital lights. Touch devices do not require a cursor effect.
- Cleanup cancels a pending animation frame, disconnects observers and removes
  all pointer/scroll/resize/visibility/media-query listeners.
- The 840px spotlight limits changing grid paint to a bounded area. Its background
  position still incurs paint; FPS and Lighthouse need measurement on target devices.
- Decorative elements are absolute, so measuring and adding bands changes no
  document layout or card position.

## Files

- src/components/background/AmbientAtmosphere.tsx — lifecycle, bands and spotlight.
- src/components/background/atmosphere-geometry.ts — coverage and coordinate math.
- src/app/globals.css — masks, texture, colors and shared grid.
- public/infrastructure-routes.svg — seamless vertical topology.
- public/noise.svg — static grain.
- tests/atmosphere-geometry.test.mjs — coordinate and coverage regressions.

## Automated checks

With the project's Node 22 runtime:

```bash
node --experimental-strip-types --test tests/atmosphere-geometry.test.mjs
npm run typecheck
npm run build
```

The five regression tests cover the former 950px boundary, scrolling with a
stationary cursor, grid registration, scene exit, and short/desktop/tall mobile
coverage. They test geometry; they do not substitute for browser visual checks.

## Browser acceptance check

1. On desktop, move the cursor in the side gutter around the transition from Hero
   into the terminal. The glow should retain a round, softly fading edge.
2. Keep the pointer still and scroll through the terminal into Expertise. The
   glow should stay centered under it; grid lines should not slide against each other.
3. Move through the gutters around both rows of Expertise cards and to the final
   card. The same glow, topology and animated atmosphere should remain present.
4. Scroll beyond Expertise into Work. The scene ends at that intended boundary.
5. Check 390px, 768px and desktop widths for horizontal overflow and readable cards.
6. With reduced motion enabled, verify a static scene and working links/buttons.
7. Check DevTools console, keyboard focus, FPS and Lighthouse on the target device.

Current validation: geometry tests, TypeScript and production build passed.
No browser binary is available in the build workspace; browser rendering, device
FPS and Lighthouse are not yet measured. Visual sign-off remains with Dita.
