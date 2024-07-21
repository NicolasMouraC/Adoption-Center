import IAnimal from "../types/Animal.interface";

export function updateAnimalRegister(
  setAnimalsList: (animals: IAnimal[]) => void,
  newAnimalData: IAnimal,
  animalsList: IAnimal[]
) {
  const newList = animalsList.map((animal: IAnimal) => {
    if (animal.id === newAnimalData.id) {
      return newAnimalData;
    }

    return animal;
  });

  setAnimalsList(newList);
}
