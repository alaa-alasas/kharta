import axios from "axios";
import { useEffect, useState } from "react";
import PaginationCustom from "../../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../../components/InputSearchCustom/InputSearchCustom";
import { Link, useNavigate } from "react-router-dom";
import BtnCustom from "../../../../components/BtnCustom/BtnCustom";
import './CustomerIndex.css';
import { Row, Col } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { formatDate } from "../../../../commons/formatDate";
import type { ToastData } from "../../../../types/ToastData";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { Customer } from "../../../../types/Customer";



// هيكل الرد من الخادم
type ApiResponse = {
  success: boolean;
  data: Customer[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  search: {
    province: string;
    fullName: string;
    hobby: string;
    area: string;
    birthdate: string;
    work: string;
  };
};

const CustomerIndex = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });
  // حالة البيانات
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // حالة البحث
  const [search, setSearch] = useState({
    fullName: '',
    province: '',
    area: '',
    hobby: '',
    birthdate: '',
    work: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [id,setId] = useState<number>();

  const API_URL = "http://localhost:3000/api/customers";
  const handleShow = (id :number) => { 
    setShowModal(true);
    setId(id);
  }
  const handleHide = () => { 
    setShowModal(false);
    setId(0);
  }
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: 8,
        ...search,
      };

      const res = await axios.get<ApiResponse>(API_URL, {
        params,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.data.success) {
        setCustomers(res.data.data);
        setTotalPages(res.data.pagination.pages);
      } else {
        setCustomers([]);
        setTotalPages(1);
      }
    } catch (err: any) {
      console.error("Error fetching customers:", err);
      setError("فشل في تحميل البيانات. تحقق من الاتصال.");
      setCustomers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, search]);


  const handleConfirrmDelete = () => {
    axios
      .delete(`http://localhost:3000/api/customers/${id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => {
        
        setShowModal(false);
        setToast({
          show: true,
          type: 'success',
          message: 'Delete Item successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          fetchCustomers();
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
      {/* حقول البحث */}
      <Row className="gx-3 gy-3 pb-2 w-100">
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث باسم المستهلك"
            // value={search.fullName}
            onSearch={(val) => handleSearchChange("fullName", val)}
            // onClear={() => handleSearchChange("fullName", "")}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث بالمحافظة"
            // value={search.province}
            onSearch={(val) => handleSearchChange("province", val)}
            // onClear={() => handleSearchChange("province", "")}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث بالمنطقة"
            // value={search.area}
            onSearch={(val) => handleSearchChange("area", val)}
            // onClear={() => handleSearchChange("area", "")}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب الهواية"
            // value={search.hobby}
            onSearch={(val) => handleSearchChange("hobby", val)}
            // onClear={() => handleSearchChange("hobby", "")}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب العمل"
            // value={search.work}
            onSearch={(val) => handleSearchChange("work", val)}
            // onClear={() => handleSearchChange("work", "")}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب تاريخ الميلاد"
            // type="date"
            // value={search.birthdate}
            onSearch={(val) => handleSearchChange("birthdate", val)}
            // onClear={() => handleSearchChange("birthdate", "")}
          />
        </Col>
      </Row>

      {/* زر الإضافة */}
      <BtnCustom
        name="إضافة مستهلك جديد"
        classExtra="p-3 align-self-lg-end align-self-center mb-32"
        onClick={() => navigate('add')}
      />

      {/* رسالة الخطأ أو التحميل */}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : customers.length === 0 ? (
        <p>لا توجد بيانات مطابقة للبحث.</p>
      ) : null}

      {/* الجدول */}
      <div className="items-container mb-80" style={{ width: '60vw' }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">اسم المستهلك</th>
              <th scope="col">الجنس</th>
              <th scope="col">المحافظة</th>
              <th scope="col">المنطقة</th>
              <th scope="col">الهواية</th>
              <th scope="col">تاريخ الميلاد</th>
              <th scope="col">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <th scope="row">{(currentPage - 1) * 8 + index + 1}</th>
                <td>{customer.fullname}</td>
                <td>{customer.gender == true? 'ذكر' : 'أنثى'}</td>
                <td>{customer.province}</td>
                <td>{customer.area}</td>
                <td>{customer.hobby}</td>
                <td>{formatDate(customer.birthdate)}</td>
                <td>
                  <Link to={`edit/${customer.id}`} className="me-3">
                    <MdEdit size={20} />
                  </Link>
                  <button
                    className="btn btn-link p-0 text-danger"
                    onClick={() => handleShow(customer.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* التصفح */}
      {!loading && customers.length > 0 && (
        <PaginationCustom
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {/* Modal for delete Item */}
      <ModalCustom
        show={showModal}
        onHide={handleHide}
        body={
          <p className="text-center fw-semibold fs-22">
            Are you sure you want to delete the product?
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

export default CustomerIndex;