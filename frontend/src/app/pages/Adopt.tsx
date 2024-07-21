import { useEffect, useState } from "react";
import styled from "styled-components";
import AdoptFilters from "../components/AdoptFilters";
import GenericMessageCard from "../components/GenericMessageCard";
import AnimalCard from "../components/AnimalCard";
import { useAnimals } from "../context/AnimalsContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ReloadPage from "../assets/ReloadPage.svg"

const Adopt = () => {
  const { fetchAnimals, animalsList, isLoading } = useAnimals();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [minAge, setMinAge] = useState<string | null>(null);
  const [maxAge, setMaxAge] = useState<string | null>(null);
  
  useEffect(() => {
    fetchAnimals({ name, category, status, minAge, maxAge });
  }, [name, category, status, minAge, maxAge]);

  const AnimalCardContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 16px; 
  `;

  return (
    <div>
      <AdoptFilters
        name={name}
        category={category}
        status={status}
        minAge={minAge}
        maxAge={maxAge}
        setName={setName}
        setCategory={setCategory}
        setStatus={setStatus}
        setMinAge={setMinAge}
        setMaxAge={setMaxAge}
      />
      <AnimalCardContainer>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          animalsList.length > 0 ? (
            animalsList.map((animal, index) => (
              <AnimalCard animal={animal} key={index} />
            ))
          ) : (
            <GenericMessageCard
              title="Parece que não há nada por aqui :("
              buttonText="Recarregar página"
              onClick={() => fetchAnimals({ category, status, minAge, maxAge })}
              imageSrc={ReloadPage}
            />
          ))
        }
      </AnimalCardContainer>
    </div>
  );
}

export default Adopt;
