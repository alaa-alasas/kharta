import { Link } from 'react-router-dom'
import './Error.css'

const Error = () => {
  return (
    <div className="error-page d-flex align-items-center justify-content-center">
    <div className="error-container text-center p-4">
        <h1 className="error-code mb-0">404</h1>
        <h2 className="display-6 error-message mb-3">Page Not Found</h2>
        <p className="lead error-message mb-5">We can't seem to find the page you're looking for.</p>
        <div className="d-flex justify-content-center gap-3">
            <Link to="/home" className="btn-glass btn px-4 py-2">Return Home</Link>
            <Link to="/home" className="btn-glass btn px-4 py-2">Report Problem</Link>
        </div>
    </div>
</div>
  )
}

export default Error