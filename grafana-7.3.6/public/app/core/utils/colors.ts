import config from 'grafana-7.3.6/public/app/core/config';

export function getThemeColor(dark: string, light: string): string {
  return config.bootData.user.lightTheme ? light : dark;
}
