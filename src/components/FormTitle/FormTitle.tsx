import type { TitleData } from "../../types/Title"; 
import './FormTitle.css'; 

interface TitleProps {
  data: TitleData;
}

const FormTitle: React.FC<TitleProps> = ({ data }) => {
  return (
    <div className="title-comp">
      <h2 className="text-uppercase fw-semibold fs-3 mb-0 lh-1 ls-normal text-center pb-2">{data.title}</h2>
      <p className="fs-6 mb-0 lh-1 ls-normal text-center text-grey">{data.desc}</p>
    </div>
  );
};

export default FormTitle;