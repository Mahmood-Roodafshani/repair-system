import { PureLightTheme } from './PureLightTheme';
import { PureDarkTheme } from './PureDarkTheme';
import { MilitaryTheme } from './MilitaryTheme';
import { CorporateTheme } from './CorporateTheme';
import { ThemeName } from '../types';
import { Theme } from '@mui/material';

export const themeMap: Record<ThemeName, Theme> = {
  PureLightTheme,
  PureDarkTheme,
  MilitaryTheme,
  CorporateTheme,
} as const;

export type { ThemeName }; 