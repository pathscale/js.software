# js.software

The kitchen sink demo and documentation for our UI components.

## Native QA

Build an uncompressed QA bundle, then run every declared outcome with the font-enabled chuzz host
and ps-qa 0.7.3 or newer:

```sh
bun run build:apps
ps-qa --app tests/ps-qa/ps-qa.ron qa-hosted \
  --host ../chuzz/target/release/chuzz-headless --page dist \
  --checks tests/ps-qa/checks
```

The UI 3.2.3 build passes all 675 native checks across 18 groups,
including Calendar selection, month navigation, and keyboard and pointer-driven
Slider and Color Picker outcomes. The release gate must run all 675 checks. CI
partitions those same checks across six jobs at clean browser-state boundaries;
no release-gate job substitutes a smoke suite or drops a group.
The Layouts route uses its own document marker, and decorative cards are
articles rather than controls that promise an action.

The production response policy is a separate release check because chuzz does
not emulate browser CSP enforcement. When CSP is enabled, it rejects a policy
that blocks UI's dynamic Slider and theme-preview styles. It always rejects
stale Google Fonts sources:

```sh
bun run qa:production-policy
```

## Code Style

- Keep code clean and self-documenting through clear variable/function names
- Be concise and direct
- Focus on implementation, not explanation
