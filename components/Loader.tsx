import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={30}
        height={30}
      />
      Loading....
    </div>
  );
};

export default Loader;
