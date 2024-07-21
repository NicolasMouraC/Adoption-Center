interface IAnimal {
  id: number;
  name: string;
  description: string;
  url_image: string;
  category: string;
  birth_date: string;
  status: boolean;
  age?: number;
}

export default IAnimal;