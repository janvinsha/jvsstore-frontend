import React from "react";

//components

//Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
const Rating = ({ value, text }) => {
  return (
    <StyledRating>
      <span>
        <FontAwesomeIcon
          icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalfAlt : emptyStar}
          className="icon"
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalfAlt : emptyStar}
          className="icon"
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : emptyStar}
          className="icon"
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : emptyStar}
          className="icon"
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : emptyStar}
          className="icon"
        />
      </span>
      <span>{text && text}</span>
    </StyledRating>
  );
};
const StyledRating = styled(motion.div)`
  .icon {
    color: #9c8609;
  }
`;
export default Rating;
