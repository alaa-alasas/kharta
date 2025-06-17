
import React from 'react';
import { Button } from 'react-bootstrap';
import './BtnCustom.css'
type BtnCustomProps = {
    name: string;
    classExtra?: string;
    onClick?: () => void;
    [key: string]: any;
  };

const BtnCustom: React.FC<BtnCustomProps> = ({ name , classExtra, onClick, ...props }) => {

  return (
    <Button
        className={`btn-custom border border-0 rounded-1 text-white fw-medium lh-1 ls-normal bg-green00 ${classExtra}`}
        onClick={onClick}
        {...props}
      >
        {name}
      </Button>
  );
};

export default BtnCustom;