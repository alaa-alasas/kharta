import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";
import axios from "axios";
import type { Item } from "../../../../types/Item";
import type { Customer } from "../../../../types/Customer";

const AddGiftCustomer = () => {

    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

    const customerRef = useRef<HTMLInputElement>(null!);
    const giftRef = useRef<HTMLSelectElement>(null!);
    const dateRef = useRef<HTMLInputElement>(null!);
    const [gifts, setGifts] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true); 
    const [customerId, setCustomerId] = useState<number>(0);

    const navigate = useNavigate();
    const handleCustomerSelect = (customer: Customer) => {
        console.log("Selected customer ID:", customer.id);
        console.log("Selected customer name:", customer.fullname);
        
        // Update your state or do whatever you need with the customer data
        // For example:
        setCustomerId(customer.id);
        console.log("Selected customer ID:", customerId);
        if (customerRef.current) {
            customerRef.current.value = customer.fullname; // or customer.id
        }
    };

    
    const addItemData : AddEditType[]= [
        {
            label: "المستهلك",
            placeholder: "اسم المستهلك",
            type: "select search",
            controlId: "customerId",
            ref: customerRef,
            errorKey: "select",
            onSelect: handleCustomerSelect
        },
        {
            label: "تاريخ التسليم",
            placeholder: "تاريخ التسليم",
            type: "date",
            controlId: "date",
            ref: dateRef,
            errorKey: "date"
        },
        {
            label: "الهدية",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: giftRef,
            errorKey: "name",
            options:  loading
                ? [{ value: "", label: "جاري التحميل..." }]
                : gifts.length === 0
                ? [{ value: "", label: "لا توجد هدايا" }]
                : gifts.map(p => ({
                    value: String(p.id),
                    label: p.name,
                })),
        },
        
    ];


    const sendData = async (event: FormEvent) => {
        event.preventDefault();
        const date = dateRef.current?.value?.trim();
        const giftId = Number(giftRef.current?.value?.trim());

        // Validation
        if (!date) {
            return setToast({
                show: true,
                type: 'danger',
                message: 'تاريخ تسليم الهدية مطلوب',
            });
        }

        if (isNaN(customerId) || customerId <= 0) {
            return setToast({
                show: true,
                type: 'danger',
                message: 'يجب اختيار مستهلك صالح',
            });
        }

        if (isNaN(giftId) || giftId <= 0) {
            return setToast({
                show: true,
                type: 'danger',
                message: 'يجب اختيار هدية صالحة',
            });
        }

        try {

            await axios.post(
                "http://localhost:3000/api/giftCustomer",
                {
                date,
                customerId,
                giftId
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
                message: 'تمت الإضافة بنجاح!',
            });

            setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
                navigate("/admin/giftCustomer");
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


    // Fetch Gifts from server
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/gift");
        setGifts(res.data.data || []);
        console.log(gifts);

      } catch (err) {
        setToast({
          show: true,
          type: 'danger',
          message: 'تعذر تحميل الهدايا. تحقق من الاتصال أو أعد المحاولة لاحقًا.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

    return (
        <>
            <ItemForm
                title="إضافة هدية جديدة"
                addItemData={addItemData}
                onSubmit={sendData}
            />
            {toast.type && <AppToast data={toast} />}
        </>

    );
};

export default AddGiftCustomer;
