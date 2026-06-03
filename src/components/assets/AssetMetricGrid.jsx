import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MetricCard({ label, value, children }) {
  return (
    <Box sx={{ p: 1.6, borderRadius: '14px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', height: '100%' }}>
      <Typography sx={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', mb: 1 }}>{value}</Typography>
      <Typography className="mono" sx={{ fontSize: 8, color: 'var(--dim)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</Typography>
      {children}
    </Box>
  );
}

export default function AssetMetricGrid({ asset = {} }) {
  const apyRaw = asset.apy ? String(asset.apy).replace('%', '') : null;
  const apy = apyRaw ? `${parseFloat(apyRaw)}%` : '—';
  const occupancy = asset.occupancy ?? (asset.funded ? `${asset.funded}%` : 'N/A');
  const funding = typeof asset.funded === 'number' ? asset.funded : 0;
  const minimum = asset.min ?? '—';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <MetricCard label="Target APY" value={apy} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MetricCard label="Occupancy" value={occupancy} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MetricCard label="Funding Progress" value={`${funding}%`}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MetricCard label="Minimum participation" value={minimum} />
      </Grid>
    </Grid>
  );
}
