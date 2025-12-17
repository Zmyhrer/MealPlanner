import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import mealItem from "../components/mealItem";

const meta: Meta<typeof mealItem> = {
  component: mealItem,
};

export default meta;

type Story = StoryObj<typeof mealItem>;

export const Basic: Story = { args: {} };
