import { DottedLayout } from '../common/DottedLayout.tsx';

export const RegistrationPage = () => {
  return (
    <DottedLayout>
      <div className="flex h-full">
        <div className="m-auto">
          <div className="rounded border border-stone-500 bg-stone-700 p-11 pb-8">
            <div className="w-96">
              <div className="pb-8">Registration</div>
              <div className="pb-8">
                <div>Email</div>
                <div>Password</div>
              </div>
              <div>
                <button>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DottedLayout>
  );
};
