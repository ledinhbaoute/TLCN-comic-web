import { Helmet } from 'react-helmet-async';

import { TransactionView } from 'src/sections/transaction/view';

// ----------------------------------------------------------------------

export default function TransactionPage() {
  return (
    <>
      <Helmet>
        <title> Transaction </title>
      </Helmet>

      <TransactionView/>
    </>
  );
}
