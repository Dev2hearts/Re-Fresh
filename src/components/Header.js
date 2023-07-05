import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrap, Imgdiv, UIDdiv } from "../style/HeaderCss";

const Header = ({ nowUser }) => {
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  const [userPK, setUserPK] = useState("");
  const [groupPK, setGroupPK] = useState("");
  useEffect(() => {
    setUserName(nowUser.nm);
    setUserPic(nowUser.pic);
    setUserPK(nowUser.iuser);
    setGroupPK(nowUser.igroup);
  }, [nowUser]);

  return (
    <Wrap>
      <div>
        <Link to={`/about/${userPK}/${groupPK}`}>
          <UIDdiv>
            <Imgdiv>{userPic && <img src={userPic} alt={userName} />}</Imgdiv>
            <span>{userName}</span>
          </UIDdiv>
        </Link>
      </div>
      <div>
        <Link to="/profile">LogOut</Link>
      </div>
    </Wrap>
  );
};

export default Header;
