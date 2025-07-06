import { useRef} from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import "./InputSearchCustom.css";

interface SearchInputProps {
  placeholder?: string;
  classExtra?: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, classExtra, onSearch }) => {
  
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(ref.current?.value.trim() || '');
    }
  };

  return (
    <InputGroup className={`search-bar rounded-2 ${classExtra}`}>
      <Form.Control
        ref={ref}
        className="form-control lh-1 border-0 "
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <InputGroup.Text className="btn border-0 bg-white" onClick={() => onSearch(ref.current?.value.trim() || '')}>
        <BiSearch />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchInput;
