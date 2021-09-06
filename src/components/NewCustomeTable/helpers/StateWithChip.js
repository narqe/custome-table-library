import { Chip } from '@material-ui/core';
import React from 'react';

export const stateWithChip = (value, label) => {
  return (
    <Chip
      size="small"
      label={label}
      color={
        value === 'PRE_APPROVED' || value === 'APPROVED'
          ? 'secondary'
          : 'default'
      }
    />
  );
};
