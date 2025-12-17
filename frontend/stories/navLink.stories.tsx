import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import navLink from "../components/navLink";

const meta: Meta<typeof navLink> = {
  component: navLink,
};

export default meta;

type Story = StoryObj<typeof navLink>;

export const Basic: Story = { args: {} };
