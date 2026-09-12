# js.software

The kitchen sink demo and documentation for our UI components.

## Native QA

Build the site, then run every declared outcome with the font-enabled chuzz host
and ps-qa 0.7.1 or newer:

```sh
bun run build
ps-qa --app tests/ps-qa/ps-qa.ron qa-hosted \
  --host ../chuzz/target/release/chuzz-headless --page dist \
  --checks tests/ps-qa/checks
```

The UI 3.2 registry build passes all 347 native checks across 12 groups,
including Calendar selection, month navigation, and keyboard and pointer-driven
Slider and Color Picker outcomes. CI includes every group.
The Layouts route uses its own document marker, and decorative cards are
articles rather than controls that promise an action.

## Code Style

- Keep code clean and self-documenting through clear variable/function names
- Be concise and direct
- Focus on implementation, not explanation
