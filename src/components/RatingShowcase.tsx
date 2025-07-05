import { Component, createSignal } from "solid-js";
import ShowcaseLayout from "./ShowcaseLayout";
import { Rating, Flex } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

const RatingShowcase: Component = () => {
  const sections = [
    { id: "contents", title: "Contents" },
    { id: "default", title: "Default" },
    { id: "star2-warning", title: "Star 2 with Warning Color" },
    { id: "heart-multicolor", title: "Heart with Multiple Colors" },
    { id: "star2-green", title: "Star 2 with Green Color" },
    { id: "hidden", title: "Hidden Rating" },
    { id: "half-stars", title: "Half Stars" },
    { id: "props", title: "Props" },
  ] as const;

  const [rating1, setRating1] = createSignal(2);
  const [rating2, setRating2] = createSignal(2);
  const [rating3, setRating3] = createSignal(2);
  const [rating4, setRating4] = createSignal(2);
  const [rating5, setRating5] = createSignal(0);
  const [rating6, setRating6] = createSignal(3);

  const ratingProps = [
    {
      name: "value",
      type: "number",
      description: "Current rating value",
      required: true,
    },
    {
      name: "onChange",
      type: "(newRating: number) => void",
      description: "Callback function when rating changes",
    },
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg"',
      description: "Size of the rating component",
    },
    {
      name: "half",
      type: "boolean",
      default: "false",
      description: "Enable half star ratings",
    },
    {
      name: "hidden",
      type: "boolean",
      default: "false",
      description: "Hide the rating when value is 0",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply",
    },
    {
      name: "dataTheme",
      type: "string",
      description: "Theme data attribute value",
    },
  ];

  return (
    <ShowcaseLayout>
      <div class="space-y-4">
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
            <Flex align="start" justify="start">
              <Rating value={rating1()} onChange={setRating1}>
                <Rating.Item value={1} name="rating-1" class="mask mask-star" />
                <Rating.Item value={2} name="rating-1" class="mask mask-star" />
                <Rating.Item value={3} name="rating-1" class="mask mask-star" />
                <Rating.Item value={4} name="rating-1" class="mask mask-star" />
                <Rating.Item value={5} name="rating-1" class="mask mask-star" />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={value} onChange={setValue}>
  <Rating.Item value={1} name="rating-1" class="mask mask-star" />
  <Rating.Item value={2} name="rating-1" class="mask mask-star" />
  <Rating.Item value={3} name="rating-1" class="mask mask-star" />
  <Rating.Item value={4} name="rating-1" class="mask mask-star" />
  <Rating.Item value={5} name="rating-1" class="mask mask-star" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="star2-warning" title="Star 2 with Warning Color">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Rating value={rating2()} onChange={setRating2}>
                <Rating.Item
                  value={1}
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
                <Rating.Item
                  value={2}
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
                <Rating.Item
                  value={3}
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
                <Rating.Item
                  value={4}
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
                <Rating.Item
                  value={5}
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={value} onChange={setValue}>
  <Rating.Item value={1} name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <Rating.Item value={2} name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <Rating.Item value={3} name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <Rating.Item value={4} name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <Rating.Item value={5} name="rating-2" class="mask mask-star-2 bg-orange-400" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection
          id="heart-multicolor"
          title="Heart with Multiple Colors"
        >
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Rating value={rating3()} onChange={setRating3}>
                <Rating.Item
                  value={1}
                  name="rating-3"
                  class="mask mask-heart bg-red-400"
                />
                <Rating.Item
                  value={2}
                  name="rating-3"
                  class="mask mask-heart bg-orange-400"
                />
                <Rating.Item
                  value={3}
                  name="rating-3"
                  class="mask mask-heart bg-yellow-400"
                />
                <Rating.Item
                  value={4}
                  name="rating-3"
                  class="mask mask-heart bg-lime-400"
                />
                <Rating.Item
                  value={5}
                  name="rating-3"
                  class="mask mask-heart bg-green-400"
                />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={value} onChange={setValue}>
  <Rating.Item value={1} name="rating-3" class="mask mask-heart bg-red-400" />
  <Rating.Item value={2} name="rating-3" class="mask mask-heart bg-orange-400" />
  <Rating.Item value={3} name="rating-3" class="mask mask-heart bg-yellow-400" />
  <Rating.Item value={4} name="rating-3" class="mask mask-heart bg-lime-400" />
  <Rating.Item value={5} name="rating-3" class="mask mask-heart bg-green-400" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="star2-green" title="Star 2 with Green Color">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Rating value={rating4()} onChange={setRating4}>
                <Rating.Item
                  value={1}
                  name="rating-4"
                  class="mask mask-star-2 bg-green-500"
                />
                <Rating.Item
                  value={2}
                  name="rating-4"
                  class="mask mask-star-2 bg-green-500"
                />
                <Rating.Item
                  value={3}
                  name="rating-4"
                  class="mask mask-star-2 bg-green-500"
                />
                <Rating.Item
                  value={4}
                  name="rating-4"
                  class="mask mask-star-2 bg-green-500"
                />
                <Rating.Item
                  value={5}
                  name="rating-4"
                  class="mask mask-star-2 bg-green-500"
                />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={value} onChange={setValue}>
  <Rating.Item value={1} name="rating-4" class="mask mask-star-2 bg-green-500" />
  <Rating.Item value={2} name="rating-4" class="mask mask-star-2 bg-green-500" />
  <Rating.Item value={3} name="rating-4" class="mask mask-star-2 bg-green-500" />
  <Rating.Item value={4} name="rating-4" class="mask mask-star-2 bg-green-500" />
  <Rating.Item value={5} name="rating-4" class="mask mask-star-2 bg-green-500" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="hidden" title="Hidden Rating">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start">
              <Rating value={rating5()} onChange={setRating5} size="lg">
                <Rating.Item value={1} name="rating-9" class="mask mask-star" />
                <Rating.Item value={2} name="rating-9" class="mask mask-star" />
                <Rating.Item value={3} name="rating-9" class="mask mask-star" />
                <Rating.Item value={4} name="rating-9" class="mask mask-star" />
                <Rating.Item value={5} name="rating-9" class="mask mask-star" />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={0} onChange={setValue} size="lg">
  <Rating.Item value={1} name="rating-9" class="mask mask-star" />
  <Rating.Item value={2} name="rating-9" class="mask mask-star" />
  <Rating.Item value={3} name="rating-9" class="mask mask-star" />
  <Rating.Item value={4} name="rating-9" class="mask mask-star" />
  <Rating.Item value={5} name="rating-9" class="mask mask-star" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="half-stars" title="Half Stars">
          <Flex direction="col" gap="md">
            <Flex align="start" justify="start" class="w-full component-preview">
              <Rating value={rating6()} onChange={setRating6} half size="lg">
                <Rating.Item
                  value={0.5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <Rating.Item
                  value={1}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <Rating.Item
                  value={1.5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <Rating.Item
                  value={2}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <Rating.Item
                  value={2.5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <Rating.Item
                  value={3}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <Rating.Item
                  value={3.5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <Rating.Item
                  value={4}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
                <Rating.Item
                  value={4.5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-1 bg-green-500"
                />
                <Rating.Item
                  value={5}
                  name="rating-10"
                  class="mask mask-star-2 mask-half-2 bg-green-500"
                />
              </Rating>
            </Flex>
            <CodeBlock
              code={`<Rating value={value} onChange={setValue} half size="lg">
  <Rating.Item value={0.5} name="rating-10" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <Rating.Item value={1} name="rating-10" class="mask mask-star-2 mask-half-2 bg-green-500" />
  <Rating.Item value={1.5} name="rating-10" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <Rating.Item value={2} name="rating-10" class="mask mask-star-2 mask-half-2 bg-green-500" />
  <Rating.Item value={2.5} name="rating-10" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <Rating.Item value={3} name="rating-10" class="mask mask-star-2 mask-half-2 bg-green-500" />
  <Rating.Item value={3.5} name="rating-10" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <Rating.Item value={4} name="rating-10" class="mask mask-star-2 mask-half-2 bg-green-500" />
  <Rating.Item value={4.5} name="rating-10" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <Rating.Item value={5} name="rating-10" class="mask mask-star-2 mask-half-2 bg-green-500" />
</Rating>`}
            />
          </Flex>
        </ShowcaseSection>

        <ShowcaseSection id="props" title="Props">
          <PropsTable props={ratingProps} />
        </ShowcaseSection>
      </div>
    </ShowcaseLayout>
  );
};

export default RatingShowcase;
