import InputColor from "react-input-color";
import style from "./Input.module.scss";
interface props {
  title: string;
  value: string;
  type?: string;
  name: string;
  isColorPicker?: boolean;
  onChange: (e: any, ...args: any[]) => void;
  [props: string]: any;
}

function Input({
  title,
  value,
  name,
  type = "text",
  onChange,
  isColorPicker,
  ...props
}: props) {
  return (
    <div className={style.groupInput}>
      <p>
        {title} <span style={{ color: "red" }}>(*)</span>
      </p>
      <div className={style.input}>
        {isColorPicker && (
          <InputColor
            initialValue={value}
            onChange={(e) => onChange(e, name)}
            placement="right"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}

export default Input;
