import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "../components/datePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = { args: {} };
