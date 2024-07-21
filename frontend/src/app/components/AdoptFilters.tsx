import { TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import styled from "styled-components";
import colors from '../global/colors';

const StyledFormField = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 200px;
  background-color: ${colors.Background.Secondary}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 20px;
  max-width: 1180px;
  flex-wrap: wrap;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const FilterSubContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

interface Props {
  name: string;
  category: string;
  status: string;
  minAge: string | null;
  maxAge: string | null;
  setName: (name: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  setMinAge: (minAge: string | null) => void;
  setMaxAge: (maxAge: string | null) => void;
}

const AdoptFilters = ({
  name,
  category,
  status,
  maxAge,
  minAge,
  setName,
  setCategory,
  setStatus,
  setMinAge,
  setMaxAge
}: Props) => {
  return (
    <FilterContainer>
      <FilterSubContainer>
        <StyledFormField>
          <TextField
            label="Nome"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </StyledFormField>
        <StyledFormField>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              name="status"
              label="Status"
              sx={{ width: '100%' }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Disponível</MenuItem>
              <MenuItem value="false">Adotado</MenuItem>
            </Select>
          </FormControl>
        </StyledFormField>
        <StyledFormField>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Categoria</InputLabel>
            <Select
              labelId="category-select-label"
              name="category"
              label="Categoria"
              sx={{ width: '100%' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Cachorro">Cachorro</MenuItem>
              <MenuItem value="Gato">Gato</MenuItem>
            </Select>
          </FormControl>
        </StyledFormField>
      </FilterSubContainer>
      <FilterSubContainer>
        <StyledFormField>
          <TextField
            label="Idade Mínima"
            name="minAge"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            fullWidth
          />
        </StyledFormField>
        <StyledFormField>
          <TextField
            label="Idade Máxima"
            name="maxAge"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            fullWidth
          />
        </StyledFormField>
      </FilterSubContainer>
    </FilterContainer>
  );
}

export default AdoptFilters;
