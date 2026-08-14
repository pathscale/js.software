import { Calendar, Flex } from "@pathscale/ui";
import { createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { ShowcaseSection } from "./showcase/ShowcaseSection";
import { CodeBlock } from "./showcase/CodeBlock";
import { PropsTable } from "./showcase/PropsTable";

export default function CalendarShowcase() {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "controlled", title: "Controlled Value" },
    { id: "range", title: "Range Selection" },
    { id: "disabled", title: "Disabled" },
    { id: "min-max", title: "Min / Max" },
    { id: "props", title: "Props" },
  ] as const;

  const props = [
    {
      name: "value",
      type: "Date",
      description: "Currently selected date (controlled).",
    },
    {
      name: "defaultValue",
      type: "Date",
      description: "Initial selected date (uncontrolled).",
    },
    {
      name: "onChange",
      type: "(value: Date) => void",
      description: "Callback fired when the selected date changes.",
    },
    {
      name: "onDaySelect",
      type: "(date: Date) => void",
      description: "Callback fired when a day is clicked.",
    },
    {
      name: "onDayHover",
      type: "(date?: Date) => void",
      description: "Callback fired when a day is hovered.",
    },
    {
      name: "selectionMode",
      type: '"single" | "range"',
      default: "single",
      description: "Selection behavior for the calendar.",
    },
    {
      name: "rangeStart",
      type: "Date",
      description: "Start of the currently selected range.",
    },
    {
      name: "rangeEnd",
      type: "Date",
      description: "End of the currently selected range.",
    },
    {
      name: "rangePreview",
      type: "Date",
      description: "Hover-driven end of the range preview.",
    },
    {
      name: "minValue",
      type: "Date",
      description: "Earliest selectable date.",
    },
    {
      name: "maxValue",
      type: "Date",
      description: "Latest selectable date.",
    },
    {
      name: "isDateUnavailable",
      type: "(date: Date) => boolean",
      description: "Predicate to mark dates as unavailable.",
    },
    {
      name: "locale",
      type: "string",
      default: "en-US",
      description: "BCP 47 locale used for formatting.",
    },
    {
      name: "weekdayFormat",
      type: '"narrow" | "short" | "long"',
      default: "short",
      description: "Format of weekday header labels.",
    },
    {
      name: "showOutsideDays",
      type: "boolean",
      default: "true",
      description: "Whether to render days from adjacent months.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      default: "false",
      description: "Disables calendar interaction if true.",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme name applied to the calendar (`data-theme`).",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the calendar.",
    },
  ];

  const [selectedDate, setSelectedDate] = createSignal<Date | undefined>(
    new Date(2025, 5, 15),
  );

  const [rangeStart, setRangeStart] = createSignal<Date | undefined>();
  const [rangeEnd, setRangeEnd] = createSignal<Date | undefined>();
  const [rangePreview, setRangePreview] = createSignal<Date | undefined>();

  const handleRangeDaySelect = (date: Date) => {
    const start = rangeStart();
    const end = rangeEnd();

    if (!start || (start && end)) {
      setRangeStart(date);
      setRangeEnd(undefined);
      setRangePreview(undefined);
      return;
    }

    if (date < start) {
      setRangeStart(date);
      setRangeEnd(start);
    } else {
      setRangeEnd(date);
    }
    setRangePreview(undefined);
  };

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return (
    <ShowcaseLayout>
      <div class="space-y-8">
        <ShowcaseSection id="contents" title="Contents">
          <nav class="space-y-1">
            {sections.map((section) => (
              <a
                href={`#${section.id}`}
                class="block text-sm text-[hsl(var(--color-fg-secondary)/1)] hover:text-[hsl(var(--color-fg-body)/1)]"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </ShowcaseSection>

        <ShowcaseSection id="default" title="Default">
          <Flex direction="col" gap="md">
            <Calendar />
            <CodeBlock code={`<Calendar />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="controlled" title="Controlled Value">
          <Flex direction="col" gap="md">
            <Calendar
              value={selectedDate()}
              onChange={(value) => setSelectedDate(value)}
            />
            <CodeBlock
              code={`const [selectedDate, setSelectedDate] = createSignal<Date | undefined>(
  new Date(2025, 5, 15),
);

<Calendar
  value={selectedDate()}
  onChange={(value) => setSelectedDate(value)}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="range" title="Range Selection">
          <Flex direction="col" gap="md">
            <Calendar
              selectionMode="range"
              rangeStart={rangeStart()}
              rangeEnd={rangeEnd()}
              rangePreview={rangePreview()}
              onDaySelect={handleRangeDaySelect}
              onDayHover={(date) => {
                if (rangeStart() && !rangeEnd()) {
                  setRangePreview(date);
                }
              }}
            />
            <CodeBlock
              code={`<Calendar
  selectionMode="range"
  rangeStart={rangeStart()}
  rangeEnd={rangeEnd()}
  rangePreview={rangePreview()}
  onDaySelect={handleRangeDaySelect}
  onDayHover={(date) => {
    if (rangeStart() && !rangeEnd()) {
      setRangePreview(date);
    }
  }}
/>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="disabled" title="Disabled">
          <Flex direction="col" gap="md">
            <Calendar state="disabled" />
            <CodeBlock code={`<Calendar state="disabled" />`} />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="min-max" title="Min / Max">
          <Flex direction="col" gap="md">
            <Calendar minValue={minDate} maxValue={maxDate} />
            <CodeBlock
              code={`const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

<Calendar minValue={minDate} maxValue={maxDate} />`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={props} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
}
