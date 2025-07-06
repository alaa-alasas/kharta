import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
// import type { ItemError } from "../../../types/ItemError";
import type { ToastData } from "../../../../types/ToastData";
import { provinceOptions } from "../../../../data/province";

const AddArea = () => {
    // const [errors, setErrors] = useState<ItemError>();

    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

    const name = useRef<HTMLInputElement>(null!);
    const price = useRef<HTMLInputElement>(null!);
    const image = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate();

    const addItemData = [
        {
            label: "المحافظة",
            placeholder: "",
            type: "select",
            controlId: "productName",
            ref: name,
            errorKey: "name",
            options: provinceOptions
        },
        {
            label: "اسم المنطقة",
            placeholder: "ادخل اسم المنطقة",
            type: "text",
            controlId: "productPrice",
            ref: price,
            errorKey: "price"
        },

    ];

    const sendData = (event: FormEvent) => {
        event.preventDefault();

        axios.post(
                "https://web-production-3ca4c.up.railway.app/api/items",
                {
                    name: name?.current?.value,
                    price: price?.current?.value,
                    image: image?.current?.files?.[0],
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then(() => {
                setToast({
                    show: true,
                    type: 'success',
                    message: 'Item Added successful!'
                  });
                setTimeout(() => {
                    setToast(prev => ({ ...prev, show: false }));
                    navigate("/home/items");
                }, 2000);
                
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                setToast({
                    show: true,
                    type: 'danger',
                    message: 'Error adding item, please try again'
                  });
            });
    };

    return (
        <>
            <ItemForm
                title="إضافة منطقة جديدة" 
                addItemData={addItemData}
                onSubmit={sendData}
                image={image}
                // error={errors}
            />
            {toast.type && <AppToast data={toast} />}
        </>
        
    );
};

export default AddArea;
