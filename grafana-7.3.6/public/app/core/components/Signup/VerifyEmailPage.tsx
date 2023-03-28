import React, { FC } from 'react';

import { LoginLayout, InnerBox } from '../Login/LoginLayout';
import { VerifyEmail } from './VerifyEmail';
import { getConfig } from 'grafana-7.3.6/public/app/core/config';

export const VerifyEmailPage: FC = () => {
  if (!getConfig().verifyEmailEnabled) {
    window.location.href = getConfig().appSubUrl + '/signup';
    return <></>;
  }

  return (
    <LoginLayout>
      <InnerBox>
        <VerifyEmail />
      </InnerBox>
    </LoginLayout>
  );
};

export default VerifyEmailPage;
