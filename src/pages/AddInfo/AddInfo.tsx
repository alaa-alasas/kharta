import { useEffect, useRef, useState, type FormEvent } from "react";
import { Row, Col, Form, Image, Container } from "react-bootstrap";
import FormTitle from "../../components/FormTitle/FormTitle";
import type { TitleData } from "../../types/Title";
import BtnCustom from "../../components/BtnCustom/BtnCustom";
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import { useNavigate } from "react-router-dom";
import type { ToastData } from "../../types/ToastData";
import axios from "axios";
import type { Option } from "../../types/options";
import type { AuthError } from "../../types/AuthError";
import type { Area } from "../../types/area";
import AppToast from "../../components/ToastCustom/ToastCustom";

const AddInfo = () => {
  const [errors, setErrors] = useState<AuthError>();
  const API_URL = "http://localhost:3000";
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<Option[]>([]);
  const [areas, setAreas] = useState<Option[]>([]);
  const [allAreas, setAllAreas] = useState<Area[]>([]); 
  const [education, setEducation] = useState<Option[]>([]);
  const [work, setWork] = useState<Option[]>([]);
  const [hobby, setHobby] = useState<Option[]>([]);
  const navigate = useNavigate();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedWorkId, setSelectedWorkId] = useState<string>();
  const NameRef = useRef<HTMLInputElement>(null!);
  const DateRef = useRef<HTMLInputElement>(null!);
  const phoneRef = useRef<HTMLInputElement>(null!);
  const genderRef = useRef<HTMLSelectElement>(null!);
  const provinceRef = useRef<HTMLSelectElement>(null!);
  const areaRef = useRef<HTMLSelectElement>(null!);
  const educationRef = useRef<HTMLSelectElement>(null!);
  const workRef = useRef<HTMLSelectElement>(null!);
  const hobbyRef = useRef<HTMLSelectElement>(null!);
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const Title: TitleData = {
    title: "خارطة عشرة ......... عمر",
    desc: "",
  };

  const genderOptions = [
    { value: "", label: "اختر الجنس" },
    { value: "male", label: "ذكر" },
    { value: "female", label: "أنثى" },
  ];

  const InputData = [
    {
      controlId: "name",
      label: "الاسم الثلاثي",
      placeholder: "ادخل الاسم الثلاثي",
      type: "text",
      ref: NameRef,
      classes: "pb-3 pt-4",
      errorKey: "fullName",
    },
    {
      controlId: "birthdate",
      label: "تاريخ الميلاد",
      placeholder: "تاريخ الميلاد",
      type: "date",
      ref: DateRef,
      classes: "pb-4",
      errorKey: "birthdate",
    },
    {
      controlId: "phone",
      label: "رقم الهاتف",
      placeholder: "رقم الهاتف",
      type: "text",
      ref: phoneRef,
      classes: "pb-4",
      errorKey: "phonenumber",
    },
  ];

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const fullName = NameRef.current?.value?.trim();
    const birthdate = DateRef.current?.value;
    const genderValue = genderRef.current?.value?.trim();
    const phonenumber = phoneRef.current?.value?.trim();
    const provinceId = Number(provinceRef.current?.value);
    const areaId = Number(areaRef.current?.value);
    const educationId = Number(educationRef.current?.value);
    const workId = Number(workRef.current?.value);
    const hobbyId = Number(hobbyRef.current?.value);

    // التحقق من القيم
    if (!fullName) {
      return setToast({
        show: true,
        type: "danger",
        message: "الاسم الكامل مطلوب",
      });
    }

    if (!birthdate) {
      return setToast({
        show: true,
        type: "danger",
        message: "تاريخ الميلاد مطلوب",
      });
    }

    if (!genderValue || (genderValue !== "male" && genderValue !== "female")) {
      return setToast({
        show: true,
        type: "danger",
        message: "الجنس مطلوب",
      });
    }

    const gender = genderValue === "male";

    if (!phonenumber) {
      return setToast({
        show: true,
        type: "danger",
        message: "رقم الموبايل مطلوب",
      });
    }

    if (isNaN(provinceId) || provinceId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار محافظة صالحة',
      });
    }

    if (isNaN(areaId) || areaId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار منطقة صالحة',
      });
    }

    if (isNaN(educationId) || educationId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار مستوى تعليمي',
      });
    }

    if (isNaN(workId) || workId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار المهنة',
      });
    }

    if (isNaN(hobbyId) || hobbyId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار الهواية',
      });
    }

    try {
      await axios.post(
        `${API_URL}/api/customers`,
        {
          fullName,
          birthdate,
          gender, 
          phonenumber,
          provinceId,
          areaId,
          educationId,
          workId,
          hobbyId,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setToast({
        show: true,
        type: "success",
        message: "تم إضافة المستهلك بنجاح!",
      });

      setTimeout(() => {
        navigate("/admin/customer");
      }, 2000);
    } catch (err: any) {
      let message = "فشل في الإضافة. حاول مجددًا.";
      if (err.response?.data?.error) {
        message = err.response.data.error;
        setErrors(err.response.data.error)
      } else if (!err.response) {
        setErrors(prev => ({...prev, msg: "لا يوجد اتصال مع السيرفر."}));
      } else {
        setErrors(prev => ({...prev, msg: err.response.data.message || message}));
      }

      setToast({
        show: true,
        type: "danger",
        message,
      });
    }
  };

  const handleProvinceChange = () => {
    const provinceId = provinceRef.current.value;
    setSelectedProvinceId(provinceId);
    console.log(provinceId);
    if (provinceRef.current) {
      provinceRef.current.value = provinceId;
    }
    
    if (areaRef.current) {
      areaRef.current.value = "";
    }
  };

  const handleWorkChange = () => {
    const workId = workRef.current.value;
    setSelectedWorkId(workId);
    if (workRef.current) {
      provinceRef.current.value = workId;
    }
  };

    useEffect(() => {
    if (selectedProvinceId) {
      const filteredAreas = allAreas.filter(area => 
        area.provinceid === parseInt(selectedProvinceId)
      ).map(area => ({
        value: String(area.id),
        label: area.name
      } as Option));
      setAreas(filteredAreas);
    } else {
      setAreas(allAreas.map(area => ({
        value: String(area.id),
        label: area.name
      } as Option)));
    }
  }, [selectedProvinceId, allAreas]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provincesRes, areasRes, educationRes, workRes, hobbyRes] =
          await Promise.all([
            axios.get(`${API_URL}/api/provinces`, { headers: { Accept: "application/json" }}),
            axios.get(`${API_URL}/api/areas`, { headers: { Accept: "application/json" }}),
            axios.get(`${API_URL}/api/education`, { headers: { Accept: "application/json" }}),
            axios.get(`${API_URL}/api/works`, { headers: { Accept: "application/json" }}),
            axios.get(`${API_URL}/api/hobby`, { headers: { Accept: "application/json" }}),
          ]);

        const provincesData: Option[] = [
          { value: "", label: "اختر المحافظة" },
          ...provincesRes.data.map((p: { id: number; name: string }) => ({
            value: String(p.id),
            label: p.name,
          }))
        ];
        setProvinces(provincesData);
        const allAreasData = areasRes.data.data.map((a: { id: number; name: string; provinceid: number }) => ({
          id: String(a.id),
          name: a.name,
          provinceid: a.provinceid,
        }));
        setAllAreas(allAreasData);
        setAreas(allAreasData);

        setEducation(educationRes.data.data.map((e: { id: number; name: string }) => ({
          value: String(e.id),
          label: e.name,
        })));

        setWork(workRes.data.data.map((w: { id: number; name: string }) => ({
          value: String(w.id),
          label: w.name,
        })));

        setHobby(hobbyRes.data.data.map((h: { id: number; name: string }) => ({
          value: String(h.id),
          label: h.name,
        })));
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setToast({
          show: true,
          type: "danger",
          message: "فشل تحميل البيانات. تحقق من الاتصال.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="form-auth min-vh-100 d-flex justify-content-center align-items-center py-5">
      <Container className="form-auth-container bg-white rounded-4 p-0 mx-lg-0 mx-3">
        <Form onSubmit={sendData} >
         
            <Image
              src="/kharta/Images/AddCustomer/91.png"
              alt="Logo"
              className="w-100 rounded-4"
            />
          <div className="p-lg-5 p-3">
          {/* logo company
          <div className="pb-3 text-center">
            <Image
              src="/kharta/Images/logo.png"
              alt="Logo"
              className="image-logo mx-auto"
            />
          </div> */}
          {/* title of form */}
          <FormTitle data={Title} />
          {/* input fieldes  */}
          {InputData.map((item, index) => (
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
              {errors?.[item.errorKey as keyof AuthError] && (
                <p className="text-danger mb-0 fs-14">{errors?.[item.errorKey as keyof AuthError]?.[0]}</p>
              )}              
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
                  ref={genderRef}
                >
                  {genderOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {errors?.gender && <p className="text-danger mb-1 fs-14 text-center">{errors.gender}</p>}
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
                  ref={provinceRef}
                  onChange={() => handleProvinceChange()}
                >
                  {loading ? 
                    <option value={""}>
                      جاري التحميل...
                    </option> :  
                    provinces.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))              
                  }
                </Form.Select>
              </Form.Group>
              {errors?.provinceId && <p className="text-danger mb-1 fs-14 text-center">{errors.provinceId}</p>}
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
                  aria-label="اختر المنطقة"
                  ref={areaRef}
                  >
                     {loading ? 
                        <option value={""}>
                        اختر محافظة أولاً...
                        </option>
                      : selectedProvinceId ? [{ value: "", label: "اختر المنطقة..." }, ...areas].map((item,index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      )) : <option value={""}>
                          اختر المنطقة...
                        </option>
                    }
                </Form.Select>
              </Form.Group>
              {errors?.areaId && <p className="text-danger mb-1 fs-14 text-center">{errors.areaId}</p>}
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
                  ref={educationRef}
                >
                  {loading ? 
                    <option value={""}>
                      جاري التحميل...
                    </option> :  
                    education.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))              
                  }
                </Form.Select>
              </Form.Group>
              {errors?.educationId && <p className="text-danger mb-1 fs-14 text-center">{errors.educationId}</p>}
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
                  ref={workRef}
                >
                  {loading ? 
                    <option value={""}>
                      جاري التحميل...
                    </option> :  
                    work.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))              
                  }
                </Form.Select>
              </Form.Group>
              {errors?.workId && <p className="text-danger mb-1 fs-14 text-center">{errors.workId}</p>}
            </Col>
          </Row>
          {
            
          }
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
                  ref={hobbyRef}
                >
                  {loading ? 
                    <option value={""}>
                      جاري التحميل...
                    </option> :  
                    hobby.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))              
                  }
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {errors?.msg && <p className="text-danger mb-1 fs-14 text-center">{errors.msg}</p>}
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

          {toast.type && <AppToast data={toast} />}
          
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddInfo;
