import Image from "next/image";
import React from "react";

function CardIssues({ src, alt }) {
  return (
    <div>
      <Image src={src} width={300} height={300} alt={alt} />
    </div>
  );
}

export default CardIssues;
