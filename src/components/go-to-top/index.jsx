import React, { useState } from "react";
import styled from "styled-components";
import { SILVER, TUNDORA } from "../../styles/colors";
import Chevron from "../../assets/svgs/up-arrow.svg";
import { useWindow } from "../../utils/useWindow";
import { PHONE } from "../../styles/breakpoints";

const BackToTop = styled.div`
  height: 50px;
  width: 50px;
  background: ${SILVER};
  position: fixed;
  right: 0;
  bottom: 20px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${PHONE} {
    display: none;
  }
`;

const ChevronIcon = styled(Chevron)`
  width: 30px;
  height: 30px;
  opacity: 0.3;
  path {
    fill: ${TUNDORA};
  }
`;

const GoToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useWindow &&
    document.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });

  return (
    <>
      {showBackToTop && (
        <BackToTop onClick={() => useWindow && window.scrollTo(0, 0)}>
          <ChevronIcon />
        </BackToTop>
      )}
    </>
  );
};

export default GoToTop;
