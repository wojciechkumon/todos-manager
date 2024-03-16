import { Button, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { DottedLayout } from '../common/DottedLayout.tsx';
import { routes } from '../config/routes.ts';

export const RegistrationPage = () => {
  return (
    <DottedLayout>
      <div className="flex h-full">
        <div className="m-auto">
          <div className="rounded bg-stone-700 p-11 pb-8">
            <div className="w-96">
              <Typography variant="h5" className="text-center">
                <FormattedMessage defaultMessage="Registration" id="qv7ied" />
              </Typography>
              <Typography variant="subtitle2" className="mt-4">
                <FormattedMessage
                  defaultMessage="Already have an account? "
                  id="gWgSaX"
                />
                <Link component={RouterLink} to={routes.login}>
                  <FormattedMessage defaultMessage="Log in →" id="bZk/Lp" />
                </Link>
              </Typography>
              <div className="py-8">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  className="w-full mb-4"
                  required
                />
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  required
                />
              </div>
              <Button variant="contained" className="w-full">
                <FormattedMessage defaultMessage="Register" id="deEeEI" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DottedLayout>
  );
};
