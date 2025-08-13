import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface Customer {
  id: number;
  fullname: string;
}

interface CustomerSearchProps {
  onSelect: (customer: Customer) => void; 
  placeholder?: string;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  onSelect,
  placeholder = "ابحث عن مستهلك...",
}) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      axios
        .get<{ success: boolean; data: Customer[] }>("http://localhost:3000/api/customers", {
          params: { fullName: query, limit: 5 },
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          if (res.data.success) {
            setResults(res.data.data);
            setShowDropdown(res.data.data.length > 0);
          } else {
            setResults([]);
            setShowDropdown(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching customers:", err);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (customer: Customer) => {
    onSelect(customer);
    setQuery(customer.fullname);
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showDropdown && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <li className="px-4 py-2 text-gray-500">جاري التحميل...</li>
          ) : results.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">لا توجد نتائج</li>
          ) : (
            results.map((customer) => (
              <li
                key={customer.id}
                onClick={() => handleSelect(customer)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
              >
                {customer.fullname}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomerSearch;