# js.software

The kitchen sink demo and documentation for our UI components.

## Native QA

Build an uncompressed QA bundle, then run every declared outcome with the font-enabled chuzz host
and ps-qa 0.7.2 or newer:

```sh
bun run build:apps
ps-qa --app tests/ps-qa/ps-qa.ron qa-hosted \
  --host ../chuzz/target/release/chuzz-headless --page dist \
  --checks tests/ps-qa/checks
```

The UI 3.2.3 candidate build passes all 675 native checks across 13 groups,
including Calendar selection, month navigation, and keyboard and pointer-driven
Slider and Color Picker outcomes. The release gate includes every group.
The Layouts route uses its own document marker, and decorative cards are
articles rather than controls that promise an action.

The production response policy is a separate release check because chuzz does
not emulate browser CSP enforcement. It requires a CSP, rejects a policy that
blocks UI's dynamic Slider and theme-preview styles, and rejects stale Google
Fonts sources:

```sh
bun run qa:production-policy
```

## Code Style

- Keep code clean and self-documenting through clear variable/function names
- Be concise and direct
- Focus on implementation, not explanation
