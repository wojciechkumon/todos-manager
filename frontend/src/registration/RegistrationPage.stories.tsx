import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationPage } from './RegistrationPage.tsx';

const meta = {
  title: 'registration/RegistrationPage',
  component: RegistrationPage,
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
