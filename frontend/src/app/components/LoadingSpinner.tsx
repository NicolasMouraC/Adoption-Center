import styled from 'styled-components';
import LoadingSpinnerSvg from '../assets/LoadingSpinner.svg';

const Spinner = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  width: 83px;
  height: 83px;
  @media screen and (max-width: 700px) {
    padding-top: 0px;
  }
`;

const LoadingSpinner = () => (
  <div>
    <Spinner src={LoadingSpinnerSvg} alt="Loading..." />
  </div>
);

export default LoadingSpinner;
