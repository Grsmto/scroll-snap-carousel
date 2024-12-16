# (Mon Dec 16 2024)

#### ⚠️ Pushed to `main`

- update auto (adrien.denat@qatalog.com)
- add nvmrc + eslintrc ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- chore: update Jest (adrien.denat@qatalog.com)
- chore: add svelte from dev script (adrien.denat@qatalog.com)
- chore: build and test packages before release... (adrien.denat@qatalog.com)
- chore(docs): improve Storybook example styling (adrien.denat@qatalog.com)
- chore(docs): refactor styles (adrien.denat@qatalog.com)
- chore(docs): move to Astro instead of Remix (adrien.denat@qatalog.com)
- feat(docs): add base Storybook + doc website (adrien.denat@qatalog.com)
- chore: try again to fix publishing failing with yarn (adrien.denat@qatalog.com)
- chore: add lerna command to simplify dev env (adrien.denat@qatalog.com)
- Update README.md (adrien.denat@qatalog.com)
- chore: upgrade Auto to latest version (adrien.denat@qatalog.com)
- yarn lock update (adrien.denat@qatalog.com)
- chore: update yarn.lock (adrien.denat@qatalog.com)
- chore: remove useless fields in package.json (adrien.denat@qatalog.com)
- `@snap-carousel/svelte@0.0.19`
  - fix svelte core dep (adrien.denat@qatalog.com)
  - Update versions (adrien.denat@qatalog.com)
  - fix(svelte): fix publish after svelte-package update (adrien.denat@qatalog.com)
  - fix(svelte): fix getActiveIndex (adrien.denat@qatalog.com)
  - chore(svelte): remove test script (adrien.denat@qatalog.com)
  - chore(svelte): update after core change (adrien.denat@qatalog.com)
  - chore(svelte): add Sveltkit for package publishing (adrien.denat@qatalog.com)
  - chore(svelte): fix missing dist folder in release (adrien.denat@qatalog.com)
  - feat(svelte): export scrollTo function for external usage (adrien.denat@qatalog.com)
  - fix(svelte): rework Svelte package (adrien.denat@qatalog.com)
  - chore(svelte): rework package (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`
  - remove test setup until we have tests (adrien.denat@qatalog.com)
  - chore(core|react): migrate to pnpm + tsup ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - chore: update READMEs (adrien.denat@qatalog.com)
  - feat(react): add new components SnapCarouselIndicator SnapCarouselNavPrev SnapCarouselNavNext (adrien.denat@qatalog.com)
  - feat(core|react): do not return index from scrollTo function anymore (adrien.denat@qatalog.com)
  - chore: upgrade rollup + typescript plugin (adrien.denat@qatalog.com)
  - bump versions (adrien.denat@qatalog.com)
  - chore: rename package to @snap-carousel (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`, `@snap-carousel/svelte@0.0.19`
  - Merge branch 'next' ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - update to Vite ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - Update versions (adrien.denat@qatalog.com)
  - chore: dependencies updates (adrien.denat@qatalog.com)
  - chore: add repository field to package.json (adrien.denat@qatalog.com)
  - chore: set packages publish config (adrien.denat@qatalog.com)
  - Merge branch 'develop' (adrien.denat@qatalog.com)
  - chore: refactor Rollup TS compilation (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`
  - fix(core): fix observer being cleaned up before triggering ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(core): add onScrollEnd callback to scrollTo function (adrien.denat@qatalog.com)
  - chore(core): active snap is now a class (adrien.denat@qatalog.com)
  - fix(core): fix getActiveSnap intersection observers leak (adrien.denat@qatalog.com)
  - chore(docs): add example for carousel with padding (adrien.denat@qatalog.com)
  - feat(core): improve scrollTo animation when it's a partial move (adrien.denat@qatalog.com)
  - feat(core): rework active snap observers to compute snap-align per item instead of globally (adrien.denat@qatalog.com)
  - feat(core): add support for padding/scroll-padding on container (adrien.denat@qatalog.com)
  - chore(core): remove padding from alignment calculations (adrien.denat@qatalog.com)
  - feat(core): snapAlign is now defined by an option instead of checking the CSS (adrien.denat@qatalog.com)
  - fix(core): add exception when dragging to last carousel item to stick to it (adrien.denat@qatalog.com)
  - feat(core): add support for swipe (adrien.denat@qatalog.com)
  - fix(core): take into account item snapAlign to calculation items position (adrien.denat@qatalog.com)
  - Merge branch 'main' into next (adrien.denat@qatalog.com)
  - chore: cleanup changelogs (adrien.denat@qatalog.com)
  - fix(core): fix drag class not removed properly + rename .snaplist_drag class to .scrolling (adrien.denat@qatalog.com)
  - feat(core): make duration of scroll configurable + better handling of drag/scroll conflicts (adrien.denat@qatalog.com)
  - chore: refactor types after TS upgrade (adrien.denat@qatalog.com)
  - chore: remove attempt of using web-components for now (adrien.denat@qatalog.com)
  - chore: remove hack for compiling TS types and use recommended workaround for Rollup instead (adrien.denat@qatalog.com)
  - chore(core): rework smoothScroll detection support (adrien.denat@qatalog.com)
  - fix(core): fix calculation for active snap (adrien.denat@qatalog.com)
  - fix(core): remove normalizing of values that blocks carousel from going to first/last slide in certain conditions (adrien.denat@qatalog.com)
  - fix(core): fix a bug where snaplist_drag class is never removed (adrien.denat@qatalog.com)
  - chore: add base component file (adrien.denat@qatalog.com)
  - chore(core): add stencil components (adrien.denat@qatalog.com)
- `@snap-carousel/react@0.0.21`
  - chore(react): upgrade storybook ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(react): add accessibility props to SnapCarouselIndicator (adrien.denat@qatalog.com)
  - fix(react): fix typings of components (adrien.denat@qatalog.com)
  - chore(react): add a bunch of stories test + add onScrollEnd prop (adrien.denat@qatalog.com)
  - chore: move Storybook to react package (adrien.denat@qatalog.com)
  - feat(react): add missing styles (adrien.denat@qatalog.com)
  - feat(react): add support for className prop (adrien.denat@qatalog.com)
  - chore: fix typing (adrien.denat@qatalog.com)
  - feat(react): add support for index change callback + controlled carousel on SnapCarousel component (adrien.denat@qatalog.com)
  - chore: update react version + change dev script name (adrien.denat@qatalog.com)
  - chore(react): cleanup React package (adrien.denat@qatalog.com)
  - fix(react): fix missing types (adrien.denat@qatalog.com)
  - feat(react): add SnapCarousel component (adrien.denat@qatalog.com)
  - feat(react): improve useScroll hook to not flicker when scrollTo called multiple times with same index (adrien.denat@qatalog.com)
  - update react dep version (adrien.denat@qatalog.com)
  - fix(react): fix not building (adrien.denat@qatalog.com)
  - chore: poc web-component using Stencil (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/svelte@0.0.19`
  - feat(core): add get function to retrieve active index (adrien.denat@qatalog.com)

#### Authors: 2

- Adrien ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Mon Dec 16 2024)

#### ⚠️ Pushed to `main`

- update auto (adrien.denat@qatalog.com)
- add nvmrc + eslintrc ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- chore: update Jest (adrien.denat@qatalog.com)
- chore: add svelte from dev script (adrien.denat@qatalog.com)
- chore: build and test packages before release... (adrien.denat@qatalog.com)
- chore(docs): improve Storybook example styling (adrien.denat@qatalog.com)
- chore(docs): refactor styles (adrien.denat@qatalog.com)
- chore(docs): move to Astro instead of Remix (adrien.denat@qatalog.com)
- feat(docs): add base Storybook + doc website (adrien.denat@qatalog.com)
- chore: try again to fix publishing failing with yarn (adrien.denat@qatalog.com)
- chore: add lerna command to simplify dev env (adrien.denat@qatalog.com)
- Update README.md (adrien.denat@qatalog.com)
- chore: upgrade Auto to latest version (adrien.denat@qatalog.com)
- yarn lock update (adrien.denat@qatalog.com)
- chore: update yarn.lock (adrien.denat@qatalog.com)
- chore: remove useless fields in package.json (adrien.denat@qatalog.com)
- `@snap-carousel/svelte@0.0.19`
  - fix svelte core dep (adrien.denat@qatalog.com)
  - Update versions (adrien.denat@qatalog.com)
  - fix(svelte): fix publish after svelte-package update (adrien.denat@qatalog.com)
  - fix(svelte): fix getActiveIndex (adrien.denat@qatalog.com)
  - chore(svelte): remove test script (adrien.denat@qatalog.com)
  - chore(svelte): update after core change (adrien.denat@qatalog.com)
  - chore(svelte): add Sveltkit for package publishing (adrien.denat@qatalog.com)
  - chore(svelte): fix missing dist folder in release (adrien.denat@qatalog.com)
  - feat(svelte): export scrollTo function for external usage (adrien.denat@qatalog.com)
  - fix(svelte): rework Svelte package (adrien.denat@qatalog.com)
  - chore(svelte): rework package (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`
  - remove test setup until we have tests (adrien.denat@qatalog.com)
  - chore(core|react): migrate to pnpm + tsup ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - chore: update READMEs (adrien.denat@qatalog.com)
  - feat(react): add new components SnapCarouselIndicator SnapCarouselNavPrev SnapCarouselNavNext (adrien.denat@qatalog.com)
  - feat(core|react): do not return index from scrollTo function anymore (adrien.denat@qatalog.com)
  - chore: upgrade rollup + typescript plugin (adrien.denat@qatalog.com)
  - bump versions (adrien.denat@qatalog.com)
  - chore: rename package to @snap-carousel (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`, `@snap-carousel/svelte@0.0.19`
  - Merge branch 'next' ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - update to Vite ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - Update versions (adrien.denat@qatalog.com)
  - chore: dependencies updates (adrien.denat@qatalog.com)
  - chore: add repository field to package.json (adrien.denat@qatalog.com)
  - chore: set packages publish config (adrien.denat@qatalog.com)
  - Merge branch 'develop' (adrien.denat@qatalog.com)
  - chore: refactor Rollup TS compilation (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`
  - fix(core): fix observer being cleaned up before triggering ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(core): add onScrollEnd callback to scrollTo function (adrien.denat@qatalog.com)
  - chore(core): active snap is now a class (adrien.denat@qatalog.com)
  - fix(core): fix getActiveSnap intersection observers leak (adrien.denat@qatalog.com)
  - chore(docs): add example for carousel with padding (adrien.denat@qatalog.com)
  - feat(core): improve scrollTo animation when it's a partial move (adrien.denat@qatalog.com)
  - feat(core): rework active snap observers to compute snap-align per item instead of globally (adrien.denat@qatalog.com)
  - feat(core): add support for padding/scroll-padding on container (adrien.denat@qatalog.com)
  - chore(core): remove padding from alignment calculations (adrien.denat@qatalog.com)
  - feat(core): snapAlign is now defined by an option instead of checking the CSS (adrien.denat@qatalog.com)
  - fix(core): add exception when dragging to last carousel item to stick to it (adrien.denat@qatalog.com)
  - feat(core): add support for swipe (adrien.denat@qatalog.com)
  - fix(core): take into account item snapAlign to calculation items position (adrien.denat@qatalog.com)
  - Merge branch 'main' into next (adrien.denat@qatalog.com)
  - chore: cleanup changelogs (adrien.denat@qatalog.com)
  - fix(core): fix drag class not removed properly + rename .snaplist_drag class to .scrolling (adrien.denat@qatalog.com)
  - feat(core): make duration of scroll configurable + better handling of drag/scroll conflicts (adrien.denat@qatalog.com)
  - chore: refactor types after TS upgrade (adrien.denat@qatalog.com)
  - chore: remove attempt of using web-components for now (adrien.denat@qatalog.com)
  - chore: remove hack for compiling TS types and use recommended workaround for Rollup instead (adrien.denat@qatalog.com)
  - chore(core): rework smoothScroll detection support (adrien.denat@qatalog.com)
  - fix(core): fix calculation for active snap (adrien.denat@qatalog.com)
  - fix(core): remove normalizing of values that blocks carousel from going to first/last slide in certain conditions (adrien.denat@qatalog.com)
  - fix(core): fix a bug where snaplist_drag class is never removed (adrien.denat@qatalog.com)
  - chore: add base component file (adrien.denat@qatalog.com)
  - chore(core): add stencil components (adrien.denat@qatalog.com)
- `@snap-carousel/react@0.0.21`
  - chore(react): upgrade storybook ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(react): add accessibility props to SnapCarouselIndicator (adrien.denat@qatalog.com)
  - fix(react): fix typings of components (adrien.denat@qatalog.com)
  - chore(react): add a bunch of stories test + add onScrollEnd prop (adrien.denat@qatalog.com)
  - chore: move Storybook to react package (adrien.denat@qatalog.com)
  - feat(react): add missing styles (adrien.denat@qatalog.com)
  - feat(react): add support for className prop (adrien.denat@qatalog.com)
  - chore: fix typing (adrien.denat@qatalog.com)
  - feat(react): add support for index change callback + controlled carousel on SnapCarousel component (adrien.denat@qatalog.com)
  - chore: update react version + change dev script name (adrien.denat@qatalog.com)
  - chore(react): cleanup React package (adrien.denat@qatalog.com)
  - fix(react): fix missing types (adrien.denat@qatalog.com)
  - feat(react): add SnapCarousel component (adrien.denat@qatalog.com)
  - feat(react): improve useScroll hook to not flicker when scrollTo called multiple times with same index (adrien.denat@qatalog.com)
  - update react dep version (adrien.denat@qatalog.com)
  - fix(react): fix not building (adrien.denat@qatalog.com)
  - chore: poc web-component using Stencil (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/svelte@0.0.19`
  - feat(core): add get function to retrieve active index (adrien.denat@qatalog.com)

#### Authors: 2

- Adrien ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Mon Dec 16 2024)

#### ⚠️ Pushed to `main`

- update auto (adrien.denat@qatalog.com)
- add nvmrc + eslintrc ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- chore: update Jest (adrien.denat@qatalog.com)
- chore: add svelte from dev script (adrien.denat@qatalog.com)
- chore: build and test packages before release... (adrien.denat@qatalog.com)
- chore(docs): improve Storybook example styling (adrien.denat@qatalog.com)
- chore(docs): refactor styles (adrien.denat@qatalog.com)
- chore(docs): move to Astro instead of Remix (adrien.denat@qatalog.com)
- feat(docs): add base Storybook + doc website (adrien.denat@qatalog.com)
- chore: try again to fix publishing failing with yarn (adrien.denat@qatalog.com)
- chore: add lerna command to simplify dev env (adrien.denat@qatalog.com)
- Update README.md (adrien.denat@qatalog.com)
- chore: upgrade Auto to latest version (adrien.denat@qatalog.com)
- yarn lock update (adrien.denat@qatalog.com)
- chore: update yarn.lock (adrien.denat@qatalog.com)
- chore: remove useless fields in package.json (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`
  - remove test setup until we have tests (adrien.denat@qatalog.com)
  - chore(core|react): migrate to pnpm + tsup ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - chore: update READMEs (adrien.denat@qatalog.com)
  - feat(react): add new components SnapCarouselIndicator SnapCarouselNavPrev SnapCarouselNavNext (adrien.denat@qatalog.com)
  - feat(core|react): do not return index from scrollTo function anymore (adrien.denat@qatalog.com)
  - chore: upgrade rollup + typescript plugin (adrien.denat@qatalog.com)
  - bump versions (adrien.denat@qatalog.com)
  - chore: rename package to @snap-carousel (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/react@0.0.21`, `@snap-carousel/svelte@0.0.19`
  - Merge branch 'next' ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - update to Vite ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - Update versions (adrien.denat@qatalog.com)
  - chore: dependencies updates (adrien.denat@qatalog.com)
  - chore: add repository field to package.json (adrien.denat@qatalog.com)
  - chore: set packages publish config (adrien.denat@qatalog.com)
  - Merge branch 'develop' (adrien.denat@qatalog.com)
  - chore: refactor Rollup TS compilation (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`
  - fix(core): fix observer being cleaned up before triggering ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(core): add onScrollEnd callback to scrollTo function (adrien.denat@qatalog.com)
  - chore(core): active snap is now a class (adrien.denat@qatalog.com)
  - fix(core): fix getActiveSnap intersection observers leak (adrien.denat@qatalog.com)
  - chore(docs): add example for carousel with padding (adrien.denat@qatalog.com)
  - feat(core): improve scrollTo animation when it's a partial move (adrien.denat@qatalog.com)
  - feat(core): rework active snap observers to compute snap-align per item instead of globally (adrien.denat@qatalog.com)
  - feat(core): add support for padding/scroll-padding on container (adrien.denat@qatalog.com)
  - chore(core): remove padding from alignment calculations (adrien.denat@qatalog.com)
  - feat(core): snapAlign is now defined by an option instead of checking the CSS (adrien.denat@qatalog.com)
  - fix(core): add exception when dragging to last carousel item to stick to it (adrien.denat@qatalog.com)
  - feat(core): add support for swipe (adrien.denat@qatalog.com)
  - fix(core): take into account item snapAlign to calculation items position (adrien.denat@qatalog.com)
  - Merge branch 'main' into next (adrien.denat@qatalog.com)
  - chore: cleanup changelogs (adrien.denat@qatalog.com)
  - fix(core): fix drag class not removed properly + rename .snaplist_drag class to .scrolling (adrien.denat@qatalog.com)
  - feat(core): make duration of scroll configurable + better handling of drag/scroll conflicts (adrien.denat@qatalog.com)
  - chore: refactor types after TS upgrade (adrien.denat@qatalog.com)
  - chore: remove attempt of using web-components for now (adrien.denat@qatalog.com)
  - chore: remove hack for compiling TS types and use recommended workaround for Rollup instead (adrien.denat@qatalog.com)
  - chore(core): rework smoothScroll detection support (adrien.denat@qatalog.com)
  - fix(core): fix calculation for active snap (adrien.denat@qatalog.com)
  - fix(core): remove normalizing of values that blocks carousel from going to first/last slide in certain conditions (adrien.denat@qatalog.com)
  - fix(core): fix a bug where snaplist_drag class is never removed (adrien.denat@qatalog.com)
  - chore: add base component file (adrien.denat@qatalog.com)
  - chore(core): add stencil components (adrien.denat@qatalog.com)
- `@snap-carousel/react@0.0.21`
  - chore(react): upgrade storybook ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - feat(react): add accessibility props to SnapCarouselIndicator (adrien.denat@qatalog.com)
  - fix(react): fix typings of components (adrien.denat@qatalog.com)
  - chore(react): add a bunch of stories test + add onScrollEnd prop (adrien.denat@qatalog.com)
  - chore: move Storybook to react package (adrien.denat@qatalog.com)
  - feat(react): add missing styles (adrien.denat@qatalog.com)
  - feat(react): add support for className prop (adrien.denat@qatalog.com)
  - chore: fix typing (adrien.denat@qatalog.com)
  - feat(react): add support for index change callback + controlled carousel on SnapCarousel component (adrien.denat@qatalog.com)
  - chore: update react version + change dev script name (adrien.denat@qatalog.com)
  - chore(react): cleanup React package (adrien.denat@qatalog.com)
  - fix(react): fix missing types (adrien.denat@qatalog.com)
  - feat(react): add SnapCarousel component (adrien.denat@qatalog.com)
  - feat(react): improve useScroll hook to not flicker when scrollTo called multiple times with same index (adrien.denat@qatalog.com)
  - update react dep version (adrien.denat@qatalog.com)
  - fix(react): fix not building (adrien.denat@qatalog.com)
  - chore: poc web-component using Stencil (adrien.denat@qatalog.com)
- `@snap-carousel/svelte@0.0.19`
  - Update versions (adrien.denat@qatalog.com)
  - fix(svelte): fix publish after svelte-package update (adrien.denat@qatalog.com)
  - fix(svelte): fix getActiveIndex (adrien.denat@qatalog.com)
  - chore(svelte): remove test script (adrien.denat@qatalog.com)
  - chore(svelte): update after core change (adrien.denat@qatalog.com)
  - chore(svelte): add Sveltkit for package publishing (adrien.denat@qatalog.com)
  - chore(svelte): fix missing dist folder in release (adrien.denat@qatalog.com)
  - feat(svelte): export scrollTo function for external usage (adrien.denat@qatalog.com)
  - fix(svelte): rework Svelte package (adrien.denat@qatalog.com)
  - chore(svelte): rework package (adrien.denat@qatalog.com)
- `@snap-carousel/core@0.0.19`, `@snap-carousel/svelte@0.0.19`
  - feat(core): add get function to retrieve active index (adrien.denat@qatalog.com)

#### Authors: 2

- Adrien ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Mon May 02 2022)

#### ⚠️ Pushed to `main`

- `@snap-carousel/svelte@0.0.14`
  - feat(svelte): export scrollTo function for external usage ([@Grsmto](https://github.com/Grsmto))
- `@snap-carousel/core@0.0.17`
  - chore(core): rework smoothScroll detection support ([@Grsmto](https://github.com/Grsmto))

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Mon Dec 13 2021)

#### ⚠️ Pushed to `main`

- Update README.md
- yarn lock update
- chore: update yarn.lock
- chore: remove useless fields in package.json
- `@snap-carousel/svelte@0.0.13`
  - fix(svelte): rework Svelte package
- `@snap-carousel/core@0.0.16`
  - fix(core): fix calculation for active snap

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Sat Jan 02 2021)

#### ⚠️ Pushed to `main`

- yarn lock update
- chore: update yarn.lock
- chore: remove useless fields in package.json
- `@snap-carousel/core@0.0.15`, `@snap-carousel/examples@0.0.14`
  - fix(core): remove normalizing of values that blocks carousel from going to first/last slide in certain conditions
- `@snap-carousel/react@0.0.16`
  - update react dep version

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Thu Dec 24 2020)

#### ⚠️ Pushed to `main`

- chore: update yarn.lock ([@Grsmto](https://github.com/Grsmto))
- chore: remove useless fields in package.json ([@Grsmto](https://github.com/Grsmto))
- `@snap-carousel/examples@0.0.13`, `@snap-carousel/react@0.0.14`
  - fix(react): fix not building ([@Grsmto](https://github.com/Grsmto))
- `@snap-carousel/core@0.0.13`
  - fix(core): fix a bug where snaplist_drag class is never removed ([@Grsmto](https://github.com/Grsmto))
- `@snap-carousel/core@0.0.13`, `@snap-carousel/examples@0.0.13`, `@snap-carousel/react@0.0.14`
  - chore: rename package to @snap-carousel ([@Grsmto](https://github.com/Grsmto))

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Wed Sep 16 2020)

#### ⚠️ Pushed to `main`

- chore: add auto to handle releases ([@Grsmto](https://github.com/Grsmto))
- `scroll-snap-carousel@0.0.12`
  - fix(core): fix last slide sometimes not going backward ([@Grsmto](https://github.com/Grsmto))

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
