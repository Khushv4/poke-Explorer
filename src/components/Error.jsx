import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="text-center p-10 text-red-500 font-semibold">
      {message}
    </div>
  );
};

export default Error;