import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { Header } from './Header/Header.tsx';
import { CreateTodoForm } from './CreateTodoForm/CreateTodoForm.tsx';
import { useLoaderData } from 'react-router-dom';
import { JwtPayload } from '../auth/auth-holder.ts';

export const DashboardPage = () => {
  const jwtPayload = useLoaderData() as JwtPayload;

  return (
    <DottedLayout>
      <Header email={jwtPayload.email} />
      <div className="my-8">
        <CreateTodoForm />
      </div>
    </DottedLayout>
  );
};
