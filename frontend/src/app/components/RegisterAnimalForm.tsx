import { ChangeEvent, useState } from 'react';
import { TextField, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { IFormData } from '../types/FormData.interface';
import styled, { css } from 'styled-components';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useAnimals } from '../context/AnimalsContext';
import colors from '../global/colors';

const StyledContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledFormField = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: 0px;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  gap: 12px;
  font-weight: 700;
  align-items: center;
  background-color: ${colors.Button.Primary};
  color: ${colors.Text.Primary};
  ${props => props.disabled && css`
    background-color: ${colors.Button.Secondary};
  `}
`;

const RegisterAnimaForm = () => {
  const { isLoading, addNewAnimal } = useAnimals();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    description: '',
    category: 'cachorro',
    status: 'true',
    birthDate: ''
  });

  const isButtonDisabled =
    formData.name == '' ||
    formData.description == '' ||
    formData.birthDate == '' ||
    formData.image == null
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    let newValue: string | boolean = value;

    if (name === 'status') {
      newValue = value === 'true' ? true : false;
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await addNewAnimal(formData);
    navigate('/adopt');
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
        <StyledFormField>
          <TextField
            type="file"
            name="image"
            label="Imagem"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </StyledFormField>
        <StyledFormField>
          <TextField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
        </StyledFormField>
        <StyledFormField>
          <TextField
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </StyledFormField>
        <StyledFormField>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Categoria</InputLabel>
            <Select
              labelId="category-select-label"
              name="category"
              label="Categoria"
              sx={{ width: '100%' }}
              value={formData.category}
              onChange={handleSelectChange}
            >
              <MenuItem value="cachorro">Cachorro</MenuItem>
              <MenuItem value="gato">Gato</MenuItem>
            </Select>
          </FormControl>
        </StyledFormField>
        <StyledFormField>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              name="status"
              label="Status"
              sx={{ width: '100%' }}
              value={formData.status}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value="true">Disponível</MenuItem>
              <MenuItem value="false">Adotado</MenuItem>
            </Select>
          </FormControl>
        </StyledFormField>
        <StyledFormField>
          <TextField
            label="Data de Nascimento"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </StyledFormField>
        <Button
          type="submit"
          disabled={isLoading || isButtonDisabled}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </StyledContainer>
  );
};

export default RegisterAnimaForm;
