export const staffTypes = Object.freeze({
  RT: 'RT',
  RNT: 'RNT',
  TF: 'TF',
  NT: 'NT',
  RS30: 'RS30',
  RS20: 'RS20',
  RSO: 'RSO',
  OTH: 'OTH'
});

const labels = {
  RT: 'ADMIN',
  RNT: 'secretaire',
  TF: 'employé',
};

export const staffTypeSelectOptions = Object.keys(staffTypes).map(
  (key, index) => {
    return {
      label: `${staffTypes[key]} - ${labels[key]}`,
      value: staffTypes[key]
    };
  }
);
