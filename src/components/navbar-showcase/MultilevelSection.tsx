import { createSignal, Show } from "solid-js";
import { Navbar, Button, Flex } from "@pathscale/ui";
import { CodeBlock } from "../showcase/CodeBlock";
import { ShowcaseSection } from "../showcase/ShowcaseSection";

const strategies = ["Strategy 1", "Strategy 2", "Strategy 3", "Strategy 4"];
const strategyDetails: Record<string, string[]> = {
  "Strategy 1": [
    "Signals",
    "Events",
    "Events Debug",
    "Orders",
    "Ledger",
    "Slippage",
    "Live Position",
    "Event Catch",
    "Event Catch Stats",
  ],
  "Strategy 2": ["Overview", "Orders", "Positions"],
  "Strategy 3": ["Live Monitor", "Audit Logs"],
  "Strategy 4": ["Metrics", "Settings"],
};

export const MultilevelSection = () => {
  const [activeMain, setActiveMain] = createSignal("Strategies");
  const [activeStrategy, setActiveStrategy] = createSignal<string | null>(null);

  return (
    <ShowcaseSection id="multilevel" title="Multilevel">
      <Flex direction="col" gap="md">
        <Navbar.Stack sticky>
          <Navbar.Row color="primary" padded>
            <Navbar.Start>
              <Button variant="ghost" class="text-xl font-bold text-white">
                Trading Platform
              </Button>
            </Navbar.Start>
            <Navbar.End>
              <Flex gap="md" class="text-white">
                {[
                  "Dashboard",
                  "Strategies",
                  "Live Positions",
                  "Trading Terminal",
                  "Performance",
                  "Funding Comparison",
                ].map((item) => (
                  <button
                    onClick={() => {
                      setActiveMain(item);
                      setActiveStrategy(null);
                    }}
                    class="hover:underline"
                    classList={{
                      "font-bold underline": activeMain() === item,
                    }}
                  >
                    {item}
                  </button>
                ))}
              </Flex>
            </Navbar.End>
          </Navbar.Row>

          <Show when={activeMain() === "Strategies"}>
            <Navbar.Row class="bg-pink-500 text-white" padded>
              <Flex gap="md">
                {strategies.map((s) => (
                  <button
                    class="relative pb-1"
                    onClick={() => setActiveStrategy(s)}
                    classList={{
                      "border-b-2 border-green-300": activeStrategy() === s,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </Flex>
            </Navbar.Row>
          </Show>

          <Show when={activeStrategy()}>
            <Navbar.Row class="bg-neutral text-neutral-content" padded>
              <Flex wrap="wrap" gap="sm">
                {strategyDetails[activeStrategy()!].map((item) => (
                  <a href="#" class="hover:underline">
                    {item}
                  </a>
                ))}
              </Flex>
            </Navbar.Row>
          </Show>
        </Navbar.Stack>

        <CodeBlock
          code={`<Navbar.Stack sticky>
  <Navbar.Row color="primary" padded>
    <Navbar.Start>
      <Button variant="ghost" class="text-xl font-bold text-white">
        Trading Platform
      </Button>
    </Navbar.Start>
    <Navbar.End>
      <Flex gap="md" class="text-white">
        {["Dashboard", "Strategies", ...].map((item) => (
          <button onClick={...}>{item}</button>
        ))}
      </Flex>
    </Navbar.End>
  </Navbar.Row>

  <Show when={activeMain() === "Strategies"}>
    <Navbar.Row class="bg-pink-500 text-white" padded>
      <Flex gap="md">
        {strategies.map((s) => (
          <button onClick={() => setActiveStrategy(s)}>{s}</button>
        ))}
      </Flex>
    </Navbar.Row>
  </Show>

  <Show when={activeStrategy()}>
    <Navbar.Row class="bg-neutral text-neutral-content" padded>
      <Flex wrap="wrap" gap="sm">
        {strategyDetails[activeStrategy()!].map((item) => (
          <a href="#" class="hover:underline">{item}</a>
        ))}
      </Flex>
    </Navbar.Row>
  </Show>
</Navbar.Stack>`}
        />
      </Flex>
    </ShowcaseSection>
  );
};
