import AppBar from "../AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <Container>
      <AppBar />
      {children}
    </Container>
  );
};

export default Layout;
