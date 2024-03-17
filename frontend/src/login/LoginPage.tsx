import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { LoginForm } from './LoginForm.tsx';

export const LoginPage = () => (
  <DottedLayout>
    <div className="flex h-full">
      <div className="m-auto">
        <div className="rounded bg-stone-700 p-11 pb-8">
          <LoginForm />
        </div>
      </div>
    </div>
  </DottedLayout>
);
