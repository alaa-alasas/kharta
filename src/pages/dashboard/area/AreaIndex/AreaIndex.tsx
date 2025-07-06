import axios from "axios";
import { useEffect, useState } from "react";
// import type { Item } from "../../../types/Item";
import PaginationCustom from "../../../../components/PaginationCustom/PaginationCustom";
import SearchInput from "../../../../components/InputSearchCustom/InputSearchCustom";
// import ItemCard from "../../../components/ItemCard/ItemCard";
import { Link, useNavigate } from "react-router-dom";
import BtnCustom from "../../../../components/BtnCustom/BtnCustom";
import './AreaIndex.css'
import type { Item } from "../../../../types/Item";
import { MdDelete, MdEdit } from "react-icons/md";

const AreaIndex = () => {
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
      <SearchInput
        placeholder="البحث باسم الاسم"
        classExtra="pb-5"
        onSearch={Search}
      />

      <BtnCustom name={"إضافة منطقة جديدة"} classExtra="p-3 align-self-lg-end align-self-center mb-32" onClick={() => navigate('add')} />

      <div className="items-container d-flex justify-content-center align-items-center flex-wrap mb-80" style={{ gap: '35px' }}>
        <table className="table" style={{width: '60vw'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">المحافظة</th>
              <th scope="col">اسم المنطقة</th>
              <th scope="col">العمليات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>دمشق</td>
              <td>شارع بغداد</td>
              <td>
                <Link to={""}><MdEdit /></Link>
                <Link to={""}><MdDelete /></Link> 
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>ريف دمشق</td>
              <td>داريا</td>
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

export default AreaIndex;