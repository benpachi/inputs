const InputComponent = ({field, value, onChange, type}: {
  field: string;
  value: any;
  onChange: (field: string, value: any) => void;
  type: string;
}) => {
  return (
    <label>
      {field}
      <input value={value} onChange={(e) => onChange(field, Number(e.target.value))} type={type} />
    </label>
  );
}
 
export default InputComponent;