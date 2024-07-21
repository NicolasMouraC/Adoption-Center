import styled from 'styled-components';
import colors from '../global/colors';
import JumbotronImage from '../assets/jumbotron-image.jpg'

const JumbotronWrapperContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 84px);
  background-size: cover;
  background-position: center;
  margin-top: -20px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${JumbotronImage});
    background-size: cover;
    background-position: center;
    opacity: 0.7;
    z-index: -1;
  }
`;


const JumbotronContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1180px;
  color: ${colors.Text.Primary};
  position: relative;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
  color: ${colors.Text.Primary};
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: ${colors.Text.Primary};
`

const SubTitle = styled.h2`
  font-size: 35px;
  font-weight: 500;
`

const Home = () => {
  return (
    <JumbotronWrapperContainer>
      <JumbotronContainer>
        <TextContainer>
          <Title>
            Adoção animal
          </Title>
          <SubTitle>
            A adoção é uma forma de dar uma nova chance de vida para um animal!
          </SubTitle>
        </TextContainer>
      </JumbotronContainer>
    </JumbotronWrapperContainer>
  );
};

export default Home;
