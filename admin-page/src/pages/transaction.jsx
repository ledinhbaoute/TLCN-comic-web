import { Helmet } from 'react-helmet-async';

import { TransactionView } from 'src/sections/transaction/view';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title> Transaction </title>
      </Helmet>

      <TransactionView/>
    </>
  );
}
