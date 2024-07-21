/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import IAnimal from '../types/Animal.interface';
import { IFormData } from '../types/FormData.interface';
import { updateAnimalRegister } from '../utils';

interface AnimalsContextProps {
  fetchAnimals: (filters?: Record<string, unknown>) => Promise<void>;
  editAdoptStatus: (animalId: number, status: boolean) => Promise<void>;
  addNewAnimal: (formData: IFormData) => Promise<void>;
  isLoading: boolean;
  animalsList: IAnimal[];
}

const AnimalsContext = createContext<AnimalsContextProps | undefined>(undefined);

export const AnimalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [animalsList, setAnimalsList] = useState<IAnimal[]>([]);

  const fetchAnimals = async (filters = {}) => {
    setIsLoading(true);
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(filters)
              .filter(([_, value]) => value !== '' && value !== null)
              .map(([key, value]) => [key, String(value)])
      );
  
      const params = new URLSearchParams(filteredParams);
      const response = await fetch(`http://localhost:8080/api/animals?${params.toString()}`)
      const data: IAnimal[] = await response.json();
      
      setAnimalsList(data);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const editAdoptStatus = async (animalId: number, status: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/animals/${animalId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      updateAnimalRegister(setAnimalsList, data, animalsList);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const addNewAnimal = async (formData: IFormData) => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('birthDate', formData.birthDate);
      formDataToSend.append('status', formData.status);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const response = await fetch(`http://localhost:8080/api/animals/add`, {
        method: 'POST',
        body: formDataToSend
      });
  
      const data = await response.json();
      updateAnimalRegister(setAnimalsList, data, animalsList);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimalsContext.Provider value={{ fetchAnimals, editAdoptStatus, addNewAnimal, isLoading, animalsList }}>
      {children}
    </AnimalsContext.Provider>
  );
};

export const useAnimals = (): AnimalsContextProps => {
  const context = useContext(AnimalsContext);
  if (!context) {
    throw new Error('useAnimals must be used within an AnimalsProvider');
  }
  return context;
};
