import { SvgIcon } from '@mui/material';

export function DownClose({ disabled, ...props }) {
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
          d="M15.0078 7.5L10.0078 12.5L5.00781 7.5"
          stroke={disabled ? '#A5AABE' : '#191B1F'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
