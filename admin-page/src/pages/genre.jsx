import { Helmet } from 'react-helmet-async';

import { GenreView } from 'src/sections/genre/view';

// ----------------------------------------------------------------------

export default function GenrePage() {
  return (
    <>
      <Helmet>
        <title> Genre Manager </title>
      </Helmet>

      <GenreView />
    </>
  );
}
