import { SvgIcon } from '@mui/material';

export function RightOpen({ disabled, ...props }) {
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
          d="M7.50781 5L12.5078 10L7.50781 15"
          stroke={disabled ? '#A5AABE' : '#191B1F'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
