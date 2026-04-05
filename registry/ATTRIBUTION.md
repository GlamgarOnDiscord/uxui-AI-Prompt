# Registry Attribution

The `registry/brands/` directory mirrors DESIGN.md files from upstream sources. Each brand folder retains its original license and credits its source in `meta.source`.

## Upstream sources

| Source | License | URL |
|--------|---------|-----|
| VoltAgent/awesome-design-md | MIT | https://github.com/VoltAgent/awesome-design-md |

## Sync policy

Brand files are vendored (not submoduled) to allow local fixes for malformed markdown. Run `pnpm tsx scripts/sync-registry.ts` to pull the latest from upstream — diffs are surfaced for manual review before merge.

## Brand-specific credits

### uxui-designer

Original work by [GlamgarOnDiscord](https://github.com/GlamgarOnDiscord). Published under MIT as part of `design-md-kit`. This brand is the reference implementation used to exercise the parser and serves as the default shipped with `npx design-md init`.
