import { useRef, useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";


const AddWork = () => {
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const [loading, setLoading] = useState(true); // Wait for provinces to load
  const [submitting, setSubmitting] = useState(false);

  // Use proper refs
  const workNameRef = useRef<HTMLInputElement>(null!);

  const navigate = useNavigate();

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const name = workNameRef.current?.value?.trim();

    // Validation
    if (!name) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'اسم المهنة مطلوب',
      });
    }

    setSubmitting(true);

    try {

      await axios.post(
        "http://localhost:3000/api/works",
        {
          name
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
        message: 'تمت إضافة المهنة بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/work");
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
      label: "اسم المهنة",
      placeholder: "أدخل اسم المهنة",
      type: "text",
      controlId: "WorkName",
      ref: workNameRef,
      errorKey: "name",
    },
  ];

  return (
    <>
      <ItemForm
        title="إضافة مهنة جديدة"
        addItemData={addItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </>
  );
};

export default AddWork;