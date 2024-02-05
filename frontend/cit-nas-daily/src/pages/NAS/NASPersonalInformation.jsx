import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Avatar } from "../../components/NAS/Avatar";
import { PersonalInformation as Field } from "../../components/NAS/PersonalInformation";
import { useParams } from "react-router-dom";
import { UploadImageModal } from "../../components/UploadImageModal";

export const NASPersonalInformation = () => {
  const { nasId } = useParams();
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [bday, setBday] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [office, setOffice] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const response = await api.get(`/NAS/${nasId}`);
        const nasData = response.data;
        setStudentId(nasData.studentIDNo);
        setFirstName(nasData.firstName);
        setMiddleName(nasData.middleName);
        setLastName(nasData.lastName);
        setGender(nasData.gender);
        setBday(new Date(nasData.birthDate).toLocaleDateString());
        setCourse(nasData.course);
        setYearLevel(nasData.yearLevel.toString());
        setOffice(nasData.officeName);
        setDateStarted(new Date(nasData.dateStarted).toLocaleDateString());

        if (nasData.image != null) {
          setAvatar(nasData.image);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, [nasId, api]);

  const handleAvatarChange = async (selectedFile) => {
    const file = selectedFile;

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.put(`/NAS/photo/${nasId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          const responseData = response.data;
          setAvatar(responseData.image);
          console.log("Image uploaded successfully");
          window.location.reload();
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <div className="block md:hidden justify-center w-full h-full items-center border border-solid rounded-lg p-3">
        <div className="flex justify-center">
          <Avatar avatar={avatar} openModal={openModal} />
        </div>
        <Field
          label="Student ID:"
          id="studentId"
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Lastname:"
          id="lastname"
          type="text"
          value={lastName.toUpperCase()}
          onChange={(e) => setLastName(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Firstname:"
          id="firstname"
          type="text"
          value={firstName.toUpperCase()}
          onChange={(e) => setFirstName(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Middlename:"
          id="middlename"
          type="text"
          value={middleName.toUpperCase()}
          onChange={(e) => setMiddleName(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Birthdate:"
          id="bday"
          type="text"
          value={bday}
          onChange={(e) => setBday(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Gender:"
          id="gender"
          type="text"
          value={gender.toUpperCase()}
          onChange={(e) => setGender(e.target.value)}
          readOnly={true}
        />
        <hr className="my-5 border-t-2 border-gray-300" />
        <Field
          label="Office Assigned:"
          id="office"
          type="text"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Course:"
          id="course"
          type="text"
          value={course.toUpperCase()}
          onChange={(e) => setCourse(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Year Level:"
          id="yearLevel"
          type="text"
          value={yearLevel}
          onChange={(e) => setYearLevel(e.target.value)}
          readOnly={true}
        />
        <Field
          label="Date Started:"
          id="dateStarted"
          type="text"
          value={dateStarted}
          onChange={(e) => setDateStarted(e.target.value)}
          readOnly={true}
        />
      </div>
      <div className="hidden md:block justify-center w-full h-full items-center border border-solid rounded-lg">
        <div className="flex">
          <div className="m-3 flex-1">
            <div className="flex">
              <div className="flex-1 pr-5">
                <Field
                  label="Student ID:"
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  readOnly={true}
                />
                <br />
                <Field
                  label="Gender:"
                  id="gender"
                  type="text"
                  value={gender.toUpperCase()}
                  onChange={(e) => setGender(e.target.value)}
                  readOnly={true}
                />
              </div>
              <div className="flex-1 pr-5">
                <Field
                  label="Lastname:"
                  id="lastname"
                  type="text"
                  value={lastName.toUpperCase()}
                  onChange={(e) => setLastName(e.target.value)}
                  readOnly={true}
                />
                <br />
                <Field
                  label="Birthdate:"
                  id="bday"
                  type="text"
                  value={bday}
                  onChange={(e) => setBday(e.target.value)}
                  readOnly={true}
                />
              </div>
              <div className="flex-1 pr-5">
                <Field
                  label="Middlename:"
                  id="middlename"
                  type="text"
                  value={middleName.toUpperCase()}
                  onChange={(e) => setMiddleName(e.target.value)}
                  readOnly={true}
                />
              </div>
              <div className="flex-1 pr-5">
                <Field
                  label="Firstname:"
                  id="firstname"
                  type="text"
                  value={firstName.toUpperCase()}
                  onChange={(e) => setFirstName(e.target.value)}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="m-3 flex-2">
            <Avatar avatar={avatar} openModal={openModal} />
          </div>
        </div>
        <hr className="my-5 border-t-2 border-gray-300 mx-2" />
        <div className="m-3 flex-1">
          <Field
            label="Office Assigned:"
            id="office"
            type="text"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            readOnly={true}
          />
        </div>
        <div className="flex">
          <div className="m-3 flex-1">
            <Field
              label="Course:"
              id="course"
              type="text"
              value={course.toUpperCase()}
              onChange={(e) => setCourse(e.target.value)}
              readOnly={true}
            />
          </div>
          <div className="m-3 flex-1">
            <Field
              label="Year Level:"
              id="yearLevel"
              type="text"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              readOnly={true}
            />
          </div>
          <div className="m-3 flex-1">
            <Field
              label="Date Started:"
              id="dateStarted"
              type="text"
              value={dateStarted}
              onChange={(e) => setDateStarted(e.target.value)}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <UploadImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleAvatarChange={handleAvatarChange}
        avatar={avatar}
      />
    </>
  );
};
