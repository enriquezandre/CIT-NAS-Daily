// import { useMemo } from "react";
// import axios from "axios";

export const AddNASForm = () => {
  //   const api = useMemo(
  //     () =>
  //       axios.create({
  //         baseURL: "https://localhost:7001/api",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }),
  //     []
  //   );

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const registeruser = await api.post(`/Auth/register/`, {
  //         username: 0,
  //         password: 0,
  //         role: totalFailedToPunch,
  //       });
  //       console.log(registeruser);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div>
      <section>
        <div className="mx-9 max-w-full mb-10">
          <h2 className="mb-4 text-xl font-bold text-black">Add a NAS</h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              <div className="w-full">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Product brand"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                  Assigned Office
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ID Number
                </label>
                <input
                  type="number"
                  name="item-weight"
                  id="item-weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="12"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Program
                </label>
                <input
                  type="text"
                  name="program"
                  id="program"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select category</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Birthdate
                </label>
                <input
                  type="date"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Date Started
                </label>
                <input
                  type="date"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Year Level
                </label>
                <input
                  type="number"
                  name="middlename"
                  id="middlename"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-secondary rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary hover:text-white"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
