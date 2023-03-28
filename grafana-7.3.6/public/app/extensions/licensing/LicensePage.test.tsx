import React from 'react';
import { render, screen } from '@testing-library/react';
import { LicensePage, Props } from './LicensePage';
import { NavModel } from '@grafana/data';
import * as index from './index';
import { mockToolkitActionCreator } from '../../../test/core/redux/mocks';
import { updateLocation } from '../../core/actions';

const validToken = {
  status: 1,
  jti: '805',
  iss: 'https://test.com',
  sub: 'https://test.com',
  iat: 1578576782,
  exp: 1610976490,
  nbf: 1578576526,
  lexp: 1610976490,
  lid: 10500,
  max_users: -1,
  included_admins: -1,
  included_viewers: -1,
  lic_exp_warn_days: 0,
  prod: ['grafana-enterprise'],
  company: 'Test',
  slug: '',
};

const expiredToken = {
  status: 5,
  jti: '14',
  iss: 'https://test.com',
  sub: 'https://test.com',
  iat: 1539191907,
  exp: 1577854800,
  nbf: 1539191759,
  lexp: 1577854800,
  lid: 5,
  max_users: -1,
  included_admins: -1,
  included_viewers: -1,
  lic_exp_warn_days: 0,
  prod: ['grafana-enterprise'],
  company: 'Test',
  slug: '',
};

const activeUserStats = {
  active_admins_and_editors: 1,
  active_viewers: 2,
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    navModel: { node: {}, main: {} } as NavModel,

    getLicenseToken: async () => validToken,
    postLicenseToken: async () => validToken,
    renewLicenseToken: async () => validToken,
    refreshLicenseStats: async () => activeUserStats,
    updateLocation: mockToolkitActionCreator(updateLocation),
    tokenUpdated: false,
    tokenRenewed: false,
  };

  Object.assign(props, propOverrides);

  render(<LicensePage {...props} />);
};

beforeEach(() => {
  jest.spyOn(index, 'initLicenseWarnings').mockImplementation(() => {});
  jest.spyOn(index, 'renderLicenseWarning').mockImplementation(() => {});
});

describe('LicensePage', () => {
  it('should show license warning for invalid license', async () => {
    setup({ getLicenseToken: async () => ({ ...expiredToken, status: 3 }) });

    expect(
      await screen.findByText(
        'There is a problem with your Enterprise license token. The enterprise features are disabled.'
      )
    ).toBeInTheDocument();
  });

  it('should show license info for valid license', async () => {
    setup({ getLicenseToken: async () => validToken });

    expect(await screen.findByText('Enterprise license details')).toBeInTheDocument();
  });
});
