import { Chip } from '@mui/material';
import POSTagger, { tagsColors } from './POSTagger';

function App() {
  return (
    <div className="container mx-auto my-6 py-6">
      <h1>Part of Speech Identifier</h1>
      <br />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <POSTagger/>
        </div>
        <div className="">
          {tagsColors.map(t =>
            <Chip
              key={'chip-' + t.code}
              className='m-1'
              size="medium"
              variant="filled"
              style={{backgroundColor: t.color}}
              label={t.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
