import axios from "axios";
import { useEffect, useState } from "react";
import PaginationCustom from "../../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../../components/InputSearchCustom/InputSearchCustom";
import { Link, useNavigate } from "react-router-dom";
import BtnCustom from "../../../../components/BtnCustom/BtnCustom";
import './GiftCustomerIndex.css'
import type { Item } from "../../../../types/Item";
import { Row, Col } from "react-bootstrap";
import { MdEdit , MdDelete} from "react-icons/md";
import type { ApiResponse } from "../../../../types/ApiResponse";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom";
import AppToast from "../../../../components/ToastCustom/ToastCustom";
import type { ToastData } from "../../../../types/ToastData";
import CustomerSearch from "../../../../components/SearchSelectCustom/SearchSelectCustom";
import type { CustomerGift } from "../../../../types/CustomerGift";
import { formatDate } from "../../../../commons/formatDate";

const GiftCustomerIndex = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<ToastData>({
        show: false,
        type: 'success',
        message: '',
    });
  const [giftCustomer, setGiftCustomer] = useState<CustomerGift[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [id,setId] = useState<number>();
  const limit = 10;

  const handleShow = (id :number) => { 
    setShowModal(true);
    setId(id);
  }
  const handleHide = () => { 
    setShowModal(false);
    setId(0);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchGiftCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse>("http://localhost:3000/api/giftCustomer", {
        params: {
          search: searchQuery.trim(), // تأكد من trim
          page: currentPage,
          limit: 8,
        },
    });

    // تحقق من صحة الرد
    if (res.data?.success === false) {
      setGiftCustomer([]);
      setTotalPages(1);
    } else {
      setGiftCustomer(res.data.data as CustomerGift[] || []);
      setTotalPages(res.data.pagination?.pages || 1);
    }
  } catch (err) {
    console.error("Error fetching educations:", err);
    setGiftCustomer([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchGiftCustomers();
  }, [currentPage, searchQuery]);

   const handleConfirrmDelete = () => {
    axios
      .delete(`http://localhost:3000/api/giftCustomer/${id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => {
        
        setShowModal(false);
        setToast({
          show: true,
          type: 'success',
          message: 'تم الحذف بنجاح'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          fetchGiftCustomers();
      }, 2000);
      })
      .catch(() => {
        setToast({
          show: true,
          type: 'danger',
          message: 'يرجى إعادة المحاولة'
        });
      });
  };

  const handleSearchChange = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setCurrentPage(1); 
  };


  return (
    <div className="items-page-content d-flex flex-column align-items-center container-lg">
      {/* search box */}

      <Row className="gx-3 gy-3 pb-2">
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث باسم المستهلك"
            onSearch={handleSearchChange}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب الهدية"
            onSearch={handleSearchChange}
          />
        </Col>
      </Row>


      <BtnCustom 
        name={"إضافة هدية جديد"} 
        classExtra="p-3 align-self-lg-end align-self-center mb-32" 
        onClick={() => navigate('add')} />

      <div className="items-container d-flex justify-content-center align-items-center flex-wrap mb-80" 
      style={{ gap: '35px' }}>
        <table className="table" style={{ width: '60vw' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">اسم المستهلك</th>
              <th scope="col">الهدية</th>
              <th scope="col">تاريخ استلام الهدية</th>
              <th scope="col">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">جاري التحميل...</td>
              </tr>
            ) : giftCustomer.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">لا يوجد بيانات</td>
              </tr>
            ) : (
              giftCustomer.map((education, index) => (
                <tr key={education.id}>
                  <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                  <td>{education.customer_name}</td>
                  <td>{education.gift_name}</td>
                  <td>{formatDate(education.date)}</td>
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
      {/* pagination component */}
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
            Are you sure you want to delete the Gift Customer?
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

export default GiftCustomerIndex;