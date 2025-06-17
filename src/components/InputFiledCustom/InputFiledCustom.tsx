import { forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import './InputFiledCustom.css'

type InputFiledCustomProps = {
  controlId: string;
  type: string;
  placeholder: string;
  classExtraLabel?: string;
  classExtraInput?: string;
  label: React.ReactNode;
  defaultValue?: string;
  children?: React.ReactNode;
};

const InputFiledCustom = forwardRef<HTMLInputElement, InputFiledCustomProps>(
  ({controlId, type, placeholder, classExtraLabel, classExtraInput, defaultValue, label ,children }, ref) => {
    return (
      <Form.Group controlId={controlId} className='custom-input-group'>
        <Form.Label className={`fw-medium lh-1 ls-normal text-grey ${classExtraLabel}`}>
          {label }
        </Form.Label>
        <Form.Control
          className={`custom-input lh-1 ls-normal p-14 fs-12 ${classExtraInput}`}
          type={type}
          placeholder={placeholder}
          ref={ref}
          defaultValue={defaultValue}
        />
        {children}
        </Form.Group>
    );
  }
);

export default InputFiledCustom;