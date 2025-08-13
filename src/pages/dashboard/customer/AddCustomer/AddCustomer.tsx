import { useState, useEffect, useRef, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";
import type { Option } from "../../../../types/options";
import type { Area } from "../../../../types/area";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState<Option[]>([]);
  const [areas, setAreas] = useState<Option[]>([]);
  const [allAreas, setAllAreas] = useState<Area[]>([]); // جميع المناطق
  const [education, setEducation] = useState<Option[]>([]);
  const [work, setWork] = useState<Option[]>([]);
  const [hobby, setHobby] = useState<Option[]>([]);

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: "success",
    message: "",
  });

  const [selectedProvinceId, setSelectedProvinceId] = useState<string>(""); // حالة المحافظة المختارة

  const API_URL = "http://localhost:3000";

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

  // تحديث المناطق عند تغيير المحافظة
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
      } else if (!err.response) {
        message = "لا يوجد اتصال مع السيرفر.";
      } else {
        message = err.response.data.message || message;
      }

      setToast({
        show: true,
        type: "danger",
        message,
      });
    }
  };

  const NameRef = useRef<HTMLInputElement>(null!);
  const DateRef = useRef<HTMLInputElement>(null!);
  const phoneRef = useRef<HTMLInputElement>(null!);
  const genderRef = useRef<HTMLSelectElement>(null!);
  const provinceRef = useRef<HTMLSelectElement>(null!);
  const areaRef = useRef<HTMLSelectElement>(null!);
  const educationRef = useRef<HTMLSelectElement>(null!);
  const workRef = useRef<HTMLSelectElement>(null!);
  const hobbyRef = useRef<HTMLSelectElement>(null!);

  const handleProvinceChange = () => {
    const provinceId = provinceRef.current.value;
    setSelectedProvinceId(provinceId);
    
    if (provinceRef.current) {
      provinceRef.current.value = provinceId;
    }
    
    if (areaRef.current) {
      areaRef.current.value = "";
    }
  };

  const addItemData: AddEditType[] = [
    {
      label: "الاسم الكامل",
      placeholder: "أدخل الاسم الكامل",
      type: "text",
      controlId: "fullName",
      ref: NameRef,
      errorKey: "fullName",
    },
    {
      label: "تاريخ الميلاد",
      placeholder: "اختر تاريخ الميلاد",
      type: "date",
      controlId: "birthdate",
      ref: DateRef,
      errorKey: "birthdate",
    },
    {
      label: "رقم الهاتف",
      placeholder: "أدخل رقم الهاتف",
      type: "text",
      controlId: "phonenumber",
      ref: phoneRef,
      errorKey: "phonenumber",
    },
    {
      label: "الجنس",
      placeholder: "اختر الجنس",
      type: "select",
      controlId: "gender",
      errorKey: "gender",
      ref: genderRef,
      options: [
        { value: "", label: "اختر الجنس" },
        { value: "male", label: "ذكر" },
        { value: "female", label: "أنثى" },
      ],
    },
    {
      label: "المحافظة",
      placeholder: "اختر المحافظة",
      type: "select",
      controlId: "provinceId",
      ref: provinceRef,
      errorKey: "provinceId",
      options: loading ? [{ value: "", label: "جاري التحميل..." }] : provinces,
      onSelect: () => handleProvinceChange(),
    },
    {
      label: "المنطقة",
      placeholder: "اختر المنطقة",
      type: "select",
      controlId: "areaId",
      ref: areaRef,
      errorKey: "areaId",
      options: loading 
        ? [{ value: "", label: "اختر محافظة أولاً..." }] 
        : selectedProvinceId 
          ? [{ value: "", label: "اختر المنطقة..." }, ...areas]
          : [{ value: "", label: "اختر محافظة أولاً..." }],
    },
    {
      label: "درجة التعليم",
      placeholder: "اختر الدرجة العلمية",
      type: "select",
      controlId: "educationId",
      ref: educationRef,
      errorKey: "educationId",
      options: loading ? [{ value: "", label: "جاري التحميل..." }] : education,
    },
    {
      label: "المهنة",
      placeholder: "اختر المهنة",
      type: "select",
      controlId: "workId",
      ref: workRef,
      errorKey: "workId",
      options: loading ? [{ value: "", label: "جاري التحميل..." }] : work,
    },
    {
      label: "الهواية",
      placeholder: "اختر الهواية",
      type: "select",
      controlId: "hobbyId",
      ref: hobbyRef,
      errorKey: "hobbyId",
      options: loading ? [{ value: "", label: "جاري التحميل..." }] : hobby,
    },
  ];

  if (loading) {
    return <div>جاري تحميل البيانات...</div>;
  }

  return (
    <>
      <ItemForm
        title="إضافة مستهلك جديد"
        addItemData={addItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </>
  );
};

export default AddCustomer;