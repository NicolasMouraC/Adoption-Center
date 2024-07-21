import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const OutletContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 1180px;
  width: 100%;
`;

const Layout = () => {
  return (
    <MainContainer>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </MainContainer>
  )
};

export default Layout;
