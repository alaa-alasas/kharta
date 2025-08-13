import { useRef, useState, type FormEvent } from "react";
import { Row, Col, Form, Image, Container } from "react-bootstrap";
import FormTitle from "../../components/FormTitle/FormTitle";
import type { TitleData } from "../../types/Title";
import BtnCustom from "../../components/BtnCustom/BtnCustom";
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import type { ToastData } from "../../types/ToastData";
import { useNavigate } from "react-router-dom";
import type { AuthError } from "../../types/AuthError";
import AppToast from "../../components/ToastCustom/ToastCustom";
import axios from "axios";

const Login = () => {
  const [errors, setErrors] = useState<AuthError>();
  const [loading, setLoading] = useState(false);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const LoginTitle: TitleData = {
    title: "تسجيل الدخول",
    desc: "",
  };



  const LoginInputData = [
    {
      controlId: "username",
      label: "اسم المستخدم",
      placeholder: "اسم المستخدم",
      type: "text",
      ref: username,
      classes: "pb-3 pt-4",
      errorKey: "name",
    },
    {
      controlId: "password",
      label: "كلمة المرور",
      placeholder: "ادخل كلمة المرور",
      type: "password",
      ref: password,
      classes: "pb-4",
      errorKey: "password",
    },
  ];

 const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username: username.current?.value,
          password: password.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userName", res.data.data.user.username);
        setToast({
          show: true,
          type: 'success',
          message: 'Log In successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          navigate("/admin");
      }, 1500);
      })
      .catch((err) => {
        console.log(err)
        if(err.response.status == 401)
          setErrors(err.response.data)
        else
          setErrors(err.response.data.errors);
          setLoading(false);
      });
      }

  return (
    <div className="form-auth min-vh-100 d-flex justify-content-center align-items-center py-5">
      <Container className="form-auth-container bg-white rounded-4 p-0 mx-lg-0 mx-3">
        <Form onSubmit={login} className="p-lg-5 p-3 ">
          {/* logo company */}
          <div className="pb-3 text-center">
            <Image
              src="/kharta/Images/logo.png"
              alt="Logo"
              className="image-logo mx-auto"
            />
          </div>
          {/* title of form */}
          <FormTitle data={LoginTitle} />
          {/* input fieldes  */}
          {LoginInputData.map((item, index) => (
            <Row className={item.classes} key={index}>
              <Col>
                <InputFiledCustom
                  controlId={item.controlId}
                  type={item.type}
                  placeholder={item.placeholder}
                  ref={item.ref}
                  label={item.label}
                  classExtraLabel="fs-14">
                  {errors?.[item.errorKey as keyof AuthError] && (
                  <p className="text-danger mb-0 fs-14">{errors?.[item.errorKey as keyof AuthError]?.[0]}</p>
                )}
                </InputFiledCustom>
              </Col>
            </Row>
          ))}

          <Row className="pb-4">
            <Col>
              <BtnCustom
                name={"تسجيل الدخول"}
                classExtra="p-3 fs-14 w-100"
                size="lg"
                type="submit"
                disabled={loading}
              />
            </Col>
          </Row>

          {toast.type && <AppToast data={toast} />}
        </Form>
      </Container>
    </div>
  );
};

export default Login;
