import { Button, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
                Registration
              </Typography>
              <Typography variant="subtitle2" className="mt-4">
                Already have an account?{' '}
                <Link component={RouterLink} to={routes.login}>
                  Log in →
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
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DottedLayout>
  );
};
