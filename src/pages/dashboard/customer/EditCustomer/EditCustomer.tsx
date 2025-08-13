import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import ItemForm, { type AddEditType } from "../../../../components/ItemForm/ItemForm";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";
import type { Option } from "../../../../types/options";
import type { Customer } from "../../../../types/Customer";
import { formatDateToInput } from "../../../../commons/formatDate";

const EditCustomer = () => {
    const API_URL = "http://localhost:3000";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentCustomer, setCurrentCustomer] = useState<Customer>({
        id: 0,
        fullname: "",
        areaId: 0,
        area: "",
        provinceId: 0,
        province: "",
        hobbyId: 0,
        hobby: "",
        educationId: 0,
        education: "",
        birthdate: "",
        gender: true,
        phonenumber: "",
        workId: 0,
        work: ""
    });

    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

    const { id } = useParams();
    const NameRef = useRef<HTMLInputElement>(null!);
    const DateRef = useRef<HTMLInputElement>(null!);
    const phoneRef = useRef<HTMLInputElement>(null!);
    const genderRef = useRef<HTMLSelectElement>(null!);
    const provinceRef = useRef<HTMLSelectElement>(null!);
    const areaRef = useRef<HTMLSelectElement>(null!);
    const educationRef = useRef<HTMLSelectElement>(null!);
    const workRef = useRef<HTMLSelectElement>(null!);
    const hobbyRef = useRef<HTMLSelectElement>(null!);
    const [provinces, setProvinces] = useState<Option[]>([]);
    const [areas, setAreas] = useState<Option[]>([]);
    const [education, setEducation] = useState<Option[]>([]);
    const [work, setWork] = useState<Option[]>([]);
    const [hobby, setHobby] = useState<Option[]>([]);

    const editItemData: AddEditType[] = [
        {
            label: "الاسم الكامل",
            placeholder: "أدخل الاسم الكامل",
            type: "text",
            controlId: "fullName",
            ref: NameRef,
            defaultValue: currentCustomer?.fullname,
            errorKey: "fullName",
        },
        {
            label: "تاريخ الميلاد",
            placeholder: "اختر تاريخ الميلاد",
            type: "date",
            controlId: "birthdate",
            ref: DateRef,
            defaultValue: formatDateToInput(currentCustomer.birthdate),
            errorKey: "birthdate",
        },
        {
            label: "رقم الهاتف",
            placeholder: "أدخل رقم الهاتف",
            type: "text",
            controlId: "phonenumber",
            ref: phoneRef,
            defaultValue: currentCustomer?.phonenumber,
            errorKey: "phonenumber",
        },
        {
            label: "الجنس",
            placeholder: "اختر الجنس",
            type: "select",
            controlId: "gender",
            errorKey: "gender",
            ref: genderRef,
            defaultValue: currentCustomer?.gender == true ? "male" : "female",
            options: [
                { value: "", label: "اختر الجنس" },
                { value: "male", label: "ذكر" },
                { value: "female", label: "أنثى" },
            ],
        },
        {
            label: "المحافظة",
            placeholder: "اختر المحافظة",
            type: "select",
            controlId: "provinceId",
            ref: provinceRef,
            // defaultValue: String(currentCustomer?.provinceId),
            errorKey: "provinceId",
            options: loading ? [{ value: "", label: "جاري التحميل..." }] : provinces,
        },
        {
            label: "المنطقة",
            placeholder: "اختر المنطقة",
            type: "select",
            controlId: "areaId",
            ref: areaRef,
            // defaultValue: String(currentCustomer?.areaId),
            errorKey: "areaId",
            options: loading ? [{ value: "", label: "جاري التحميل..." }] : areas,
        },
        {
            label: "درجة التعليم",
            placeholder: "اختر الدرجة العلمية",
            type: "select",
            controlId: "educationId",
            ref: educationRef,
            // defaultValue: String(currentCustomer?.educationId),
            errorKey: "educationId",
            options: loading ? [{ value: "", label: "جاري التحميل..." }] : education,
        },
        {
            label: "المهنة",
            placeholder: "اختر المهنة",
            type: "select",
            controlId: "workId",
            ref: workRef,
            // defaultValue: String(currentCustomer?.workId),
            errorKey: "workId",
            options: loading ? [{ value: "", label: "جاري التحميل..." }] : work,
        },
        {
            label: "الهواية",
            placeholder: "اختر الهواية",
            type: "select",
            controlId: "hobbyId",
            ref: hobbyRef,
            // defaultValue: String(currentCustomer?.hobbyId),
            errorKey: "hobbyId",
            options: loading ? [{ value: "", label: "جاري التحميل..." }] : hobby,
        },
    ];

    const fetchCustomer = async () => {
        try {

            // Fetch current customer
            const customerRes = await axios.get(`http://localhost:3000/api/customers/${id}`);
            const customerData = customerRes.data.data;
            setCurrentCustomer(customerData);
            console.log(customerData);
            // Fill form fields after data loads
            if (NameRef.current) NameRef.current.value = customerData.fullname;
            if (phoneRef.current) phoneRef.current.value = customerData.phonenumber;
            if (DateRef.current) DateRef.current.value = formatDateToInput(customerData.birthdate);
            console.log(formatDateToInput(customerData.birthdate));
            if (genderRef.current) genderRef.current.value = customerData.gender == true ? "male" : "female";
            if (provinceRef.current) provinceRef.current.value = customerData.provinceid;

        } catch (err: any) {
            console.error("Error fetching data:", err);
            setError("فشل في تحميل البيانات. تحقق من الاتصال.");
        } finally {
            setLoading(false);
        }
    };

    // fetchCustomer()
