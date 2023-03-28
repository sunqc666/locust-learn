import React, { FC } from 'react';
import { css } from 'emotion';
import { config } from 'grafana-7.3.6/public/app/core/config';
import { stylesFactory, Alert } from '@grafana/ui';

export const getStyles = stylesFactory(() => {
  const { theme } = config;

  return {
    container: css`
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
      box-shadow: 0 0 20px ${theme.colors.dropdownShadow};
    `,
  };
});

interface WarningProps {
  title: string;
  subTitle: JSX.Element;
  severity: 'info' | 'error';
  onButtonClick?: () => void;
  buttonText?: string;
}

const Warning: FC<WarningProps> = ({ title, subTitle, severity, onButtonClick, buttonText }) => {
  const styles = getStyles();

  return (
    <div className={styles.container}>
      <div className="page-container">
        <Alert title={title} buttonText={buttonText} onButtonClick={onButtonClick} severity={severity}>
          {subTitle}
        </Alert>
      </div>
    </div>
  );
};

interface LicensingLinkProps {
  isGrafanaAdmin: boolean;
}

export const LicensingLink: FC<LicensingLinkProps> = ({ isGrafanaAdmin, children }) => {
  if (isGrafanaAdmin) {
    return <a href="/admin/licensing">{children}</a>;
  }

  return (
    <a href="https://grafana.com/docs/grafana/latest/enterprise/license-expiration/" target="_blank">
      {children}
    </a>
  );
};

interface HasExpiredProps {
  isGrafanaAdmin: boolean;
}

export const HasExpired: FC<HasExpiredProps> = ({ isGrafanaAdmin }) => {
  return (
    <Warning
      title="Your Grafana Enterprise license has expired"
      subTitle={
        <>
          <LicensingLink isGrafanaAdmin={isGrafanaAdmin}>Some features</LicensingLink> have been disabled.
        </>
      }
      severity="error"
    />
  );
};

interface IsInvalidProps {
  isGrafanaAdmin: boolean;
}

export const IsInvalid: FC<IsInvalidProps> = ({ isGrafanaAdmin }) => {
  return (
    <Warning
      title="Your Grafana Enterprise license is invalid"
      subTitle={
        <>
          <LicensingLink isGrafanaAdmin={isGrafanaAdmin}>Some features</LicensingLink> have been disabled.
        </>
      }
      severity="error"
    />
  );
};

interface ExpiresSoonProps {
  days: number;
  onCloseWarning?(): void;
  isGrafanaAdmin: boolean;
}

export const ExpiresSoon: FC<ExpiresSoonProps> = ({ days, onCloseWarning, isGrafanaAdmin }) => {
  return (
    <Warning
      onButtonClick={onCloseWarning}
      title="Your Grafana Enterprise license will expire soon"
      subTitle={
        <>
          {days} days remaining, after which{' '}
          <LicensingLink isGrafanaAdmin={isGrafanaAdmin}>Enterprise features will be disabled.</LicensingLink>
        </>
      }
      severity="info"
      buttonText="Dismiss"
    />
  );
};

interface TokenExpiresSoonProps {
  days: number;
  onCloseWarning?(): void;
  isGrafanaAdmin: boolean;
}

export const TokenExpiresSoon: FC<TokenExpiresSoonProps> = ({ days, onCloseWarning, isGrafanaAdmin }) => {
  return (
    <Warning
      onButtonClick={onCloseWarning}
      title="Your Grafana Enterprise token needs to be renewed"
      subTitle={
        <>
          Your license token has {days} days remaining, after which{' '}
          <LicensingLink isGrafanaAdmin={isGrafanaAdmin}>Enterprise features will be disabled.</LicensingLink>
        </>
      }
      severity="info"
      buttonText="Dismiss"
    />
  );
};

interface MaxUsersReachedProps {
  activeUsers: number;
  maxUsers: number;
  type: string;
  onRefreshWarning?: () => void;
  slug?: string;
}

export const MaxUsersReached: FC<MaxUsersReachedProps> = ({ activeUsers, maxUsers, type, slug, onRefreshWarning }) => {
  return (
    <Warning
      onButtonClick={onRefreshWarning}
      title={'You have reached the number of maximum active ' + type}
      subTitle={
        <>
          Your license enables {maxUsers} active {type} on this Grafana Enterprise instance but you have {activeUsers}.
          Please,{' '}
          {slug ? (
            <a href={'https://grafana.com/orgs/' + slug + '/licenses'} target="_blank">
              upgrade your license.
            </a>
          ) : (
            'upgrade your license.'
          )}
        </>
      }
      severity="error"
      buttonText="Refresh"
    />
  );
};
