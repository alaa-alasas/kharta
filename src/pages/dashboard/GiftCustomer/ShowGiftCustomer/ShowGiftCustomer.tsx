import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowGiftCustomer.css";
import Loader from "../../../../components/Loader/Loader";
import ErrorReload from "../../../../components/ErrorReload/ErrorReload";

const ShowGiftCustomer = () => {
  const { id } = useParams();
  // const [showItem, setShowItem] = useState<Item>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getItem();
  }, []);

  var getItem = () => {
    axios
    .get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(() => {
      setLoading(false);
      // setShowItem(res.data);
    })
    .catch((err) => {
      console.log(err);
      setError("Failed to load item. Please try again later.");
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
        <ErrorReload error={error} classExtra="itemShowWapper" onClick={() => {
            getItem();
            setLoading(true);
            setError(null);
        }}  />
      
    );
  }
  return (
    <div className="itemShowWapper container-lg">
      {/* <BackBtn to="/home/items" /> */}

      <h2 className="fw-semibold itemShowTitle lh-1">
        {/* {showItem?.name} */}
      </h2>

      <div className="text-lg-center text-start">
        {/* {showItem && (
          <ImageCustom
            src={showItem?.image_url}
            fallbackSrc="/Task5/Images/product/default.png"
            alt={showItem?.name}
            className="itemShowImage"
          />
        )} */}
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <p className="fw-semibold itemShowPrice mb-0 lh-1">
          Price:{" "}
          <span className="fw-medium itemShowSpan">
            {/* {showItem?.price}$ */}
          </span>
        </p>
        <p className="fw-semibold itemShowPrice mb-0 lh-1">
          Added At:{" "}
          <span className="fw-medium itemShowSpan">
            {/* {formatDate(showItem?.created_at)} */}
          </span>{" "}
        </p>
      </div>

      <p className="fw-semibold text-lg-center text-start itemShowPrice mb-0 lh-1">
        Updated At:{" "}
        <span className="fw-medium itemShowSpan">
          {/* {formatDate(showItem?.updated_at)} */}
        </span>
      </p>
    </div>
  );
};

export default ShowGiftCustomer;
