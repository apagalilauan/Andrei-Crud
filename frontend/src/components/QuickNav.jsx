import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const QuickNav = () => {
  const [activeButton, setActiveButton] = useState('Recommended');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className=' my-5 flex gap-2'>
      <Button
        onClick={() => handleButtonClick('Recommended')}
        variant={activeButton === 'Recommended' ? 'contained' : 'outlined'}
        sx={{
          textTransform:'capitalize'
        }}
      >
        Recommended
      </Button>
      <Button
        onClick={() => handleButtonClick('Sale')}
        variant={activeButton === 'Sale' ? 'contained' : 'outlined'}
        sx={{
          textTransform:'capitalize'
        }}
      >
        Sale
      </Button>
      <Button
        onClick={() => handleButtonClick('Top Seller')}
        variant={activeButton === 'Top Seller' ? 'contained' : 'outlined'}
        sx={{
          textTransform:'capitalize'
        }}
      >
        Top Seller
      </Button>
      <Button
        onClick={() => handleButtonClick('Last Chance')}
        variant={activeButton === 'Last Chance' ? 'contained' : 'outlined'}
        sx={{
          textTransform:'capitalize'
        }}
      >
        Last Chance
      </Button>
    </div>
  );
};

export default QuickNav;
