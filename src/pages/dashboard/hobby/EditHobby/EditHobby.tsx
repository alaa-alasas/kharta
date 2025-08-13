import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";
import type { ToastData } from "../../../../types/ToastData";
import type { Item } from "../../../../types/Item";

const EditHobby = () => {
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
  const hobbyNameRef = useRef<HTMLInputElement>(null!);

  const [currentHobby, setCurrentHobby] = useState<Item>({id: 0 , name: "" });

  // Fetch provinces and hobby data
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch current hobby
        const hobbyRes = await axios.get(`http://localhost:3000/api/hobby/${id}`);
        const hobbyData = hobbyRes.data.data;
        setCurrentHobby(hobbyData);

        // Fill form fields after data loads
        if (hobbyNameRef.current) hobbyNameRef.current.value = hobbyData.name;
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

    const name = hobbyNameRef.current?.value?.trim();

    // Validation
    if (!name) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'اسم الهواية مطلوب',
      });
    }

    try {
      await axios.put(
        `http://localhost:3000/api/hobby/${id}`,
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
        message: 'تم تحديث الهواية بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/hobby");
      }, 2000);
    } catch (err: any) {
      let message = 'فشل في التحديث. تحقق من البيانات وأعد المحاولة.';

      if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.response?.status === 404) {
        message = 'الهواية غير موجودة.';
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
      label: "اسم الهواية",
      placeholder: "أدخل اسم الهواية",
      type: "text" as const,
      controlId: "hobbyName",
      ref: hobbyNameRef,
      defaultValue: currentHobby?.name,
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
        title="تعديل الهواية"
        addItemData={editItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </div>
  );
};

export default EditHobby;