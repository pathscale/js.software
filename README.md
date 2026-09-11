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

The September 12 UI release candidate passes 316/316 native checks, including
Calendar selection and month navigation. Its Calendar fix is in UI #289; a build
using the older published library does not verify that fix. CI includes every
group. The Layouts route uses its own document marker, and decorative cards are
articles rather than controls that promise an action.

## Code Style

- Keep code clean and self-documenting through clear variable/function names
- Be concise and direct
- Focus on implementation, not explanation
