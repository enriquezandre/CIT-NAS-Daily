import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/Login.css";
import bg from "../../assets/glebuilding.png";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7001/api/Auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data);
      console.log(response.data);

      // Create an Axios instance with the Authorization header after login
      const api = axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Get the user's details
      const userResponse = await api.get(`/Users/currentUser`);
      const userId = userResponse.data.id;

      // Get the user's role
      const roleResponse = await api.get(`/Users/${userId}`);
      const userRole = roleResponse.data.role;
      // console.log(`User ID: ${userId}`);
      // console.log(`User Role: ${userRole}`);

      // Navigate to the respective route based on the user's role
      switch (userRole) {
        case "NAS":
          navigate(`/nas/1`);
          break;
        case "OAS":
          navigate(`/oas/offices`);
          break;
        case "Superior":
          navigate(`/superior/`);
          break;
        default:
          navigate("Unknown role");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="center-container">
        <div className="main-container">
          <div className="login-image-container">
            <img src={bg} alt="glebuilding" className="bg-container" />
          </div>
          <div className="text-container">
            <span className="text-login">LOGIN</span>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="username" className="input-label">
                  Enter Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="text-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password" className="input-label">
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="text-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" className="button-submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
