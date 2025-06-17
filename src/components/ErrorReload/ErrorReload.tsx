import BackBtn from "../BackBtn/BackBtn";

interface ErrorReloadProps {
  error?: string;
  classExtra?: string;
  onClick: () => void;
}


const ErrorReload : React.FC<ErrorReloadProps> = ({ error, classExtra, onClick }) => {
  return (
    <div className={`container-lg h-100 ${classExtra}`}>
    <BackBtn to="/home/items" />
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h4 className="text-danger text-center mt-5">{error}</h4>
      <button
        className="btn bg-orange text-white"
        onClick={() => onClick()}>
        Try Again
      </button>
    </div>
  </div>
  )
}

export default ErrorReload