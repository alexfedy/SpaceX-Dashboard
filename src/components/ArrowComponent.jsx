export const ArrowComponent = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 10}
      height={size || height || 10}
      viewBox="0 0 108 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 77L107.694 0.5H0.306423L54 77Z"
        fill={fill}
      />
    </svg>
  );
};
