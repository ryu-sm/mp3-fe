import { Box, Button, Modal, Stack, Typography } from '@mui/material';

export function DailogModal({
  open,
  icon,

  title,
  content,
  confirmText,
  handleClose,
  handleConfirm,
  color = 'primary',
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
      disableAutoFocus
    >
      <Box
        sx={{
          width: 426,
          background: 'white',
          borderRadius: '12px',
          border: (theme) => `1px solid ${theme.palette.border.one}`,
        }}
      >
        <Stack
          direction="column"
          spacing="24px"
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            p: '24px',
          }}
        >
          {icon}
          <Typography variant="h5_bold_ja">{title}</Typography>
          <Typography variant="caption_regular_ja" sx={{ whiteSpace: 'break-spaces' }}>
            {content}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing="24px"
          sx={{
            height: 68,
            width: 426,
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: (theme) => `1px solid ${theme.palette.border.one}`,
          }}
        >
          <Button
            sx={{
              height: 36,
              width: 120,
              boxShadow: 'none',
              backgroundColor: (theme) => theme.palette.background.button_disabled,
              color: (theme) => theme.palette.text.disabled,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.background.button_disabled,
                color: (theme) => theme.palette.text.disabled,
                boxShadow: 'none',
              },
            }}
            onClick={handleClose}
          >
            キャンセル
          </Button>
          <Button
            sx={{
              height: 36,
              width: 140,
              boxShadow: 'none',
              backgroundColor: (theme) => theme.palette[color].main,
              color: 'white',
              '&:hover': {
                backgroundColor: (theme) => theme.palette[color].main,
                color: 'white',
                boxShadow: 'none',
              },
            }}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
