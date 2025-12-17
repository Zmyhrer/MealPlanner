import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import addMealButton from "../components/addMealButton";

const meta: Meta<typeof addMealButton> = {
  component: addMealButton,
};

export default meta;

type Story = StoryObj<typeof addMealButton>;

export const Basic: Story = { args: {} };
