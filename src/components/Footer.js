import React from "react";
import { FooterStyle } from "../style/FooterCss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <FooterStyle>
      <FontAwesomeIcon icon={faCartPlus} />
      <FontAwesomeIcon icon={faBoxOpen} />
    </FooterStyle>
  );
};

export default Footer;
