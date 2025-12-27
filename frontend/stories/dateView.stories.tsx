import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import dateView from "../components/dateView";

const meta: Meta<typeof dateView> = {
  component: dateView,
};

export default meta;

type Story = StoryObj<typeof dateView>;

export const Basic: Story = { args: {} };
