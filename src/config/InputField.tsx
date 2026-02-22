const InputField = ({field, value, onChange, type}: {
  field: string;
  value: string | number;
  onChange: (field: string, value: string | number) => void;
  type: string;
}) => {
  return (
    <label>
      {field}
      <input value={value} onChange={(e) => onChange(field, (type !== 'color') ? Number(e.target.value) : e.target.value)} type={type} />
    </label>
  );
}
 
export default InputField;