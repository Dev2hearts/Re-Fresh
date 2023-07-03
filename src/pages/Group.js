import React, { useEffect, useState } from "react";
import {
  GIStyles,
  GITitle,
  GIUl,
  GILi,
  GILogo,
  GILogoDiv,
  GIContainer,
} from "../style/GITotalCss";
import { Link, useParams } from "react-router-dom";
import { getGroupAll } from "../api/fetch";

const Group = () => {
  const params = useParams();
  const userPK = parseInt(params.iuser);
  const [groupList, setGroupList] = useState([]);

  const getAllGroupParse = () => {
    getGroupAll()
      .then(data => {
        setGroupList(data);
      })
      .catch(error => {
        console.error("에러 내용:", error);
      });
  };

  useEffect(() => {
    getAllGroupParse();
  }, [userPK]);

  return (
    <GIContainer>
      <GIStyles>
        <GITitle>Group Selection</GITitle>
        <div>
          <GIUl>
            {groupList.map((item, index) => {
              if (item.iuser === userPK) {
                return (
                  <GILi key={index}>
                    <Link to={`/main/${item.iuser}/${item.igroup}`}>
                      <img src={`${process.env.PUBLIC_URL}/images/Test.png`} />
                    </Link>
                  </GILi>
                );
              } else {
                return null;
              }
            })}
          </GIUl>
        </div>
      </GIStyles>
      <GILogoDiv>
        <GILogo src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
      </GILogoDiv>
    </GIContainer>
  );
};

export default Group;
