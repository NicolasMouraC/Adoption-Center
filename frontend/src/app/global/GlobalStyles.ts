import { createGlobalStyle } from 'styled-components';
import colors from './colors';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    background-color: ${colors.Background.Primary};
  }

  #root {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyle;