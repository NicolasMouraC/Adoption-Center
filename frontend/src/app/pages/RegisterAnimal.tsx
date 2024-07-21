import styled from "styled-components";
import colors from "../global/colors";
import RegisterAnimaForm from "../components/RegisterAnimalForm";

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  margin: 0px 16px;
  gap: 24px;
  border-radius: 4px;
  background-color: ${colors.Background.Secondary};
`;

const RegisterAnimal = () => {
  return (
    <MovieCardContainer>
      <RegisterAnimaForm/>
    </MovieCardContainer>
  )
};

export default RegisterAnimal;
