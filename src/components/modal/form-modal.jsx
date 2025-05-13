import { Box, Button, Modal, Stack, Typography } from '@mui/material';

export function FormModal({
  open,
  width,
  title,
  children,
  confirmText,
  handleClose,
  handleConfirm,
  confirmDisabled,
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
          width: width || 554,
          background: 'white',
          borderRadius: '12px',
          border: (theme) => `1px solid ${theme.palette.border.one}`,
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: 60,
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottom: (theme) => `1px solid ${theme.palette.border.one}`,
            px: '24px',
          }}
        >
          <Typography variant="h6_bold_ja">{title}</Typography>
        </Stack>
        <Stack
          direction="column"
          spacing="24px"
          sx={{
            width: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            p: '24px',
          }}
        >
          {children}
        </Stack>
        <Stack
          direction="row"
          spacing="16px"
          sx={{
            height: 60,
            width: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: (theme) => `1px solid ${theme.palette.border.one}`,
          }}
        >
          <Button
            sx={{
              height: 44,
              maxHeight: 44,
              width: 120,
              boxShadow: 'none',
              backgroundColor: 'transparent',
              color: (theme) => theme.palette.primary.main,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: 'transparent',
                color: (theme) => theme.palette.primary.main,
                boxShadow: 'none',
              },
            }}
            onClick={handleClose}
          >
            キャンセル
          </Button>
          <Button
            sx={{
              height: 44,
              maxHeight: 44,
              width: 170,
              boxShadow: 'none',
              backgroundColor: (theme) => theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: 'white',
                boxShadow: 'none',
              },
            }}
            disabled={confirmDisabled}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
