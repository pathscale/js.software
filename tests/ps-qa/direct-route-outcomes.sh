#!/bin/sh
set -eu

page=${1:-dist}
ps_qa=${PS_QA_BIN:-../ps-observability/target/release/ps-qa}
host=${CHUZZ_HEADLESS_BIN:-../chuzz/target/release/chuzz-headless}

routes=$(bun -e 'import { ROUTES } from "./src/config/routes.ts"; process.stdout.write(Object.values(ROUTES).join("\n"))')
if [ -z "$routes" ]; then
  echo "direct-route: route inventory is empty" >&2
  exit 1
fi

printf '%s\n' "$routes" |
while IFS= read -r route
do
  echo "direct-route: $route"
  "$ps_qa" --app tests/ps-qa/direct-route.ron \
    qa-hosted route-inventory \
    --host "$host" \
    --page "$page" \
    --path "$route" \
    --checks tests/ps-qa/checks \
    --require-outcomes </dev/null
done
