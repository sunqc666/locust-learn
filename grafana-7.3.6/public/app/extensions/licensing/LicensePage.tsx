import React, { FormEvent, PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { NavModel } from '@grafana/data';
import { Alert, Button } from '@grafana/ui';
import { StoreState } from 'app/types';
import { updateLocation } from 'grafana-7.3.6/public/app/core/reducers/location';
import { getNavModel } from 'grafana-7.3.6/public/app/core/selectors/navModel';
import { getLocationQuery } from 'grafana-7.3.6/public/app/core/selectors/location';
import {
  getLicenseToken,
  postLicenseToken,
  renewLicenseToken,
  refreshLicenseStats,
  ActiveUserStats,
  LicenseToken,
  VALID,
  EXPIRED,
} from './state/api';
import Page from 'grafana-7.3.6/public/app/core/components/Page/Page';
import { UpgradeInfo } from 'grafana-7.3.6/public/app/features/admin/UpgradePage';
import { LicenseChrome } from 'grafana-7.3.6/public/app/features/admin/LicenseChrome';
import { initLicenseWarnings, renderLicenseWarning } from './index';
import { LicenseTokenUpload } from './LicenseTokenUpload';

interface OwnProps {
  navModel: NavModel;
  getLicenseToken: typeof getLicenseToken;
  postLicenseToken: typeof postLicenseToken;
  renewLicenseToken: typeof renewLicenseToken;
  refreshLicenseStats: typeof refreshLicenseStats;
  tokenUpdated?: boolean;
  tokenRenewed?: boolean;
}

interface DispatchProps {
  updateLocation: typeof updateLocation;
}

export type Props = OwnProps & DispatchProps;

interface State {
  token: LicenseToken | null;
  stats: ActiveUserStats | null;
  isLoading: boolean;
  isUploading: boolean;
  isRenewing: boolean;
}

export class LicensePage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: null,
      stats: null,
      isLoading: true,
      isUploading: false,
      isRenewing: false,
    };
  }

  async componentDidMount() {
    renderLicenseWarning();
    const token = await this.props.getLicenseToken().catch(err => null);
    const stats = await this.props.refreshLicenseStats().catch(err => null);
    this.setState({ token, stats, isLoading: false });
  }

  async componentWillUnmount() {
    initLicenseWarnings();
  }

  onFileUpload = (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget?.files?.[0];
    const { updateLocation } = this.props;

    if (file) {
      updateLocation({ query: { tokenUpdated: null, tokenRenewed: null }, partial: true });
      const reader = new FileReader();
      const readerOnLoad = () => {
        return async (e: any) => {
          this.setState({ isUploading: true });
          try {
            await this.props.postLicenseToken(e.target.result);
            updateLocation({ query: { tokenUpdated: true }, partial: true });
            setTimeout(() => {
              // reload from server to pick up the new token
              location.reload();
            }, 1000);
          } catch (error) {
            this.setState({ isUploading: false });
            throw error;
          }
        };
      };
      reader.onload = readerOnLoad();
      reader.readAsText(file);
    }
  };

  onRenewClick = async () => {
    const { updateLocation } = this.props;

    updateLocation({ query: { tokenUpdated: null, tokenRenewed: null }, partial: true });
    this.setState({ isRenewing: true });
    try {
      await this.props.renewLicenseToken();
      updateLocation({ query: { tokenRenewed: true }, partial: true });
      setTimeout(() => {
        // reload from server to pick up the new token
        location.reload();
      }, 1000);
    } catch (error) {
      this.setState({ isRenewing: false });
      throw error;
    }
  };

  render() {
    const { navModel, tokenUpdated, tokenRenewed, updateLocation } = this.props;
    const { token, stats, isLoading, isUploading, isRenewing } = this.state;

    let editionNotice = 'You are running Grafana Enterprise without a license. The enterprise features are disabled.';
    if (token && ![VALID, EXPIRED].includes(token.status)) {
      editionNotice = 'There is a problem with your Enterprise license token. The enterprise features are disabled.';
    }

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          {token && [VALID, EXPIRED].includes(token.status) ? (
            <LicenseChrome header={'Enterprise license details'} subheader={token.company}>
              {tokenUpdated && (
                <Alert
                  title="License token uploaded. Restart Grafana for the changes to take effect."
                  severity="success"
                  onRemove={() => updateLocation({ query: { tokenUpdated: null }, partial: true })}
                />
              )}
              {tokenRenewed && (
                <Alert
                  title="License token renewed."
                  severity="success"
                  onRemove={() => updateLocation({ query: { tokenRenewed: null }, partial: true })}
                />
              )}
              <LicenceInfo token={token} stats={stats} onRenewClick={this.onRenewClick} isRenewing={isRenewing} />
              <div>
                <LicenseTokenUpload title="Update License" onFileUpload={this.onFileUpload} isUploading={isUploading} />
              </div>
            </LicenseChrome>
          ) : (
            <>
              <UpgradeInfo editionNotice={editionNotice} />
              <div style={{ marginLeft: '79px' }}>
                <LicenseTokenUpload
                  title="Have a License?"
                  onFileUpload={this.onFileUpload}
                  isUploading={isUploading}
                />
              </div>
            </>
          )}
        </Page.Contents>
      </Page>
    );
  }
}

