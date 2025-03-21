import { Helmet } from 'react-helmet-async';
import { i18n } from 'src/i18n';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>{i18n.t('coding').toString()}</title>
      </Helmet>
    </>
  );
}

export default HomePage;
