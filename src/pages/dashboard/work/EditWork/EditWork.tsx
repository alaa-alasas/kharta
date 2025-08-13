import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";
import type { ToastData } from "../../../../types/ToastData";
import type { Item } from "../../../../types/Item";

const EditWork = () => {
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
  const areaNameRef = useRef<HTMLInputElement>(null!);

  const [currentWork, setCurrentWork] = useState<Item>({id: 0 , name: "" });

  // Fetch provinces and area data
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch current area
        const areaRes = await axios.get(`http://localhost:3000/api/works/${id}`);
        const areaData = areaRes.data.data;
        setCurrentWork(areaData);

        // Fill form fields after data loads
        if (areaNameRef.current) areaNameRef.current.value = areaData.name;
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

    // Validation
    if (!name) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'اسم المهنة مطلوب',
      });
    }

    try {
      await axios.put(
        `http://localhost:3000/api/works/${id}`,
        { name },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setToast({
        show: true,
        type: 'success',
        message: 'تم تحديث المهنة بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/work");
      }, 2000);
    } catch (err: any) {
      let message = 'فشل في التحديث. تحقق من البيانات وأعد المحاولة.';

      if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.response?.status === 404) {
        message = 'المهنة غير موجودة.';
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
      label: "اسم المهنة",
      placeholder: "أدخل اسم المهنة",
      type: "text" as const,
      controlId: "workName",
      ref: areaNameRef,
      defaultValue: currentWork?.name,
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
        title="تعديل المهنة"
        addItemData={editItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </div>
  );
};

export default EditWork;