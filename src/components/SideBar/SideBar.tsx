import { Nav, Image, Button } from "react-bootstrap";
import "./SideBar.css";
import ImageCustom from "../ImageCustom/ImageCustom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavBarData } from "../../data/SideBarLinkData";
import axios from "axios";
import AppToast from "../ToastCustom/ToastCustom";
import ModalCustom from "../ModalCustom/ModalCustom";
import {useState} from 'react';
import type { ToastData } from "../../types/ToastData";

interface SidebarProps {
  show: boolean;
  onClose?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ show,onClose }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });
  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);

  const logout = async () => {
    setToast(prev => ({ ...prev, show: false }));
    navigate("/auth");
  };

  return (
    <div className={`sidebar d-flex flex-column align-items-center gap-5  position-fixed h-100 top-0 start-0 overflow-hidden ${!show ? 'd-none' : 'd-block'}`} style={{ minHeight: "100vh" }}>
      {onClose && (
        <button
          className="btn-close-sidebar btn bg-orange rounded-circle my-3 me-3 position-absolute top-0 end-0 rounded-circle text-white fs-1 p-0"
          onClick={onClose}>
          &times;
        </button>
      )}
      
      {/* compang logo */}
      <Link to={"/admin"}>
        <Image
          src="/kharta/Images/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>
      
      {/* Profile Section */}
      <div className="user-info  text-center">
        <ImageCustom
          src="/kharta/Images/Sidebar/Sample_User_Icon.png"
          fallbackSrc="/kharta/Images/Sidebar/Sample_User_Icon.png"
          alt="user Image"
          className="rounded-circle bg-white"
          width={'128'}
          height={'128'}
        />
        <h5 className="fw-bold">{localStorage.getItem("userName")}</h5>
      </div>

      {/* Navigation Menu */}
      <Nav
        defaultActiveKey="/home/items"
        as="ul"
        className="nav-links flex-column align-items-stretch gap-4 overflow-y-auto w-100 flex-grow-1 flex-nowrap p-1">
        {NavBarData.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `fs-14 text-decoration-none text-dark rounded py-2 px-4 d-flex gap-2 mx-auto ${ isActive ? "bg-orange" : ""}`}>
            <span className="sidebar-link fw-medium position-relative">{item.name}</span>
          </NavLink>
        ))}
      </Nav>

      {/* Logout Button */}
        <Button
          className="logout-btn py-2 px-3 d-flex align-items-center gap-4 fw-medium text-decoration-none mt-auto"
          onClick={handleShow}
          variant="link">
          تسجيل الخروج
          {/* <Image src="/Task5/Images/Sidebar/sign-out.svg" alt="logout Logo" /> */}
        </Button>
        {/* Modal for logout confirm */}
        <ModalCustom
          show={showModal}
          onHide={handleHide}
          body={
            <p className="text-center fw-semibold fs-22">
              هل أنت متأكد من تسجيل الخروج?
            </p>
          }
          onSubmit={logout}
          submitText="نعم"
          cancelText="لا"
        />
        {toast.type && <AppToast data={toast} />}
    </div>
  );
};

export default Sidebar;
