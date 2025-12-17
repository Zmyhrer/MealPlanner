import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import mealList from "../components/mealList";

const meta: Meta<typeof mealList> = {
  component: mealList,
};

export default meta;

type Story = StoryObj<typeof mealList>;

export const Basic: Story = { args: {
  meals: {}
} };
