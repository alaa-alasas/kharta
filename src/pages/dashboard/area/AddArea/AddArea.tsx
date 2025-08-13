import { useRef, useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";

// Define types
type Province = {
  id: number;
  name: string;
};

const AddArea = () => {
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true); // Wait for provinces to load
  const [submitting, setSubmitting] = useState(false);

  // Use proper refs
  const provinceRef = useRef<HTMLSelectElement>(null!);
  const areaNameRef = useRef<HTMLInputElement>(null!);

  const navigate = useNavigate();

  // Fetch provinces from server
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/provinces");
        setProvinces(res.data || []);
      } catch (err) {
        setToast({
          show: true,
          type: 'danger',
          message: 'تعذر تحميل المحافظات. تحقق من الاتصال أو أعد المحاولة لاحقًا.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const provinceId = Number(provinceRef.current?.value);
    const name = areaNameRef.current?.value?.trim();

    // Validation
    if (!name) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'اسم المنطقة مطلوب',
      });
    }
    if (isNaN(provinceId) || provinceId <= 0) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'يجب اختيار محافظة صالحة',
      });
    }

    setSubmitting(true);

    try {

      await axios.post(
        "http://localhost:3000/api/areas",
        {
          name,
          provinceId,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setToast({
        show: true,
        type: 'success',
        message: 'تمت إضافة المنطقة بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/area");
      }, 2000);
    } catch (err: any) {
      let message = 'خطأ في الإضافة. تأكد من البيانات وأعد المحاولة.';

      if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.response?.status === 401) {
        message = 'انتهت صلاحية الجلسة. قم بتسجيل الدخول مجددًا.';
      }

      setToast({
        show: true,
        type: 'danger',
        message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Prepare form data (now dynamic)
  const addItemData = [
    {
      label: "المحافظة",
      placeholder: "اختر المحافظة",
      type: "select",
      controlId: "province",
      ref: provinceRef,
      options: loading
        ? [{ value: "", label: "جاري التحميل..." }]
        : provinces.length === 0
        ? [{ value: "", label: "لا توجد محافظات" }]
        : provinces.map(p => ({
            value: String(p.id),
            label: p.name,
          })),
      errorKey: "name",
    },
    {
      label: "اسم المنطقة",
      placeholder: "أدخل اسم المنطقة",
      type: "text",
      controlId: "areaName",
      ref: areaNameRef,
      errorKey: "name",
    },
  ];

  return (
    <>
      <ItemForm
        title="إضافة منطقة جديدة"
        addItemData={addItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </>
  );
};

export default AddArea;