'use client';

import { AccountBalanceWallet, DescriptionOutlined } from '@mui/icons-material';
import {
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';

type DisbursementAccountOption = 'savings' | 'manager-check';
type AutomaticDebitOption = 'yes' | 'no';

interface AccountOptionProps {
  value: DisbursementAccountOption;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}

const ACCOUNT_OPTIONS: AccountOptionProps[] = [
  {
    value: 'savings',
    title: 'Ahorros',
    subtitle: '••••••1525',
    icon: <AccountBalanceWallet />,
  },
  {
    value: 'manager-check',
    title: 'Cheque de gerencia',
    icon: <DescriptionOutlined />,
  },
];

const radioSx = {
  color: '#7A8FA3',
  '&.Mui-checked': {
    color: 'primary.main',
  },
};

export default function AccountPage(): React.ReactNode {
  const [disbursementAccount, setDisbursementAccount] =
    useState<DisbursementAccountOption>('savings');
  const [automaticDebit, setAutomaticDebit] =
    useState<AutomaticDebitOption>('no');

  useEffect(() => {
    window.parent.postMessage({ type: 'CREDIT_FLOW_READY' }, '*');
  }, []);

  return (
    <Card data-testid="account-page-card">
      <Typography variant="h2" sx={{ mb: 5 }}>
        Seleccionar cuenta
      </Typography>
      <Box sx={{ maxWidth: 560, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 5 }}>
          ¿En cuál cuenta desea que desembolsemos su crédito?
        </Typography>

        <RadioGroup
          value={disbursementAccount}
          onChange={(event) =>
            setDisbursementAccount(
              event.target.value as DisbursementAccountOption
            )
          }
          sx={{ gap: 1.5 }}
        >
          {ACCOUNT_OPTIONS.map((option) => (
            <Box
              key={option.value}
              sx={{
                border: '2px solid',
                borderColor:
                  disbursementAccount === option.value
                    ? 'primary.main'
                    : '#C3CFDB',
                borderRadius: 2,
                px: 2,
                py: 1.5,
                backgroundColor:
                  disbursementAccount === option.value
                    ? 'rgba(77, 112, 209, 0.08)'
                    : 'rgba(15, 47, 77, 0.03)',
                boxShadow: '0 1px 6px rgba(15, 47, 77, 0.08)',
              }}
            >
              <FormControlLabel
                value={option.value}
                control={<Radio sx={radioSx} />}
                labelPlacement="start"
                sx={{
                  width: '100%',
                  m: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1.5,
                }}
                label={
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box
                      color="primary.main"
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(77, 112, 209, 0.12)',
                        flexShrink: 0,
                      }}
                    >
                      {option.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6">{option.title}</Typography>
                      {option.subtitle ? (
                        <Typography variant="body2" color="text.primary">
                          {option.subtitle}
                        </Typography>
                      ) : null}
                    </Box>
                  </Stack>
                }
              />
            </Box>
          ))}
        </RadioGroup>

        <Box
          sx={{
            mt: 2,
            mb: 5,
            p: 2,
            border: '2px solid',
            borderColor: '#C3CFDB',
            borderRadius: 2,
            backgroundColor: 'rgba(15, 47, 77, 0.03)',
            boxShadow: '0 1px 6px rgba(15, 47, 77, 0.08)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            ¿Autoriza que se débite su cuota mensual automáticamente?
          </Typography>

          <RadioGroup
            row
            value={automaticDebit}
            onChange={(event) =>
              setAutomaticDebit(event.target.value as AutomaticDebitOption)
            }
            sx={{ columnGap: 2 }}
          >
            <FormControlLabel value="yes" control={<Radio sx={radioSx} />} label="Sí" />
            <FormControlLabel value="no" control={<Radio sx={radioSx} />} label="No" />
          </RadioGroup>
        </Box>

        <Button
          type="button"
          colorStyle="primary"
          sx={{ width: '100%', mt: 3 }}
          onClick={() => {
            window.parent.postMessage({ type: 'CREDIT_FLOW_CONTINUE' }, '*');
          }}
        >
          Continuar
        </Button>
      </Box>
    </Card>
  );
}
