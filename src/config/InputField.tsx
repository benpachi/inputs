const InputField = ({field, value, label, onChange, type}: {
  field: string;
  value: string | number;
  label: string;
  onChange: (field: string, value: string | number) => void;
  type: string;
}) => {
  return (
    <label className={'flexrow'} style={{justifyContent: 'space-between'}}>
      {label}
      <input 
        value={value} 
        type={type} 
        style={{width: '60%'}}
        onChange={(e) => onChange(field, (type !== 'color') ? Number(e.target.value) : e.target.value)} 
      />
    </label>
  );
}
 
export default InputField;