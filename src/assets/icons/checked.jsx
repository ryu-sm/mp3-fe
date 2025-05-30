import { SvgIcon } from '@mui/material';

export function Checked({ ...props }) {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="4" fill="#3B7EFF" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.3801 7.08535C18.6091 7.29527 18.6246 7.65109 18.4146 7.8801L10.1646 16.8801C10.061 16.9932 9.91561 17.059 9.76222 17.0624C9.60883 17.0657 9.46074 17.0062 9.35225 16.8978L5.60225 13.1478C5.38258 12.9281 5.38258 12.5719 5.60225 12.3523C5.82192 12.1326 6.17808 12.1326 6.39775 12.3523L9.73233 15.6868L17.5854 7.11991C17.7953 6.8909 18.1511 6.87543 18.3801 7.08535Z"
          fill="white"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
