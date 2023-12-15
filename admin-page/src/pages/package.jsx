import { Helmet } from 'react-helmet-async';

import { PackageView } from 'src/sections/package-premium/view';

// ----------------------------------------------------------------------

export default function PackagePage() {
  return (
    <>
      <Helmet>
        <title> Package Premium Manager </title>
      </Helmet>
      <PackageView/>
    </>
  );
}
