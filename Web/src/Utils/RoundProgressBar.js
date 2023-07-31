import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Label } from 'semantic-ui-react';

const RoundProgressBar = ({ title,percentage }) => {
  return (
    <div className='w-full flex justify-center items-center h-full flex-col'>
      <div className='w-full m-4'>
      <Label color='blue' ribbon>{title}</Label>
      </div>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        styles={{
          path: {
            stroke: `rgba(62, 152, 199, ${percentage / 100})`,
          },
          trail: {
            stroke: '#d6d6d6',
          },
          text: {
            fill: 'text-blue-700',
            fontSize: '16px',
          },
        }}
      />
    </div>
  );
};

export default RoundProgressBar;