import { UpdatePassword } from "../../components/UpdatePassword";

export const NASChangePassword = () => {
  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mb-5">
        <div className="flex h-full flex-col justify-center">
          <div className="px-8 pt-4">
            <div className="flex mt-2">
              <UpdatePassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
