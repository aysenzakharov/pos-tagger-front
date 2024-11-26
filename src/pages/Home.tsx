import { useTranslation } from 'react-i18next';
import POSTagger from '../POSTagger';

function Home() {
  const { t } = useTranslation()
  return (
    <div className="container mx-auto my-6 py-6 px-1">
      <h1>{t('title')}</h1>
      <br />
      <POSTagger/>
    </div>
  );
}

export default Home;
