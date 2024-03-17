import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { RegistrationForm } from './RegistrationForm.tsx';

export const RegistrationPage = () => (
  <DottedLayout>
    <div className="flex h-full">
      <div className="m-auto">
        <div className="rounded bg-stone-700 p-11 pb-8">
          <RegistrationForm />
        </div>
      </div>
    </div>
  </DottedLayout>
);
