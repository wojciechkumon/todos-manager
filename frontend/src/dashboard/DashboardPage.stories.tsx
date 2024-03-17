import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { DashboardPage } from './DashboardPage.tsx';
import { JwtPayload } from '../auth/auth-holder.ts';

const meta = {
  title: 'dashboard/DashboardPage',
  component: DashboardPage,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: (): JwtPayload => ({
          email: 'email@email.com',
          sub: '123',
          iat: Date.now() / 1_000,
          exp: Date.now() / 1_000 + 60 * 60 * 24,
        }),
      },
    }),
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
