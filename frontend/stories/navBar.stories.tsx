import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import navBar from "../components/navBar";

const meta: Meta<typeof navBar> = {
  component: navBar,
};

export default meta;

type Story = StoryObj<typeof navBar>;

export const Basic: Story = { args: {} };
