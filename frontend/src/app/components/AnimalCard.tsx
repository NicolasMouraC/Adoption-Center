import styled from "styled-components";
import { FormControlLabel } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useAnimals } from "../context/AnimalsContext";
import colors from "../global/colors";
import IAnimal from "../types/Animal.interface";

const Container = styled.div`
  width: 100%;
  max-width: 338px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  background-color: ${colors.Background.Secondary};
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 16px;
`;

const ImageContainer = styled.div`
  height: 188px;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0px 0px;
`;

const AnimalTitleContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  gap: 5px;
`;

const AnimalNameSpan = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const AnimalAgeSpan = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const AnimalDescriptionSpan = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
`;

const AdoptStatusContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  animal: IAnimal;
}

const PetCard = ({ animal }: Props) => {
  const { editAdoptStatus } = useAnimals();

  return (
    <Container>
      <ImageContainer>
        <Image src={animal.url_image} />
      </ImageContainer>
      <SubContainer>
        <AnimalTitleContainer>
          <AnimalNameSpan>
            {animal.name}
          </AnimalNameSpan>
          <AnimalAgeSpan>
            - {animal.age} anos
          </AnimalAgeSpan>
        </AnimalTitleContainer>
        <AnimalDescriptionSpan>
          {animal.description}
        </AnimalDescriptionSpan>
        <AdoptStatusContainer>
          <FormControlLabel
            control={
              <Checkbox
                checked={animal.status}
                onChange={() => editAdoptStatus(animal.id, animal.status)}
              />
            }
            label="Adotado"
          />
        </AdoptStatusContainer>
      </SubContainer>
    </Container>
  )
};

export default PetCard;
