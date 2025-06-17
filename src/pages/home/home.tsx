import { Container } from "react-bootstrap";
import './home.css'
import Login from "../FormPage";

const Auth = () => {
  return (
    <div className="form-auth min-vh-100 d-flex justify-content-center align-items-center py-5">
      <Container className="form-auth-container bg-white rounded-4 p-0 mx-lg-0 mx-3">
        <Login />
      </Container>
    </div>
  );
};

export default Auth;
