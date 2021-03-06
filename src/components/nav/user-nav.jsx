import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { myContext } from "../../context/provider";
import { BLACK, RONCHI, SILVER, WHITE } from "../../styles/colors";
import { Link, navigate } from "gatsby";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { isMobile } from "react-device-detect";
import Down from "../../assets/svgs/down.svg";

const Container = styled.div`
  background: ${WHITE};
  box-shadow: ${SILVER} 0 0 10px;
  position: absolute;
  width: 270px;
  left: -240px;
  top: 60px;
  text-align: right;
  padding: 0 20px;
  z-index: 5000;
  a {
    color: ${BLACK} !important;
    text-transform: none !important;
    &:hover {
      color: ${RONCHI} !important;
    }
  }
  ul {
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end !important;
    padding: 10px 0 !important;
    li {
      text-align: right;
      padding: 3px 0;
      margin: 0;
    }
  }
`;

const DownIcon = styled(Down)`
  width: 15px;
  height: 15px;
  margin-left: 10px;
  path {
    fill: ${WHITE};
  }
`;

const Profile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: 2px solid ${WHITE};
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-items: center;
`;

const UserNav = () => {
  const wrapperRef = useRef(null);
  const useOutsideAlerter = ref => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        context.setUserMenu(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };

  useOutsideAlerter(wrapperRef);
  const firebase = React.useContext(FirebaseContext);
  const context = useContext(myContext);
  const onSignoutClick = () => {
    context.setSignin(false);
    context.setEmailInUse(false);
    context.setIsAuthPage(false);
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          navigate("/");
          context.setUser(false);
          context.setUserMenu(false);
        },
        error => {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      );
  };

  return (
    <>
      {context.user && (
        <div ref={wrapperRef} style={{ zIndex: 5000 }}>
          <li style={{ position: "relative" }}>
            <UserContainer
              onClick={() =>
                !isMobile
                  ? context.setUserMenu(!context.userMenu)
                  : navigate("/my-profile")
              }
            >
              <Profile src={context.user.photoURL} />
              {!isMobile && <DownIcon />}
            </UserContainer>
            {context.userMenu && (
              <Container>
                <ul>
                  <li>{`G'day ${context.user.displayName}, you legend!`}</li>
                  <Link
                    onClick={() => context.setUserMenu(false)}
                    to="/my-profile"
                    aria-label="My Profile"
                  >
                    <li>My Profile</li>
                  </Link>
                  <Link
                    onClick={() => context.setUserMenu(false)}
                    to="/my-events"
                    aria-label="My Events"
                  >
                    <li>My Events</li>
                  </Link>
                  <li
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => onSignoutClick()}
                    onClick={() => onSignoutClick()}
                    style={{ cursor: "pointer" }}
                  >
                    Sign out
                  </li>
                </ul>
              </Container>
            )}
          </li>
        </div>
      )}
    </>
  );
};

export default UserNav;
