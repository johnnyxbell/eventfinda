import React, { useContext } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { BLACK, GREY, SILVER, WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import NavItems from "./nav-items";
import Logo from "../../assets/svgs/logo.svg";
import { myContext } from "../../context/provider";

const Nav = styled.nav`
  @media (max-width: 769px) and (min-width: 320px) {
    display: none;
  }
  padding: 0;
  margin: 0;
  position: sticky;
  top: 0;
  width: 100%;
  background: ${GREY};
  box-shadow: ${BLACK} 1px 1px 5px;
  z-index: 1;
  font-family: ${FONT_FAMILY};
  a {
    font-weight: ${WEIGHT.NORMAL};
    text-decoration: none;
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
    font-weight: ${WEIGHT.NORMAL};
    margin-right: 25px;
    &:last-child {
      margin: 0;
    }
  }
`;

const NavWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 3px 0;
  min-height: 70px;
`;

const Hamburger = styled.div`
  font-size: 20px;
`;

const LogoIcon = styled(Logo)`
  height: 50px;
  width: 20px;
`;

const MobileNav = styled.nav`
  @media (max-width: 769px) and (min-width: 320px) {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
  box-shadow: ${SILVER} 1px 1px 5px;
  position: sticky;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0;
  top: 0;
  height: 50px;
  width: 100%;
  background: ${WHITE};
  z-index: 1;
  font-family: ${FONT_FAMILY};
  justify-content: space-between;
  align-items: center;
`;

const MobileItems = styled.div`
  top: 0;
  position: absolute;
  z-index: 1;
  width: 100%;
  background: ${BLACK};
  height: 100vh;
  padding-top: 50px;
`;

const HamburgerIcon = styled.div`
  z-index: 5;
  position: absolute;
  padding: 0 10px;
  right: 15px;
  top: 13px;
  height: 25px;
  width: 25px;
  &:before {
    content: "";
    position: absolute;
    width: 1.4em;
    height: 0.15em;
    background: ${BLACK};
    box-shadow: 0 0.5em 0 0 ${BLACK}, 0 1em 0 0 ${BLACK};
  }
`;

const MobileLogo = styled.div`
  padding-top: 8px;
  svg {
    width: 20px;
    height: 45px;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 7px;
  width: 25px;
  height: 25px;
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 4px;
    background-color: ${SILVER};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Navigation = () => {
  const context = useContext(myContext);
  return (
    <>
      <Nav showNotice={!context.withinUs}>
        <NavWrapper>
          <Link to="/" aria-label="Concert Buddy">
            <LogoIcon />
          </Link>
          <NavItems />
        </NavWrapper>
      </Nav>
      <MobileNav>
        <Link to="/" aria-label="Concert Buddy">
          <MobileLogo>
            <LogoIcon />
          </MobileLogo>
        </Link>
        <Hamburger
          onClick={() => {
            context.setShowHamburger(!context.showHamburger);
          }}
        >
          <HamburgerIcon />
        </Hamburger>
      </MobileNav>
      {context.showHamburger && (
        <MobileItems>
          <CloseIcon
            onClick={() => {
              context.setShowHamburger(!context.showHamburger);
            }}
          />
          <NavItems />
        </MobileItems>
      )}
    </>
  );
};

export default Navigation;