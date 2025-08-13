import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";
import type { ToastData } from "../../../../types/ToastData";
import type { Area } from "../../../../types/area";

type Province = {
  id: number;
  name: string;
};

const EditArea = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Form refs
  const provinceRef = useRef<HTMLSelectElement>(null!);
  const areaNameRef = useRef<HTMLInputElement>(null!);

  // Data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [currentArea, setCurrentArea] = useState<Area>({id: 0 , name: "", provinceId: 0, province_name: ""});

  // Fetch provinces and area data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch provinces
        const provincesRes = await axios.get("http://localhost:3000/api/provinces");
        setProvinces(provincesRes.data || []);

        // Fetch current area
        const areaRes = await axios.get(`http://localhost:3000/api/areas/${id}`);
        const areaData = areaRes.data.data;
        setCurrentArea(areaData);


        // Fill form fields after data loads
        if (areaNameRef.current) areaNameRef.current.value = areaData.name;
        if (provinceRef.current) provinceRef.current.value = areaData.provinceId;
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("فشل في تحميل البيانات. تحقق من الاتصال.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const name = areaNameRef.current?.value?.trim();
    const provinceId = Number(provinceRef.current?.value);

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

    try {
      await axios.put(
        `http://localhost:3000/api/areas/${id}`,
        { name, provinceId },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setToast({
        show: true,
        type: 'success',
        message: 'تم تحديث المنطقة بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/area");
      }, 2000);
    } catch (err: any) {
      let message = 'فشل في التحديث. تحقق من البيانات وأعد المحاولة.';

      if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.response?.status === 404) {
        message = 'المنطقة غير موجودة.';
      } else if (err.response?.status === 400) {
        message = err.response.data.error || message;
      } else if (err.response?.status === 401) {
        message = 'انتهت صلاحية الجلسة. قم بتسجيل الدخول مجددًا.';
      } else if (!err.response) {
        message = 'لا يوجد اتصال مع السيرفر.';
      }

      setToast({
        show: true,
        type: 'danger',
        message,
      });
    }
  };

  // Dynamic form data
  const editItemData : AddEditType[] = [
    {
      label: "المحافظة",
      placeholder: "اختر المحافظة",
      type: "select" as const,
      controlId: "province",
      ref: provinceRef,
      errorKey: "province",
      defaultValue: String(currentArea?.provinceId) ,
      options: loading
        ? [{ value: "", label: "جاري التحميل..." }]
        : provinces.length === 0
        ? [{ value: "", label: "لا توجد محافظات" }]
        : provinces.map(p => ({
            value: String(p.id),
            label: p.name,
          })),
    },
    {
      label: "اسم المنطقة",
      placeholder: "أدخل اسم المنطقة",
      type: "text" as const,
      controlId: "areaName",
      ref: areaNameRef,
      defaultValue: currentArea?.name,
      errorKey: "name",
    },
  ];

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorReload
        error={error}
        classExtra="itemShowWapper"
        onClick={() => {
          window.location.reload();
        }}
      />
    );

  return (
    <div className="edit-area-page">
      <ItemForm
        title="تعديل منطقة"
        addItemData={editItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </div>
  );
};

export default EditArea;