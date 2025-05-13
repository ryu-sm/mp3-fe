import { SvgIcon } from '@mui/material';

export function PwdCheckOn({ ...props }) {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="#13BF2E" />
        <path
          d="M17.8334 7.98959L9.81258 16.0104L6.16675 12.3646"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
