    import { useState, useEffect } from 'react';
import type { ToastData } from '../../types/ToastData';


    interface ToastProps {
        data: ToastData
    }

    const AppToast = ({ data }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (data.show) {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
        }
    }, [data.show]);

    const bgColor =
        data.type === 'success'
        ? 'bg-success'
        : data.type === 'danger'
        ? 'bg-danger'
        : data.type === 'warning'
        ? 'bg-warning'
        : 'bg-info';

    return (
        <div
        className={`toast align-items-center text-white ${bgColor} border-0 position-fixed end-0 bottom-0 m-3 ${
            isVisible ? 'show' : 'hide'
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ zIndex: 1055 }}
        >
        <div className="d-flex">
            <div className="toast-body">{data.message}</div>
            <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setIsVisible(false)}
            ></button>
        </div>
        </div>
    );
    };

    export default AppToast;
