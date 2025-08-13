import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";
import Sidebar from "../../components/SideBar/SideBar";
import ReportInfo from "../../sections/ReportInfo/ReportInfo";

const Items = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideElement =
    location.pathname === "/admin" || location.pathname === "/admin/";
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");

    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) setShowSidebar(false);
      else setShowSidebar(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        {(showSidebar || !isMobile) && (
          <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
        )}

        <div className="pt-4 flex-grow-1 bg-grey16" style={{ marginRight:  "270px" }} >
          {/* btn for show side bar or hide in small device */}
          {isMobile && (
            <button
              className="btn bg-orange mx-lg-5 mx-3 mb-4 text-white"
              onClick={() => setShowSidebar(true)}
            >
              <FiAlignLeft className="text-white" />
            </button>
          )}
          {/* elements for show in home page */}
          {hideElement && (
            <div className="container-lg pt-lg-4 p-3">
              <ReportInfo />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Items;
