import axios from "axios";
import { useEffect, useState } from "react";
import PaginationCustom from "../../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../../components/InputSearchCustom/InputSearchCustom";
import { Link, useNavigate } from "react-router-dom";
import BtnCustom from "../../../../components/BtnCustom/BtnCustom";
import './CustomerIndex.css'
import type { Item } from "../../../../types/Item";
import { Row, Col } from "react-bootstrap";
import { MdEdit , MdDelete} from "react-icons/md";

const CustomerIndex = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Item[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / 8);
  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;

  const [searchQuery, setSearchQuery] = useState("");

  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchProducts = async () => { // function to fetch Item from backend
    try {
      const res = await axios.get("https://web-production-3ca4c.up.railway.app/api/items", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // Search for products by name
  const Search = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);

    if (!query.trim()) {
      //if search box empty return all items
      setFilteredProducts(products);
    } else {
      //check for all items if contain word found in search box to return item match with it
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  return (
    <div className="items-page-content d-flex flex-column align-items-center container-lg">
      {/* search box */}

      <Row className="gx-3 gy-3 pb-2">
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث باسم المستهلك"
            onSearch={Search}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث بالمحافظة"
            onSearch={Search}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث بالمنطقة"
            onSearch={Search}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب الهواية"
            onSearch={Search}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب العمل"
            onSearch={Search}
          />
        </Col>
        <Col xs={12} md={6}>
          <SearchInput
            placeholder="البحث حسب تاريخ الميلاد"
            onSearch={Search}
          />
        </Col>
      </Row>


      <BtnCustom name={"إضافة مستهلك جديد"} classExtra="p-3 align-self-lg-end align-self-center mb-32" onClick={() => navigate('add')} />

      <div className="items-container d-flex justify-content-center align-items-center flex-wrap mb-80" style={{ gap: '35px' }}>
        <table className="table" style={{ width: '60vw' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">اسم المستهلك</th>
              <th scope="col">المحافظة</th>
              <th scope="col">المنطقة</th>
              <th scope="col">تاريخ الميلاد</th>
              <th scope="col">العمليات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>عبد الرحمن</td>
              <td>دمشق</td>
              <td>شارع بغداد</td>
              <td>7/7/1997</td>
              <td>
                <Link to={""} ><MdEdit /></Link>
                <Link to={""} ><MdDelete /></Link> 
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>عبد الرحمن</td>
              <td>دمشق</td>
              <td>شارع بغداد</td>
              <td>7/7/1997</td>
              <td>
                <Link to={""}><MdEdit /></Link>
                <Link to={""}><MdDelete /></Link> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* pagination component */}
      <PaginationCustom
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomerIndex;