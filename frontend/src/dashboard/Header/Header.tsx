import { Link, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../../auth/hooks/useLogout.ts';

interface HeaderProps {
  email: string;
}

export const Header = ({ email }: HeaderProps) => {
  const logoutUser = useLogout();

  return (
    <nav className="sticky top-0 bg-stone-700">
      <div className="flex p-2">
        <div className="max-w-screen-lg w-full mx-auto flex items-center">
          <div>
            <Typography variant="subtitle2">
              <FormattedMessage
                defaultMessage="Hi, {email}"
                id="GG4Cbl"
                values={{ email }}
              />
            </Typography>
          </div>
          <div className="ml-auto">
            <Link
              href=""
              onClick={() => {
                logoutUser();
                return false;
              }}
              underline="none"
            >
              <Typography variant="subtitle2">
                <span className="mr-2 align-middle">
                  <span className="">
                    <LogoutIcon
                      sx={{ fontSize: 24 }}
                      className="align-middle"
                    />
                  </span>
                </span>
                <FormattedMessage defaultMessage="Logout" id="C81/uG" />
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
