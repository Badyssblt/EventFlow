import React from 'react';

const DateFormatter = ({ dateIso }) => {

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dateObj = new Date(dateIso);


  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()]; 
  const year = dateObj.getFullYear();

  const dateFr = `${day} ${month} ${year}`;

  return (
    <div>
      <h3 className='text-nowrap'>{dateFr}</h3>
    </div>
  );
};

export default DateFormatter;
