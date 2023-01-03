import classNames from "classnames"

const variants = {
  primary: "active:bg-slate-100",
  secondary: "mt-8 bg-blue-600 text-white rounded-lg active:bg-blue-800",
}

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4",
}

const Button = (props) => {
  const { variant = "primary", size = "sm", className, ...otherProps } = props

  return (
    <button
      className={classNames(variants[variant], sizes[size], className)}
      {...otherProps}
    />
  )
}

export default Button
