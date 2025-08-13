import axios from "axios";
import { useEffect, useState } from "react";
import PaginationCustom from "../../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../../components/InputSearchCustom/InputSearchCustom";
import { Link, useNavigate } from "react-router-dom";
import BtnCustom from "../../../../components/BtnCustom/BtnCustom";
import './EducationIndex.css';
import { MdDelete, MdEdit } from "react-icons/md";
import type { ToastData } from "../../../../types/ToastData";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { Item } from "../../../../types/Item";
import type { ApiResponse } from "../../../../types/ApiResponse";


const EducationIndex = () => {
    const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });

  const [showModal, setShowModal] = useState(false);

  const handleShow = (id :number) => { 
    setShowModal(true);
    setId(id);
  }
  const handleHide = () => { 
    setShowModal(false);
    setId(0);
  }
  const navigate = useNavigate();

  const [educations, setEducations] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [id,setId] = useState<number>();
  const limit = 10;

  // جلب البيانات من الخادم
  const fetchEducations = async () => {
  setLoading(true);
  try {
    const res = await axios.get<ApiResponse>("http://localhost:3000/api/education", {
      params: {
        search: searchQuery.trim(), // تأكد من trim
        page: currentPage,
        limit: 8,
      },
    });

    // تحقق من صحة الرد
    if (res.data?.success === false) {
      setEducations([]);
      setTotalPages(1);
    } else {
      setEducations(res.data.data as Item[] || []);
      setTotalPages(res.data.pagination?.pages || 1);
    }
  } catch (err) {
    console.error("Error fetching educations:", err);
    setEducations([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEducations();
  }, [currentPage, searchQuery]);

  // عند تغيير نص البحث
  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setCurrentPage(1); // العودة للصفحة الأولى عند بدء بحث جديد
  };

  // عند تغيير الصفحة
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const handleConfirrmDelete = () => {
    axios
      .delete(`http://localhost:3000/api/education/${id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => {
        
        setShowModal(false);
        setToast({
          show: true,
          type: 'success',
          message: 'Delete Education successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          fetchEducations();
      }, 2000);
      })
      .catch(() => {
        setToast({
          show: true,
          type: 'danger',
          message: 'please try again'
        });
      });
  };

  return (
    <div className="items-page-content d-flex flex-column align-items-center container-lg">
      {/* حقل البحث */}
      <SearchInput
        placeholder="البحث باسم المستوى التعليمي"
        classExtra="pb-5"
        onSearch={handleSearch}
      />

      <BtnCustom
        name="إضافة مستوى تعليمي جديد"
        classExtra="p-3 align-self-lg-end align-self-center mb-32"
        onClick={() => navigate('add')}
      />

      <div className="items-container d-flex justify-content-center align-items-center flex-wrap mb-80" style={{ gap: '35px' }}>
        <table className="table" style={{ width: '60vw' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">المستوى التعليمي</th>
              <th scope="col">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center">جاري التحميل...</td>
              </tr>
            ) : educations.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">لا يوجد مستويات تعليمية</td>
              </tr>
            ) : (
              educations.map((education, index) => (
                <tr key={education.id}>
                  <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                  <td>{education.name}</td>
                  <td>
                    <Link to={`edit/${education.id}`}><MdEdit /></Link>
                    <button className="btn btn-link p-0 text-danger" onClick={() => handleShow(education.id)}>
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* مكون التصفح */}
      <PaginationCustom
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/* Modal for delete Item */}
      <ModalCustom
        show={showModal}
        onHide={handleHide}
        body={
          <p className="text-center fw-semibold fs-22">
            Are you sure you want to delete the education?
          </p>
        }
        onSubmit={handleConfirrmDelete}
        submitText="Yes"
        cancelText="No"
      />
      {toast.type && <AppToast data={toast} />}
    </div>
  );
};

export default EducationIndex;