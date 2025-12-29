import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import containerLabel from "../components/containerLabel";

const meta: Meta<typeof containerLabel> = {
  component: containerLabel,
};

export default meta;

type Story = StoryObj<typeof containerLabel>;

export const Basic: Story = { args: {} };
