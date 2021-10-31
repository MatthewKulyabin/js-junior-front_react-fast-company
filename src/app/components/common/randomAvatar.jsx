import React from 'react';

const RandomAvatar = ({ width, height }) => {
  const renderSrc = () =>
    `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`;
  return (
    <img
      src={renderSrc()}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      {...{ width, height }}
    />
  );
};

export default RandomAvatar;
