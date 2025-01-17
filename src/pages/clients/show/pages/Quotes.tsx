/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { route } from '$app/common/helpers/route';
import { DataTable } from '$app/components/DataTable';
import { useParams } from 'react-router-dom';
import { dataTableStaleTime } from './Invoices';
import { useQuoteColumns } from '$app/pages/quotes/common/hooks';

export default function Quotes() {
  const { id } = useParams();

  const columns = useQuoteColumns();

  return (
    <DataTable
      resource="quote"
      endpoint={route('/api/v1/quotes?client_id=:id&sort=id|desc', { id })}
      columns={columns}
      withResourcefulActions
      bulkRoute="/api/v1/quotes/bulk"
      linkToCreate={route('/quotes/create?client=:id', { id: id })}
      staleTime={dataTableStaleTime}
    />
  );
}
