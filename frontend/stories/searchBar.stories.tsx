import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import searchBar from "../components/searchBar";

const meta: Meta<typeof searchBar> = {
  component: searchBar,
};

export default meta;

type Story = StoryObj<typeof searchBar>;

export const Basic: Story = { args: {} };
