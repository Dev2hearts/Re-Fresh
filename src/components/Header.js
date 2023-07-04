import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrap } from "../style/HeaderCss";

const Header = ({ nowUser }) => {
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  useEffect(() => {
    console.log(nowUser);
    setUserName(nowUser.nm);
    setUserPic(nowUser.pic);
  }, [nowUser]);

  return (
    <Wrap>
      <div>
        <Link to="/about">
          {userPic && <img src={userPic} alt={userName} />}
          {userName}
        </Link>
      </div>
      <div>
        <Link to="/profile">LogOut</Link>
      </div>
    </Wrap>
  );
};

export default Header;
