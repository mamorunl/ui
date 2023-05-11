/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { isDemo, isSelfHosted } from '$app/common/helpers';
import { useAdmin } from '$app/common/hooks/permissions/useHasPermission';
import { useCurrentUser } from '$app/common/hooks/useCurrentUser';
import { useTitle } from '$app/common/hooks/useTitle';
import { Button } from '$app/components/forms';
import { Icon } from '$app/components/icons/Icon';
import { Inline } from '$app/components/Inline';
import { SwitchToFlutter } from '$app/components/SwitchToFlutter';
import { Activity } from '$app/pages/dashboard/components/Activity';
import { PastDueInvoices } from '$app/pages/dashboard/components/PastDueInvoices';
import { RecentPayments } from '$app/pages/dashboard/components/RecentPayments';
import { Totals } from '$app/pages/dashboard/components/Totals';
import { UpcomingInvoices } from '$app/pages/dashboard/components/UpcomingInvoices';
import { useTranslation } from 'react-i18next';
import { BiPlus } from 'react-icons/bi';
import { BsQuestionCircle } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { Default } from '../../components/layouts/Default';
import { ExpiredQuotes } from './components/ExpiredQuotes';
import { UpcomingQuotes } from './components/UpcomingQuotes';

export default function Dashboard() {
  useTitle('dashboard');
  const [t] = useTranslation();

  const user = useCurrentUser();

  const { isAdmin } = useAdmin();

  return (
    <Default
      childrenClassName="p-4 md:p-8 md:pr-20"
      title={t('dashboard')}
      navigationTopRight={
        <Inline className="space-x-6">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-1 cursor-pointer">
            <Icon element={MdOutlineNotifications} size={27} />
          </div>

          <Button className="flex space-x-2">
            {<Icon element={BiPlus} color="white" size={22} />}{' '}
            <span>{t('add')}</span>
          </Button>

          {isSelfHosted() &&
            !isDemo() &&
            (user?.company_user?.is_admin || user?.company_user?.is_owner) && (
              <SwitchToFlutter />
            )}
        </Inline>
      }
      withoutBackButton
      withoutBodyPadding
    >
      {isAdmin && <Totals />}

      <div className="grid grid-cols-12 gap-4 my-6">
        <div className="col-span-12 xl:col-span-6">
          <Activity />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <RecentPayments />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <UpcomingInvoices />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <PastDueInvoices />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <ExpiredQuotes />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <UpcomingQuotes />
        </div>
      </div>

      <div className="fixed bottom-28 right-4 bg-gray-200 dark:bg-gray-900 rounded-3xl p-3 cursor-pointer">
        <Icon element={BsQuestionCircle} size={27} />
      </div>
    </Default>
  );
}
