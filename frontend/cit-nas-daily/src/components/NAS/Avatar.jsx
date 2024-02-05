import PropTypes from "prop-types";

export const Avatar = ({ avatar, openModal }) => {
  return (
    <div
      className="avatar-square"
      style={{
        width: "200px",
        height: "200px",
        border: "2px solid gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {avatar ? (
        <img
          src={`data:image/png;base64,${avatar}`}
          //src={URL.createObjectURL(avatar)}
          alt="Avatar"
          className="avatar-image"
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
          onClick={openModal}
        />
      ) : (
        <button onClick={openModal}>Upload Photo</button>
      )}
    </div>
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};
