import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import addMealForm from "../components/mealForm";

const meta: Meta<typeof addMealForm> = {
  component: addMealForm,
};

export default meta;

type Story = StoryObj<typeof addMealForm>;

export const Basic: Story = { args: {} };
