import clsx from 'clsx'
import style from './Input.module.scss'

function Input({
  type = 'text',
  label = null,
  placeholder = '',
  className,
  onChange,
  value,
  name,
}) {
  return (
    <div className={clsx([style.groupForm, className])}>
      {label && <label className={style.label}>{label}</label>}
      <div className={style.groupInput}>
        <input
          name={name}
          value={value}
          className={style.inputElement}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Input
