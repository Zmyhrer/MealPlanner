import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import mealCard from "../components/dateCard";

const meta: Meta<typeof mealCard> = {
  component: mealCard,
};

export default meta;

type Story = StoryObj<typeof mealCard>;

export const Basic: Story = { args: {} };
