import { Header } from '../../components/Header';
import { OASButtons } from '../../components/OAS/OASButtons';
import { ValidationList } from '../../components/OAS/ValidationList';
export const OASValidation = () => {
  return (
    <>
      <Header role={"OAS"}/>
      <OASButtons/>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div class="flex h-full flex-col justify-center">
          <ul class="flex justify-end items-center text-lg font-medium rounded-t-lg bg-grey px-8 py-4">
            <li class="w-1/4">
                  <div class="flex justify-end">
                      <div class="relative w-full">
                          <input type="search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border" placeholder="Search NAS..." required/>
                          <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </button>
                      </div>
                  </div>
              </li>
            </ul>
          <div className="px-8 py-4">
            <ValidationList/>
          </div>
        </div>
      </div>
    </>
  );
}

