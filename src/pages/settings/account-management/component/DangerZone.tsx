/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @copyright Copyright (c) 2021. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Card, ClickableElement } from '@invoiceninja/cards';
import { Button, InputField } from '@invoiceninja/forms';
import axios from 'axios';
import { endpoint } from 'common/helpers';
import { useCurrentCompany } from 'common/hooks/useCurrentCompany';
import { defaultHeaders } from 'common/queries/common/headers';
import { Modal } from 'components/Modal';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

export function DangerZone() {
  const [t] = useTranslation();

  const company = useCurrentCompany();

  const [password, setPassword] = useState('');

  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [purgeInputField, setPurgeInputField] = useState('');

  const purge = () => {
    const toastId = toast.loading(t('processing'));

    axios
      .post(
        endpoint('/api/v1/companies/purge_save_settings/:id', {
          id: company.id,
        }),
        {},
        { headers: { 'X-Api-Password': password, ...defaultHeaders } }
      )
      .then(() => toast.success(t('purge_successful'), { id: toastId }))
      .catch((error) => {
        console.error(error);

        toast.error(t('error_title'), { id: toastId });
      })
      .finally(() => setIsPurgeModalOpen(false));
  };

  return (
    <>
      <Modal
        title={t('purge_data')}
        text={t('purge_data_message')}
        visible={isPurgeModalOpen}
        onClose={setIsPurgeModalOpen}
      >
        <InputField
          label={generatePath(t('please_type_to_confirm'), {
            value: 'purge',
          })}
          id="purge_data"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPurgeInputField(event.target.value)
          }
        />

        <InputField
          type="password"
          label={t('password')}
          id="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />

        {purgeInputField === 'purge' && (
          <Button onClick={purge}>{t('continue')}</Button>
        )}
      </Modal>

      <Card title="Danger zone">
        <ClickableElement
          onClick={() => setIsPurgeModalOpen(true)}
          className="text-red-500 hover:text-red-600"
        >
          {t('purge_data')}
        </ClickableElement>

        <ClickableElement className="text-red-500 hover:text-red-600">
          {t('cancel_account')}
        </ClickableElement>
      </Card>
    </>
  );
}