import React from 'react'

export const Avatar = ({ avatar, handleAvatarChange }) => {
  return (
    <div className="avatar-square" style={{ width: '200px', height: '200px', border: '2px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {avatar ? (
        <img
          src={`data:image/png;base64,${avatar}`}
          //src={URL.createObjectURL(avatar)}
          alt="Avatar"
          className="avatar-image"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <label htmlFor="avatar" style={{ cursor: 'pointer' }}>
          Upload Photo
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  )
}
