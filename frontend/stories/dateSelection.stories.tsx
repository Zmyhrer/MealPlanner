import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import dateSelection from "../components/dateSelection";

const meta: Meta<typeof dateSelection> = {
  component: dateSelection,
};

export default meta;

type Story = StoryObj<typeof dateSelection>;

export const Basic: Story = { args: {} };
