import styled, { css } from "styled-components";
import colors from "../global/colors";
import React from "react";

const GenericMessageCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 64px;
  gap: 24px;
  border-radius: 4px;
  width: 100%;
  margin: 0px 16px;
  background-color: ${colors.Background.Secondary};
`;

const IconContainer = styled.div<{ $hasHorizontalRule?: boolean; }>`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 447px;
  ${props => props.$hasHorizontalRule && css`
    border-bottom: 1.36px ${colors.Border.Primary} solid;
  `}
`;

const IconImage = styled.img`
  height: 100%;
`;

const GenericMessageCardSpan = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const GenericMessageButton = styled.button`
  border: 0px;
  border-radius: 4px;
  width: 173px;
  padding: 13px;
  align-items: center;
  background-color: ${colors.Button.Primary};
`;

const GenericMessageButtonSpan = styled.span`
  align-items: center;
  font-weight: 700;
  padding: 8px;
  font-size: 12px;
  color: ${colors.Text.Primary};
`;

interface IGenericMessageCard {
  title: string;
  imageSrc?: string | React.ReactElement;
  buttonText: string;
  onClick: () => void;
}

const GenericMessageCard = ({ title, imageSrc, buttonText, onClick }: IGenericMessageCard) => {
  const currentPath = window.location.pathname;

  return (
    <GenericMessageCardContainer>
      <GenericMessageCardSpan>
        {title}
      </GenericMessageCardSpan>
      <IconContainer $hasHorizontalRule={currentPath === '/'} >
        {typeof imageSrc === 'string' ? (
          <IconImage src={imageSrc} alt="Icon" />
        ) : (
          imageSrc
        )}
      </IconContainer>
      <GenericMessageButton onClick={onClick}>
        <GenericMessageButtonSpan>
          {buttonText}
        </GenericMessageButtonSpan>
      </GenericMessageButton>
    </GenericMessageCardContainer>
  )
};

export default GenericMessageCard;
