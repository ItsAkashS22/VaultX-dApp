import React from 'react';
import Drawer from 'antd/es/drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import AssetMetricGrid from './AssetMetricGrid';
import AssetRiskSummary from './AssetRiskSummary';
import AssetActionPanel from './AssetActionPanel';

const getStatusChipStyle = (status) => {
  if (status === 'Open') {
    return { background: 'linear-gradient(135deg, var(--gold-2), var(--gold))', color: '#0a1411', border: '1px solid rgba(215,181,109,.34)' };
  }
  if (status === 'Allocation') {
    return { background: 'rgba(255,255,255,.05)', color: 'var(--text)', border: '1px solid rgba(255,255,255,.08)' };
  }
  if (status === 'Priority') {
    return { background: 'rgba(215,181,109,.12)', color: 'var(--gold-2)', border: '1px solid rgba(215,181,109,.24)' };
  }
  return { background: 'rgba(255,255,255,.06)', color: 'var(--text)', border: '1px solid rgba(255,255,255,.08)' };
};

export default function AssetDetailDrawer({ open = false, asset = null, onClose = () => {} }) {
  const drawerWidth = typeof window !== 'undefined' ? Math.min(720, window.innerWidth - 48) : 720;

  const assetData = asset || {};
  const name = assetData.name || 'Unnamed asset';
  const id = assetData.id || '—';
  const type = assetData.type || '—';
  const status = assetData.status || 'Unknown';
  const location = assetData.location || '—';
  const memo = assetData.memo || assetData.description || 'No memo available.';
  const apyRaw = assetData.apy ? String(assetData.apy).replace('%', '') : null;
  const apyValue = apyRaw ? parseFloat(apyRaw) : NaN;

  let riskLevel = 'Medium';
  if (!Number.isNaN(apyValue)) {
    riskLevel = apyValue >= 9.5 ? 'High' : apyValue >= 8.5 ? 'Medium' : 'Low';
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={drawerWidth}
      closable={false}
      destroyOnClose
      bodyStyle={{ padding: 0, background: 'transparent', height: '100vh', overflow: 'hidden' }}
      drawerStyle={{ top: 0, height: '100vh', background: 'transparent' }}
      maskStyle={{ backgroundColor: 'rgba(4,10,9,.88)' }}
      maskClosable
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}>
        <Box
          className="vx-card-strong"
          sx={{
            px: { xs: 3, md: 4 },
            pt: { xs: 3, md: 4 },
            pb: 3,
            borderRadius: 0,
            borderTopLeftRadius: 'var(--radius-xl)',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: 'none',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography className="vx-title" sx={{ fontSize:'26px', fontWeight:800, color:'var(--text)',fontSize: { xs: 22, md: 28 }, mb: 0.75 }}>{name}</Typography>
              <Typography className="mono" sx={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold-2)', mb: 1 }}>{id} • {type}</Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={status} sx={{ height: 34, px: 2, fontWeight: 700, borderRadius: '999px', ...getStatusChipStyle(status) }} />
              <IconButton
                onClick={onClose}
                sx={{
                  width: 36,
                  height: 36,
                  color: 'var(--text)',
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.08)',
                  '&:hover': { background: 'rgba(255,255,255,.1)' },
                }}
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          px: { xs: 3, md: 4 },
          py: 3,
          background: 'linear-gradient(180deg, #12231f, #0d1b18)',
          borderTop: '1px solid rgba(255,255,255,.06)',
        }}>
          <Box sx={{ mb: 4 }}>
            <AssetMetricGrid asset={assetData} />
          </Box>

          <Box sx={{ display: 'grid', gap: 3, mb: 3 }}>
            <Box>
              <Typography className="mono" sx={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-2)', mb: 1 }}>Location</Typography>
              <Typography sx={{ color: 'var(--text)', fontSize: 15 }}>{location}</Typography>
            </Box>

            <Box>
              <Typography className="mono" sx={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-2)', mb: 1 }}>Short asset memo</Typography>
              <Typography sx={{ color: 'var(--text)', fontSize: 15 }}>{memo}</Typography>
            </Box>
          </Box>

          <AssetRiskSummary level={riskLevel} />
        </Box>

        <Box sx={{ px: { xs: 3, md: 4 }, py: 3, borderTop: '1px solid rgba(255,255,255,.08)', background: 'rgba(8,19,17,.96)', flexShrink: 0 }}>
          <AssetActionPanel asset={assetData} />
        </Box>
      </Box>
    </Drawer>
  );
}
