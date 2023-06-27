import React from "react";
import { Link } from "react-router-dom";
import { Wrap } from "../style/HeaderCss";

const Header = () => {
  return (
    <Wrap>
      <div>
        <Link to="/about">
          <img src="" alt="" />
          UserName
        </Link>
      </div>
      <div>
        <Link to="/profile">LogOut</Link>
      </div>
    </Wrap>
  );
};

export default Header;
