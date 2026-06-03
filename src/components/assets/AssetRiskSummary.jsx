import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const badgeStyle = (level) => {
  if (level === 'Low') {
    return { background: 'rgba(112,181,139,.12)', color: 'var(--green-2)', border: '1px solid rgba(112,181,139,.22)' };
  }
  if (level === 'Medium') {
    return { background: 'rgba(215,181,109,.12)', color: 'var(--gold-2)', border: '1px solid rgba(215,181,109,.24)' };
  }
  if (level === 'High') {
    return { background: 'rgba(225,124,124,.14)', color: 'var(--red)', border: '1px solid rgba(225,124,124,.25)' };
  }
  return { background: 'rgba(255,255,255,.06)', color: 'var(--text)', border: '1px solid rgba(255,255,255,.08)' };
};

export default function AssetRiskSummary({ level = 'Medium', note }) {
  return (
    <Box className="vx-card" sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography className="mono" sx={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-2)' }}>Risk summary</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>Investor risk profile</Typography>
        </Box>
        <Chip label={level} sx={{ height: 32, borderRadius: '999px', px: 2, fontWeight: 700, ...badgeStyle(level) }} />
      </Box>
      <Typography className="vx-copy" sx={{ mt: 1, color: 'var(--muted)', fontSize: 14, lineHeight: 1.85 }}>
        {note || 'Real-world assets involve market, liquidity and operational risks.'}
      </Typography>
    </Box>
  );
}
