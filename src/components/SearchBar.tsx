import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  placeholder: string;
  onSetSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ placeholder, onSetSearchTerm }: SearchBarProps) => {
  const [rawSearch, setRawSearch] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSetSearchTerm(rawSearch);
    }, 250);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [rawSearch, onSetSearchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRawSearch(event.target.value);
  };

  return (
    <Input
      allowClear
      className="w-64"
      placeholder={placeholder}
      onChange={(e) => handleInputChange(e)}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchBar;
