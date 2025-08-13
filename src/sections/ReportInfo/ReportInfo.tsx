import "./ReportInfo.css";
import { FaCalendarCheck } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { MdMonetizationOn } from "react-icons/md";

const ReportInfo = () => {
  const items = [
    { icon: <FaCalendarCheck />, value: "1020", label: "المستهلكين" },
    { icon: <LuUsersRound />, value: "2834", label: "عدد الهدايا المسلمة" },
    { icon: <MdMonetizationOn />, value: "250", label: "المناطق" },
  ];

  return (
    <ul className="box-info d-flex flex-wrap  justify-content-center align-items-center gap-4 ps-0">
      {items.map((item, index) => (
        <li className="d-flex align-items-center gap-4" key={index}>
          <div className="bx d-flex align-items-center justify-content-center rounded-2 fs-2">
            {item.icon}
          </div>
          <span className="text">
            <h3 className="fs-40 fw-semibold">{item.label}</h3>
            <p>{item.value}</p>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ReportInfo;