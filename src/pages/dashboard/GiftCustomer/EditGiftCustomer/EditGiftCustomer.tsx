import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import ItemForm from "../../../../components/ItemForm/ItemForm";
// import type { Item } from "../../../types/Item";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
// import type { ItemError } from "../../../types/ItemError";
import type { ToastData } from "../../../../types/ToastData";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";

const EditGiftCustomer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [errors, setErrors] = useState<ItemError>();
    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

    const { id } = useParams();
    const name = useRef<HTMLInputElement>(null!);
    const price = useRef<HTMLInputElement>(null!);
    const image = useRef<HTMLInputElement>(null!);
    const navigate = useNavigate()
    // const [oldData, setOldData] = useState<Item>();

    const editItemData = [
        {
            label: "Name",
            placeholder: "Enter the product name",
            type: "text",
            controlId: "productName",
            ref: name,
            // defaultValue: oldData?.name,
            errorKey: "name"
        },
        {
            label: "Price",
            placeholder: "Enter the product price",
            type: "number",
            controlId: "productPrice",
            ref: price,
            // defaultValue: oldData?.price,
            errorKey: "price"
        },
    ];
    useEffect(() => {
        getItem();
      }, []);
    
      var getItem = () => {
        axios.get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log("Fetched item:", res.data);
                // setOldData(res.data);
                setLoading(false);

            })
            .catch((err) => {
                console.error("Error fetching item:", err);
                setError("Failed to load item. Please try again later.");
                setLoading(false);
            });
      }


    const sendData = (event: FormEvent) => {
        event.preventDefault();

        axios.post(
                `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
                {
                    name: name?.current?.value,
                    price: price?.current?.value,
                    image: image?.current?.files?.[0],
                    _method: "PUT",
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
                    message: 'Edit Item successful!'
                  });
                setTimeout(() => {
                    setToast(prev => ({ ...prev, show: false }));
                    navigate("/home/items");
                }, 2000);
            })
            .catch(() => {
                setToast({
                    show: true,
                    type: 'danger',
                    message: 'Error Edit item, please try again'
                  });
                // setErrors(err.response.data.errors);
            });
    };

    
  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
        <ErrorReload error={error} classExtra="itemShowWapper" onClick={() => {
            getItem();
            setLoading(true);
            setError(null);
        }}  />
      
    );
  }

    return (
        <div>
            <ItemForm
                title="EDIT ITEM"
                addItemData={editItemData}
                onSubmit={sendData}
                // image={image}
                // initialImage={oldData?.image_url}
                // error={errors}
            />
            {toast.type && <AppToast data={toast} />}
        </div>
    );
}

export default EditGiftCustomer