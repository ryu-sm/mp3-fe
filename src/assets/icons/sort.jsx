import { useMemo } from 'react';
import { SvgIcon } from '@mui/material';

export function Sort({ status, ...props }) {
  const leftColor = useMemo(() => {
    if (status === 'asc') {
      return 'black';
    }
    return '#A5AABE';
  });

  const rightColor = useMemo(() => {
    if (status === 'desc') {
      return 'black';
    }
    return '#A5AABE';
  });

  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill="none" />
        <path
          d="M3 10.4531L7.00004 4M7.00004 4L11 10.4531M7.00004 4L7.00022 20"
          stroke={leftColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 13.5469L17 20M17 20L21 13.5469M17 20L17.0002 4"
          stroke={rightColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
