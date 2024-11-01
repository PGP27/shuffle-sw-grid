import { useMemo, useState } from 'react';

const App = () => {
  const initialArray = useMemo(
    () => [
      'red',
      'red',
      'red',
      'red',
      'red',
      'red',
      'red',
      'red',
      'blue',
      'blue',
      'blue',
      'blue',
      'blue',
      'blue',
      'blue',
      'blue',
      'neutral',
      'neutral',
      'neutral',
      'neutral',
      'neutral',
      'neutral',
      'neutral',
      'loss',
    ],
    [],
  );

  const [array, setArray] = useState(initialArray);
  const [starter, setStarter] = useState('');
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

  const shuffle = () => {
    setArray(initialArray);
    const randomStarter = Math.floor(Math.random() * 2);
    if (randomStarter) {
      setArray([...initialArray, 'blue'].sort(() => Math.random() - 0.5));
      setStarter('Blue team');
    } else {
      setArray([...initialArray, 'red'].sort(() => Math.random() - 0.5));
      setStarter('Red team');
    }
  };

  const shuffleClick = () => {
    if (array.length < 25) {
      shuffle();
    } else {
      setConfirmationIsOpen(true);
    }
  };

  const dontConfirm = () => {
    setConfirmationIsOpen(false);
  };

  const confirm = () => {
    shuffle();
    dontConfirm();
  };

  return (
    <div className='w-screen h-screen p-8 flex flex-col items-center justify-center gap-8'>
      {array.length === 25 && (
        <h1
          className={`text-2xl font-semibold ${
            starter === 'Blue team' ? 'text-blue-400' : 'text-red-400'
          }`}
        >
          {starter} start!
        </h1>
      )}
      <div className='grid grid-cols-5 gap-4 w-full h-[30rem] md:h-full'>
        {array.length === 25
          ? array.map((element, index) => {
              let style = '';
              if (element === 'red') style = 'bg-red-400';
              if (element === 'blue') style = 'bg-blue-400';
              if (element === 'neutral') style = 'bg-yellow-200';
              if (element === 'loss') style = 'bg-gray-500';
              return (
                <div className={`w-full h-full border border-black rounded ${style}`} key={index} />
              );
            })
          : [...array, ''].map((_, index) => {
              return <div className='w-full h-full border border-black rounded' key={index} />;
            })}
      </div>
      <button
        className='px-8 py-2 rounded bg-[#0B9F84] hover:bg-[#32AE98] text-white text-xl font-semibold transition'
        onClick={shuffleClick}
      >
        SHUFFLE
      </button>
      {confirmationIsOpen && (
        <div className='absolute w-screen h-screen flex items-center justify-center bg-[#000000AA]'>
          <div className='w-[50rem] h-40 flex flex-col justify-between bg-white rounded p-4'>
            <span className='text-black text-2xl'>Are you sure you want to shuffle again?</span>
            <div className='flex justify-between'>
              <button
                className='px-8 py-2 rounded bg-red-500 hover:bg-red-400 text-white text-xl font-semibold transition'
                onClick={confirm}
              >
                Yes
              </button>
              <button
                className='px-8 py-2 rounded hover:bg-gray-200 text-xl font-semibold transition'
                onClick={dontConfirm}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { App };