interface LicenseInfoProps {
  token: LicenseToken;
  stats: ActiveUserStats | null;
  onRenewClick(): void;
  isRenewing: boolean;
}

const LicenceInfo: React.FC<LicenseInfoProps> = ({ token, stats, onRenewClick, isRenewing }) => {
  return (
    <table className="filter-table form-inline">
      <tbody>
        <tr>
          <td style={{ width: '30%' }}>License ID</td>
          <td style={{ width: '70%' }}>
            {token.lid} (
            <a
              href={`${token.iss}/licenses/${token.lid}`}
              target="_blank"
              rel="noopener noreferer"
              aria-label="View details about your license in Grafana Cloud"
            >
              View Details
            </a>
            )
          </td>
        </tr>
        <tr>
          <td>Licensed URL</td>
          <td>
            <a href={token.sub} target="_blank" rel="noopener noreferer">
              {token.sub}
            </a>
          </td>
        </tr>
        <tr>
          <td>Company</td>
          <td>{token.company}</td>
        </tr>
        <tr>
          <td>Products</td>
          <td>{token.prod}</td>
        </tr>
        <tr>
          <td>Included Editors & Admins</td>
          <td>
            {stats ? 'Using ' + stats.active_admins_and_editors + ' of ' : ''}
            {token.included_admins > 0 ? token.included_admins : 'Unlimited'}
          </td>
        </tr>
        <tr>
          <td>Included Viewers</td>
          <td>
            {stats ? 'Using ' + stats.active_viewers + ' of ' : ''}
            {token.included_viewers > 0 ? token.included_viewers : 'Unlimited'}
          </td>
        </tr>
        <tr>
          <td>License Issued</td>
          <td>{new Date(token.nbf * 1000).toLocaleString()}</td>
        </tr>
        <tr>
          <td>License Expires</td>
          <td>{new Date(token.lexp * 1000).toLocaleString()}</td>
        </tr>
        <tr>
          <td colSpan={2} className="admin-settings-section">
            Token Details
          </td>
        </tr>
        <tr>
          <td>Token ID</td>
          <td>
            {token.jti} (
            {token.status === VALID ? (
              isRenewing ? (
                <span>Renewing...</span>
              ) : (
                <Button variant="link" onClick={onRenewClick} style={{ padding: 0 }}>
                  Renew Token
                </Button>
              )
            ) : (
              <span>EXPIRED</span>
            )}
            )
          </td>
        </tr>
        <tr>
          <td>Token Issued</td>
          <td>{new Date(token.iat * 1000).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Token Expires</td>
          <td>{new Date(token.exp * 1000).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'licensing'),
  getLicenseToken,
  postLicenseToken,
  renewLicenseToken,
  refreshLicenseStats,
  tokenUpdated: getLocationQuery(state.location).tokenUpdated,
  tokenRenewed: getLocationQuery(state.location).tokenRenewed,
});

const mapDispatchToProps = {
  updateLocation,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(LicensePage));
