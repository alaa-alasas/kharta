import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";
import type { ToastData } from "../../../../types/ToastData";
import type { Item } from "../../../../types/Item";

const EditEducation = () => {
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
  const educationNameRef = useRef<HTMLInputElement>(null!);

  const [currentEducation, setCurrentEducation] = useState<Item>({id: 0 , name: "" });

  // Fetch provinces and education data
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch current education
        const educationRes = await axios.get(`http://localhost:3000/api/education/${id}`);
        const educationData = educationRes.data.data;
        setCurrentEducation(educationData);

        // Fill form fields after data loads
        if (educationNameRef.current) educationNameRef.current.value = educationData.name;
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

    const name = educationNameRef.current?.value?.trim();

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
        `http://localhost:3000/api/education/${id}`,
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
        message: 'تم تحديث المستوى التعليمي بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/education");
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
      label: "اسم المستوى التعليمي",
      placeholder: "أدخل اسم المستوى التعليمي",
      type: "text" as const,
      controlId: "EducationName",
      ref: educationNameRef,
      defaultValue: currentEducation?.name,
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
        title="تعديل المستوى التعليمي"
        addItemData={editItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </div>
  );
};

export default EditEducation;