import styled from "styled-components";
import colors from "../global/colors";
import { Link } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  background-color: ${colors.Background.Secondary}
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderPageSpan = styled.span`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  gap: 10px;
  font-weight: 700;
  color: ${colors.Text.Secondary};
`;

const LinkButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Button = styled.button`
  padding: 6px 12px;
  display: flex;
  border-radius: 25px;
  background-color: ${colors.Button.Primary};
  font-size: 16px;
  gap: 10px;
  font-weight: 700;
  color: ${colors.Text.Primary};
`;

const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <Link to={"/"} style={{ textDecoration: 'none' }}>
          <HeaderPageSpan>
            <PetsIcon 
              sx={{ color: colors.Text.Secondary, fontSize: 24 }}
            />
            <>
              Adoção animal
            </>
          </HeaderPageSpan>
        </Link>
        <LinkButtonsContainer>
          <Link to={"/adopt"} style={{ textDecoration: 'none' }}>
            <Button>
              Adotar
            </Button>
          </Link>
          <Link to={"/register-animal"} style={{ textDecoration: 'none' }}>
            <Button>
              Cadastrar
            </Button>
          </Link>
        </LinkButtonsContainer>
      </HeaderContainer>
    </Container>
  )
};

export default Header;
