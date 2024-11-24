import { useTranslation } from 'react-i18next';
import POSTagger from './POSTagger';

function App() {
  const { t } = useTranslation()
  return (
    <div className="container mx-auto my-6 py-6">
      <h1>{t('title')}</h1>
      <br />
      <POSTagger/>
    </div>
  );
}

export default App;
