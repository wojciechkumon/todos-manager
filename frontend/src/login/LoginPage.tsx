import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { LoginForm } from './LoginForm.tsx';

export const LoginPage = () => (
  <DottedLayout>
    <div className="flex h-full min-h-screen">
      <div className="rounded bg-stone-700 p-11 pb-8 m-auto">
        <LoginForm />
      </div>
    </div>
  </DottedLayout>
);
