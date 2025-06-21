import { useTranslation } from 'react-i18next';
import POSTagger from '../POSTagger';
import DonationPopup from '../DonationPopup'

function Home() {
  const { t } = useTranslation()
  return (
    <div className="container mx-auto my-6 py-6 px-1">
      <h1 className='text-lg'>{t('title')}</h1>
      <br />
      <POSTagger/>
      <DonationPopup/>
    </div>
  );
}

export default Home;
