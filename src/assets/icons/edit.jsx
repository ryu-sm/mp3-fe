import { SvgIcon } from '@mui/material';

export function Edit({ ...props }) {
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
          d="M11.464 17.0358H17.5078M9.19183 5.00074L13.7354 8.49001M10.6578 3.16233C11.3042 2.38982 12.4661 2.27655 13.2547 2.90978C13.2983 2.94413 14.699 4.03232 14.699 4.03232C15.5653 4.55599 15.8345 5.66925 15.299 6.51882C15.2705 6.56432 7.3511 16.4704 7.3511 16.4704C7.08763 16.7991 6.68767 16.9931 6.26024 16.9978L3.22742 17.0358L2.54409 14.1436C2.44836 13.7369 2.54409 13.3098 2.80756 12.9811L10.6578 3.16233Z"
          stroke="#3B7EFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
