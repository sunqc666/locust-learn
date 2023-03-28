// Libraries
import React from 'react';
import { css, cx } from 'emotion';

// Utils & Services
import { config } from 'grafana-7.3.6/public/app/core/config';

// Components
import { setFooterLinksFn, FooterLink } from 'grafana-7.3.6/public/app/core/components/Footer/Footer';
import { Branding, BrandComponentProps } from 'grafana-7.3.6/public/app/core/components/Branding/Branding';

interface WhitelabelingSettings {
  links: FooterLink[];
  appTitle: string;
  loginSubtitle: string;
  loginTitle: string;
  loginLogo: string;
  loginBackground: string;
  loginBoxBackground: string;
  menuLogo: string;
}

export function initWhitelabeling() {
  const settings = (config as any).whitelabeling as WhitelabelingSettings;
  if (!settings) {
    return;
  }

  Branding.LoginTitle = 'Welcome to Grafana Enterprise';

  if (settings.links.length > 0) {
    setFooterLinksFn(() => {
      return settings.links.map(link => ({ ...link, target: '_blank' }));
    });
  }

  if (settings.appTitle) {
    Branding.AppTitle = settings.appTitle;
  }

  if (settings.loginLogo) {
    Branding.LoginLogo = (props: BrandComponentProps) => (
      <img
        className={cx(
          props.className,
          css`
            max-width: 250px;
          `
        )}
        src={settings.loginLogo}
      />
    );
    // Reset these to not break existing login screens
    Branding.LoginTitle = '';
    Branding.GetLoginSubTitle = () => '';
  }

  if (settings.loginTitle) {
    Branding.LoginTitle = settings.loginTitle;
  }

  if (settings.loginSubtitle) {
    Branding.GetLoginSubTitle = () => settings.loginSubtitle;
  }

  if (settings.menuLogo) {
    Branding.MenuLogo = (props: BrandComponentProps) => <img className={props.className} src={settings.menuLogo} />;
  }

  if (settings.loginBackground) {
    const background = css`
      background: ${settings.loginBackground};
      background-size: cover;
    `;

    Branding.LoginBackground = (props: BrandComponentProps) => (
      <div className={cx(background, props.className)}>{props.children}</div>
    );
  }

  if (settings.loginBoxBackground) {
    const background = css`
      background: ${settings.loginBoxBackground};
      background-size: cover;
    `;

    Branding.LoginBoxBackground = () => background;
  }
}
