import { Col, Form, Row } from "react-bootstrap";
import "./ItemForm.css";
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import BtnCustom from "../BtnCustom/BtnCustom";
import CustomerSearch from "../SearchSelectCustom/SearchSelectCustom";
import type { Customer } from "../../types/Customer";

export type AddEditType = {
    label: string;
    placeholder: string;
    type: string;
    controlId: string;
    ref: React.RefObject<HTMLInputElement | HTMLSelectElement>; 
    defaultValue?: string;
    errorKey: string,
    options?: { label: string; value: string }[]; 
    onSelect?: (customer: Customer) => void;
};

type AddEditProps = {
    addItemData: AddEditType[];
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    
};

const ItemForm = ({  addItemData, onSubmit, title }: AddEditProps) => {

    return (
        <div className="formWrapper container-lg">
            <h2 className="formTitle fw-semibold">{title}</h2>
            <Form onSubmit={onSubmit}>
                <Row className="gx-4 gy-3">
                    {addItemData.map((data, index) => {
                        if (data.type === "select") {
                             return (
                                <Col key={index} xs={12} md={6}>
                                    <Form.Group controlId={data.controlId}>
                                        <Form.Label className="pb-3 fs-6 mb-0">{data.label}</Form.Label>
                                        <Form.Select
                                            ref={data.ref as React.RefObject<HTMLSelectElement>}
                                            defaultValue={data.defaultValue} 
                                            className="rounded-1"
                                            aria-label={data.label}
                                            onChange={data.onSelect}
                                            >
                                            {data.options?.map((opt, i) => {
                                                return(
                                                    <option key={i} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                )
                                            })}
                                            </Form.Select>
                                    </Form.Group>
                                </Col>
                            );
                        }else{
                            if(data.type === "select search"){
                                return(
                                    <CustomerSearch onSelect={(customer) => {
                                                // Call the onSelect function if it exists
                                                data.onSelect?.(customer!);
                                            }}  />
                                )
                            }
                        }

                        // Default case: render normal input field
                        return (
                            <Col key={index} xs={12} md={6}>
                                <InputFiledCustom
                                    controlId={data.controlId}
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    ref={data.ref as React.RefObject<HTMLInputElement>}
                                    label={data.label}
                                    classExtraLabel="pb-3 fs-6 mb-0"
                                    classExtraInput="rounded-1"
                                    defaultValue={data.defaultValue}
                                >
                                </InputFiledCustom>
                            </Col>
                        );
                    })}
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <BtnCustom name={"حفظ"} classExtra="p-3 fs-5 submitBtn mb-4" type="submit" />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ItemForm;
