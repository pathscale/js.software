import ShowcaseLayout from "./ShowcaseLayout";
import { Timeline } from "@pathscale/ui";
import { PropsTable } from "./showcase/PropsTable";
import { CodeBlock } from "./showcase/CodeBlock";
import { ShowcaseSection } from "./showcase/ShowcaseSection";

export default function TimelineShowcase() {
  const sections = [
    { id: "basic", title: "Basic Usage" },
    { id: "states", title: "States" },
    { id: "custom-content", title: "Custom Content" },
    { id: "props", title: "Props" },
  ];

  const basicStages = [
    { title: "Order Placed" },
    { title: "Processing" },
    { title: "Shipped" },
    { title: "Delivered" },
  ];

  const stagesWithStates = [
    { title: "Order Placed", active: true },
    { title: "Processing", active: true },
    { title: "Shipped", active: true },
    { title: "Delivered" },
  ];

  const stagesWithError = [
    { title: "Order Placed", active: true },
    { title: "Processing", active: true },
    { title: "Shipped", error: true },
    { title: "Delivered" },
  ];

  const customStages = [
    {
      title: "Order #123 Placed",
      date: "2024-03-20",
      description: "Your order has been confirmed",
      active: true,
    },
    {
      title: "Payment Processed",
      date: "2024-03-20",
      description: "Payment of $99.99 has been processed",
      active: true,
    },
    {
      title: "Order Shipped",
      date: "2024-03-21",
      description: "Package is on its way",
      active: true,
    },
    {
      title: "Out for Delivery",
      date: "2024-03-22",
      description: "Expected delivery by 5 PM",
    },
  ];

  const timelineProps = [
    {
      name: "stages",
      type: "TimelineStage[]",
      required: true,
      description: "Array of stages to display in the timeline",
    },
    {
      name: "renderStage",
      type: "(stage: TimelineStage, index: number) => JSX.Element",
      description: "Custom render function for timeline stages",
    },
  ];

  const stageProps = [
    {
      name: "active",
      type: "boolean",
      default: "false",
      description: "Whether the stage is active/completed",
    },
    {
      name: "error",
      type: "boolean",
      default: "false",
      description: "Whether the stage has an error",
    },
    {
      name: "title",
      type: "string",
      description: "Title text for the stage (when using default rendering)",
    },
  ];

  return <ShowcaseLayout></ShowcaseLayout>;
}