useEffect(() => {
        const fetchData = async () => {
            try {
                // استخدم Promise.all للحصول على جميع البيانات في نفس الوقت
                const [customerRes, provincesRes, areasRes, educationRes, workRes, hobbyRes] =
                    await Promise.all([
                        axios.get(`http://localhost:3000/api/customers/${id}`), // جلب بيانات الزبون أولاً
                        axios.get(`${API_URL}/api/provinces`, { headers: { Accept: "application/json" } }),
                        axios.get(`${API_URL}/api/areas`, { headers: { Accept: "application/json" } }),
                        axios.get(`${API_URL}/api/education`, { headers: { Accept: "application/json" } }),
                        axios.get(`${API_URL}/api/works`, { headers: { Accept: "application/json" } }),
                        axios.get(`${API_URL}/api/hobby`, { headers: { Accept: "application/json" } }),
                    ]);

                // 3. ضع تحديث الحالة داخل try/catch المناسب
                setCurrentCustomer(customerRes.data.data);
                console.log("بيانات الزبون:", customerRes.data.data);

                setProvinces(provincesRes.data.map((p: { id: number; name: string }) => ({
                    value: String(p.id),
                    label: p.name,
                })));

                setAreas(areasRes.data.data.map((a: { id: number; name: string }) => ({
                    value: String(a.id),
                    label: a.name,
                })));

                setEducation(educationRes.data.data.map((e: { id: number; name: string }) => ({
                    value: String(e.id),
                    label: e.name,
                })));

                setWork(workRes.data.data.map((w: { id: number; name: string }) => ({
                    value: String(w.id),
                    label: w.name,
                })));

                setHobby(hobbyRes.data.data.map((h: { id: number; name: string }) => ({
                    value: String(h.id),
                    label: h.name,
                })));

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("فشل في تحميل البيانات. تحقق من الاتصال.");
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // نفذ الدالة داخل useEffect
    }, [id, API_URL]); // أضف المعتمدات اللازمة

    useEffect(() => {
        if (!loading && currentCustomer.id !== 0) {
            // تحديث قيم input النصية وتاريخ الميلاد
            if (NameRef.current) NameRef.current.value = currentCustomer.fullname;
            if (phoneRef.current) phoneRef.current.value = currentCustomer.phonenumber;
            if (DateRef.current) DateRef.current.value = formatDateToInput(currentCustomer.birthdate);

            // تحديث قيم select
            if (genderRef.current) genderRef.current.value = currentCustomer.gender === true ? "male" : "female";
            if (provinceRef.current) provinceRef.current.value = String(currentCustomer.provinceId);
            if (areaRef.current) areaRef.current.value = String(currentCustomer.areaId);
            if (educationRef.current) educationRef.current.value = String(currentCustomer.educationId);
            if (workRef.current) workRef.current.value = String(currentCustomer.workId);
            if (hobbyRef.current) hobbyRef.current.value = String(currentCustomer.hobbyId);
            setLoading(false)
        }
    }, [currentCustomer, loading]); // المعتمدات
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [provincesRes, areasRes, educationRes, workRes, hobbyRes] =
    //                 await Promise.all([
    //                     axios.get(`${API_URL}/api/provinces`, { headers: { Accept: "application/json" } }),
    //                     axios.get(`${API_URL}/api/areas`, { headers: { Accept: "application/json" } }),
    //                     axios.get(`${API_URL}/api/education`, { headers: { Accept: "application/json" } }),
    //                     axios.get(`${API_URL}/api/works`, { headers: { Accept: "application/json" } }),
    //                     axios.get(`${API_URL}/api/hobby`, { headers: { Accept: "application/json" } }),
    //                 ]);

    //             // تأكد من هيكل البيانات: هل تستخدم .data أم لا؟
    //             setProvinces(provincesRes.data.map((p: { id: number; name: string }) => ({
    //                 value: String(p.id),
    //                 label: p.name,
    //             })));

    //             setAreas(areasRes.data.data.map((a: { id: number; name: string }) => ({
    //                 value: String(a.id),
    //                 label: a.name,
    //             })));

    //             setEducation(educationRes.data.data.map((e: { id: number; name: string }) => ({
    //                 value: String(e.id),
    //                 label: e.name,
    //             })));

    //             setWork(workRes.data.data.map((w: { id: number; name: string }) => ({
    //                 value: String(w.id),
    //                 label: w.name,
    //             })));

    //             setHobby(hobbyRes.data.data.map((h: { id: number; name: string }) => ({
    //                 value: String(h.id),
    //                 label: h.name,
    //             })));
    //         } catch (err) {
    //             console.error("Error fetching dropdown data:", err);
    //             setToast({
    //                 show: true,
    //                 type: "danger",
    //                 message: "فشل تحميل البيانات. تحقق من الاتصال.",
    //             });
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCustomer();
    //     fetchData();
    // }, []);


    const sendData = async (event: FormEvent) => {
        event.preventDefault();

        const fullName = NameRef.current?.value?.trim();
        const birthdate = DateRef.current?.value;
        const genderValue = genderRef.current?.value?.trim();
        const phonenumber = phoneRef.current?.value?.trim();
        const provinceId = Number(provinceRef.current?.value); // Convert to number
        const areaId = Number(areaRef.current?.value);
        const educationId = Number(educationRef.current?.value);
        const workId = Number(workRef.current?.value);
        const hobbyId = Number(hobbyRef.current?.value);

        // Validation logic remains the same...

        try {
            await axios.put(`http://localhost:3000/api/customers/${id}`, {
                fullName,
                birthdate,
                gender: genderValue === "male",
                phonenumber,
                provinceId,
                areaId,
                educationId,
                workId,
                hobbyId,
            });

            setToast({
                show: true,
                type: 'success',
                message: 'Edit Customer successful!',
            });
            setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
                navigate("/admin/customer");
            }, 2000);
        } catch (err: any) {
            setTimeout(() => {
                setToast(prev => ({ ...prev, show: false, message: 'فشل في التحديث. تحقق من البيانات وأعد المحاولة.' }));
                navigate("/admin/customer");
            }, 2000);
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    

    if (error) {
        return (
            <ErrorReload error={error} classExtra="itemShowWapper" onClick={() => {
                fetchCustomer();
                setLoading(true);
                setError(null);
            }} />

        );
    }

    return (
        <div>
            <ItemForm
                title="تعديل معلومات المستهلك"
                addItemData={editItemData}
                onSubmit={sendData}
            />
            {toast.type && <AppToast data={toast} />}
        </div>
    );
}

export default EditCustomer