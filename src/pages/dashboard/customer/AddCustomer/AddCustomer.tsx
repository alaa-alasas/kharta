import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";
import { provinceOptions } from "../../../../data/province";
import { countryOptions } from "../../../../data/country";
import { studyOptions } from "../../../../data/study";
import { workOptions } from "../../../../data/work";
import { HobbiesOptions } from "../../../../data/Hobbies";

const AddCustomer = () => {

    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

    const name = useRef<HTMLInputElement>(null!);
    const select = useRef<HTMLSelectElement>(null!);
    const price = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate();

    const genderOptions = [
        { value: "", label: "اختر الجنس" },
        { value: "male", label: "ذكر" },
        { value: "female", label: "أنثى" },
    ];

    const addItemData = [
        {
            label: "الاسم الكامل",
            placeholder: "الاسم الكامل",
            type: "text",
            controlId: "productName",
            ref: name,
            errorKey: "name"
        },
        {
            label: "تاريخ الميلاد",
            placeholder: "تاريخ الميلاد",
            type: "date",
            controlId: "productPrice",
            ref: price,
            errorKey: "price"
        },
        {
            label: "المحافظة",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: select,
            errorKey: "name",
            options: provinceOptions
        },
        {
            label: "المنطقة",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: select,
            errorKey: "name",
            options: countryOptions
        },
        {
            label: "الجنس",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: select,
            errorKey: "name",
            options: genderOptions
        },
        {
            label: "درجة التعليم",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: select,
            errorKey: "name",
            options: studyOptions
        },
        {
            label: "المهنة",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: select,
            errorKey: "name",
            options: workOptions
        },
        {
            label: "الهواية",
            Placeholder: "",
            type: 'select',
            controlId: "",
            ref: select,
            errorKey: "name",
            options: HobbiesOptions
        }
    ];

    const sendData = (event: FormEvent) => {
        event.preventDefault();

        setToast({
            show: true,
            type: 'success',
            message: 'تمت الإضافة بنجاح'
        });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
            navigate("/admin/customer");
        }, 2000);
    }

    return (
        <>
            <ItemForm
                title="إضافة مستهلك جديد"
                addItemData={addItemData}
                onSubmit={sendData}
            />
            {toast.type && <AppToast data={toast} />}
        </>

    );
};

export default AddCustomer;
