import React, { ChangeEvent, FC, useState } from 'react';
import { GrafanaTheme } from '@grafana/data';
import { Button, Checkbox, Field, HorizontalGroup, Input, Modal, stylesFactory, useTheme } from '@grafana/ui';
import { css } from 'emotion';

import { validateMultipleEmails } from '../utils/validators';

interface Props {
  emails: string;
  onDismiss: () => void;
  onSendTestEmail: (email: string, useEmailsFromReport: boolean) => Promise<any>;
}

export const SendTestEmailModal: FC<Props> = ({ onDismiss, onSendTestEmail, emails }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [useEmailsFromReport, setUseEmailsFromReport] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const handleUseEmailsFromReportChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setUseEmailsFromReport(checked);
    if (checked) {
      setEmail(emails);
      doValidation(emails);
    } else {
      clearError();
      setEmail('');
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setEmailIsInvalid(false);
  };

  const doValidation = (e: string): boolean => {
    if (!validateMultipleEmails(e)) {
      setEmailIsInvalid(true);
      setEmailErrorMessage('Invalid email');
      return false;
    } else {
      clearError();
      return true;
    }
  };

  const clearError = () => {
    setEmailIsInvalid(false);
    setEmailErrorMessage('');
  };

  const sendMail = () => {
    doValidation(email);
    if (!doValidation(email)) {
      return;
    }
    setEmailSending(true);
    onSendTestEmail(email, useEmailsFromReport).finally(() => {
      setEmailSending(false);
      onDismiss();
    });
  };

  return (
    <Modal className={styles.modal} isOpen={true} title="Send test email" icon="share-alt" onDismiss={onDismiss}>
      <>
        <div className={styles.content}>
          <Field label="Email" disabled={useEmailsFromReport} invalid={emailIsInvalid} error={emailErrorMessage}>
            <Input
              disabled={useEmailsFromReport}
              name="email"
              placeholder="your.address@company.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Field>
          <Checkbox
            value={useEmailsFromReport}
            label="Use emails from report"
            onChange={handleUseEmailsFromReportChange}
          />
        </div>

        <HorizontalGroup justify="center">
          <Button variant="primary" onClick={sendMail} disabled={emailSending}>
            {emailSending ? 'Sending...' : 'Send'}
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            Cancel
          </Button>
        </HorizontalGroup>
      </>
    </Modal>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    modal: css`
      width: 500px;
    `,
    content: css`
      margin-bottom: ${theme.spacing.lg};
    `,
  };
});
