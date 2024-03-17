import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { Link, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { routes } from '../config/routes.ts';

export const ErrorPageContent = ({ error }: { error: { status?: number } }) => (
  <DottedLayout>
    <div className="flex h-full min-h-screen">
      <div className="rounded bg-stone-700 p-11 pb-8 m-auto">
        <Typography variant="h3" className="text-center pb-4">
          <FormattedMessage defaultMessage="Oops!" id="BEbOqj" />
        </Typography>

        <Typography variant="h6" className="py-4 text-center">
          {error.status === 404 ? (
            <FormattedMessage
              defaultMessage="This page doesn't exist"
              id="LXDDlh"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Sorry, an unexpected error has occurred."
              id="QPGKrg"
            />
          )}
        </Typography>

        <Typography variant="body1" className="text-center py-4">
          <Link component={RouterLink} to={routes.dashboard} underline="hover">
            <FormattedMessage
              defaultMessage="Click here to return to the dashboard"
              id="snqfM4"
            />
          </Link>
        </Typography>
      </div>
    </div>
  </DottedLayout>
);

export default function ErrorPage() {
  const error = useRouteError() as { status?: number };
  console.error(error);

  return <ErrorPageContent error={error} />;
}
