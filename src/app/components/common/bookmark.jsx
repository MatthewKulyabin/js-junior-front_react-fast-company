import React, { useState } from 'react';

const Bookmark = (props) => {
  const [bookmarked, setBokmarked] = useState(() => false);

  return (
    <div
      onClick={() => {
        setBokmarked((prev) => !prev);
      }}
    >
      {!bookmarked ? (
        <i className="bi bi-bookmark btn"></i>
      ) : (
        <i className="bi bi-bookmark-fill btn"></i>
      )}
    </div>
  );
};

export default Bookmark;
