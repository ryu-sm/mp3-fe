import { SvgIcon } from '@mui/material';

export function Uncheck({ ...props }) {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.75"
          y="0.75"
          width="22.5"
          height="22.5"
          rx="3.25"
          fill="#F9FBFC"
          stroke="#D3E2EA"
          strokeWidth="1.5"
        />
      </svg>
    </SvgIcon>
  );
}
