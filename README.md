# js.software

The kitchen sink demo and documentation for our UI components.

## Native QA

Build an uncompressed QA bundle, then run every declared outcome with the font-enabled chuzz host
and ps-qa 0.7.4 or newer:

```sh
bun run build:apps
ps-qa --app tests/ps-qa/ps-qa.ron qa-hosted \
  --host ../chuzz/target/release/chuzz-headless --page dist \
  --checks tests/ps-qa/checks --require-outcomes
```

The native outcome corpus includes Calendar selection, month navigation, and
keyboard and pointer-driven Slider and Color Picker outcomes. CI runs the checks without a group selector,
so adding a file or group automatically expands the release gate. Internal UI
links and search results are also required to preserve the running router state.
The direct-route gate derives every registered URL from the application route
table, starts the production artifact there, and requires strict control
attribution on that page. A new route therefore enters the gate without a
hand-maintained workflow list.
The Layouts route uses its own document marker, and decorative cards are
articles rather than controls that promise an action.

The production response policy is a separate release check because chuzz does
not emulate browser CSP enforcement. When CSP is enabled, it rejects a policy
that blocks UI's dynamic Slider and theme-preview styles. It always rejects
stale Google Fonts sources:

```sh
bun run qa:production-policy
```

Production deployment is triggered only by a successful `QA` run on `master`
and checks out the exact commit that passed. Manual dispatch remains available
for an explicitly reviewed release.

## Code Style

- Keep code clean and self-documenting through clear variable/function names
- Be concise and direct
- Focus on implementation, not explanation
