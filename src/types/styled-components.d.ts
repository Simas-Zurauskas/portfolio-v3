import 'styled-components';
import { colorsLib, ColorsSet, ColorScheme } from '@/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    /** CSS variables (var(--X)) - no flash, use for solid colors */
    colors: ColorsSet;
    /** Hex values - use when you need alpha suffix like }50 */
    hex: ColorsSet;
    colorsLib: typeof colorsLib;
    scheme: ColorScheme;
  }
}

export {};
