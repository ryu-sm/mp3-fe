import { Stack, styled, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 540,
    maxWidth: 540,
    background: 'transparent',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.border.one}`,
    padding: 0,
  },
}));
export function PreviewContent({ title, label, content }) {
  return (
    <HtmlTooltip
      placement="bottom-start"
      title={
        <Stack
          direction="column"
          spacing="24px"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',

            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 48,
              justifyContent: 'flex-start',
              alignItems: 'center',
              background: (theme) => theme.palette.background.preview,
              px: '24px',
            }}
          >
            <Typography variant="body_semibold_ja">{label}</Typography>
          </Stack>
          <Stack sx={{ px: '24px', pb: '24px' }}>
            <Typography variant="caption_regular_ja" sx={{ whiteSpace: 'break-spaces' }}>
              {content}
            </Typography>
          </Stack>
        </Stack>
      }
    >
      <Typography variant="caption_regular_ja">{title}</Typography>
    </HtmlTooltip>
  );
}
