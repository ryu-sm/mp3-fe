import { SvgIcon } from '@mui/material';

export function FormWarning({ ...props }) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9 3V12H11V3H9ZM9 15V17H11V15H9Z"
          fill="#F64C4C"
        />
      </svg>
    </SvgIcon>
  );
}
