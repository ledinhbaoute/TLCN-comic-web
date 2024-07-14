import { Helmet } from 'react-helmet-async';

import { PriceView } from 'src/sections/price/view';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <Helmet>
        <title> Price </title>
      </Helmet>

      <PriceView />
    </>
  );
}
