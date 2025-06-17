import { useRef, type FormEvent } from "react";
import { Row, Col, Form, Image } from "react-bootstrap";
import FormTitle from "../components/FormTitle/FormTitle";
import type { TitleData } from "../types/Title";
import BtnCustom from "../components/BtnCustom/BtnCustom";
import InputFiledCustom from "../components/InputFiledCustom/InputFiledCustom";
// import type { ToastData } from "../types/ToastData";
// import AppToast from "../components/ToastCustom/ToastCustom";
import { provinceOptions } from "../data/province";
import { studyOptions } from "../data/study";
import { countryOptions } from "../data/country";
import { workOptions } from "../data/work";
import { HobbiesOptions } from "../data/Hobbies";

const  FormPage = () => {
  // const [errors, setErrors] = useState<AuthError>();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();

  // const [toast, setToast] = useState<ToastData>({
  //   show: false,
  //   type: 'success',
  //   message: '',
  // });

  const LoginTitle: TitleData = {
    title: "خارطة عشرة عمر",
    desc: "فعالية سحوبات عام 2025",
  };
   const genderOptions = [
    { value: "", label: "اختر الجنس" },
    { value: "male", label: "ذكر" },
    { value: "female", label: "أنثى" },
  ];



  const LoginInputData = [
    {
      controlId: "name",
      label: "الاسم الثلاثي",
      placeholder: "ادخل الاسم الثلاثي",
      type: "text",
      ref: email,
      classes: "pb-3 pt-4",
      errorKey: "name",
    },
    {
      controlId: "birthdate",
      label: "تاريخ الميلاد",
      placeholder: "تاريخ الميلاد",
      type: "date",
      ref: password,
      classes: "pb-4",
      errorKey: "birthdate",
    },
    {
      controlId: "phone",
      label: "رقم الهاتف",
      placeholder: "رقم الهاتف",
      type: "text",
      ref: password,
      classes: "pb-4",
      errorKey: "phone",
    },
  ];

  const login = async (event: FormEvent) => {
    event.preventDefault();

  }

  return (
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
              {/* {errors?.[item.errorKey as keyof AuthError] && (
                <p className="text-danger mb-0 fs-14">{errors?.[item.errorKey as keyof AuthError]?.[0]}</p>
              )} */}
            </InputFiledCustom>
          </Col>
        </Row>
      ))}

       {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              الجنس
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر الجنس"
            >
              {genderOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
       {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              المحافظة
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر المحافظة"
            >
              {provinceOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              المنطقة
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر المنطقة">
              {countryOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              درجة التعليم
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر درجة التعليم"
            >
              {studyOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              المهنة
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر المهنة"
            >
              {workOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* Select Dropdown */}
      <Row className="pb-4">
        <Col>
          <Form.Group controlId="gender" className="custom-input-group">
            <Form.Label className="fw-medium lh-1 ls-normal text-grey fs-14">
              الهواية
            </Form.Label>
            <Form.Select
              className="custom-input lh-1 ls-normal p-14 fs-12"
              aria-label="اختر الهواية"
            >
              {HobbiesOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* {errors?.msg && <p className="text-danger mb-1 fs-14 text-center">{errors.msg}</p>} */}
      {/* Submit Button */}
      <Row className="pb-4">
        <Col>
          <BtnCustom
            name={"إرسال"}
            classExtra="p-3 fs-14 w-100"
            size="lg"
            type="submit"
          />
        </Col>
      </Row>

      {/* {toast.type && <AppToast data={toast} />} */}
    </Form>
  );
};

export default FormPage;
