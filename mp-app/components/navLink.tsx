import React from "react";

type NavLinkProps = {
  href: string;
  text: string;
};

const navLink: React.FC<NavLinkProps> = ({ href, text }) => {
  return <a href={href}>{text}</a>;
};

export default navLink;
