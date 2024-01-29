import { useRef, useMemo } from "react";
import axios from "axios";

export const UpdatePassword = () => {
  const currentpassRef = useRef();
  const newpassRef = useRef();
  const retypepassRef = useRef();

  const api = useMemo(
    () =>
      axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentPass = currentpassRef.current.value;
    const newPass = newpassRef.current.value;
    const retypePass = retypepassRef.current.value;

    if (newPass !== retypePass) {
      alert("New password and Retyped password do not match!");
      return;
    }

    try {
      const getUsername = await api.get("/Users/currentUser");
      const username = getUsername.data.username;
      const data = {
        username: username,
        currentPassword: currentPass,
        newPassword: newPass,
        retypeNewPassword: retypePass,
      };
      const response = await api.put("/Users/ChangePassword", data);

      if (response.status === 200) {
        alert("Password updated successfully!");
        currentpassRef.current.value = "";
        newpassRef.current.value = "";
        retypepassRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert("Failed to change password. Please ensure that the password is correct.");
      }
    }
  };

  return (
    <div>
      <section>
        <div className="max-w-full mb-10 overflow-x-auto">
          <h2 className="mb-4 text-xl font-bold text-black">Update Password</h2>
          <form action="#">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="w-full">
                <label
                  htmlFor="currentpass"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current Password
                </label>
                <input
                  ref={currentpassRef}
                  type="password"
                  name="currentpass"
                  id="currentpass"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter current password"
                  required=""
                />
              </div>
              <div className="w-full">
                <label htmlFor="newpass" className="block mb-2 text-sm font-medium text-gray-900">
                  New Password
                </label>
                <input
                  ref={newpassRef}
                  type="password"
                  name="newpass"
                  id="newpass"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter new password"
                  required=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="retypepass"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Re-type New Password
                </label>
                <input
                  ref={retypepassRef}
                  type="password"
                  name="retypepass"
                  id="retypepass"
                  className="bg-gray-50 border border-gray text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Re-enter new password"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-secondary rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary hover:text-white"
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
