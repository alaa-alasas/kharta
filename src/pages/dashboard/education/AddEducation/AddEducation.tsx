import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";


const AddEducation = () => {
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  // Use proper refs
  const educationNameRef = useRef<HTMLInputElement>(null!);

  const navigate = useNavigate();

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const name = educationNameRef.current?.value?.trim();

    // Validation
    if (!name) {
      return setToast({
        show: true,
        type: 'danger',
        message: 'اسم المستوى التعليمي مطلوب',
      });
    }

    try {

      await axios.post(
        "http://localhost:3000/api/education",
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
        message: 'تم الإضافة بنجاح!',
      });

      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
        navigate("/admin/education");
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
    }
  };

  // Prepare form data (now dynamic)
  const addItemData = [
    {
      label: "اسم المستوى التعليمي",
      placeholder: "أدخل اسم المستوى التعليمي",
      type: "text",
      controlId: "educationName",
      ref: educationNameRef,
      errorKey: "name",
    },
  ];

  return (
    <>
      <ItemForm
        title="إضافة مستوى تعليمي جديدة"
        addItemData={addItemData}
        onSubmit={sendData}
      />
      {toast.show && <AppToast data={toast} />}
    </>
  );
};

export default AddEducation;