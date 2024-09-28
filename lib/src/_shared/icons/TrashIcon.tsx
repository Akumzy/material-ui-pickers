import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export const TrashIcon: React.FC<SvgIconProps> = props => {
  return (
    <SvgIcon width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <g>
        <path
          d="M13.1905 4.51319H2.8113C2.69901 4.50365 2.58774 4.54075 2.50361 4.61574C2.42088 4.69521 2.38256 4.81025 2.40105 4.92344L3.46768 14.2155C3.59277 15.2399 4.46634 16.0077 5.49838 16.0001H10.6675C11.7286 16.0152 12.6223 15.2107 12.7187 14.154L13.6007 4.88241C13.6062 4.78296 13.5689 4.6859 13.4982 4.61574C13.4141 4.54075 13.3028 4.50365 13.1905 4.51319ZM11.8982 14.1129C11.8338 14.7375 11.2949 15.2045 10.6675 15.1796H5.49842C4.88224 15.2046 4.3526 14.7467 4.28817 14.1334L3.26257 5.33368H12.7392L11.8982 14.1129Z"
          fill="currentColor"
        />
        <path
          d="M14.6876 1.84633H10.462V1.18991C10.4848 0.555912 9.98932 0.0235222 9.35532 0.000750383C9.33451 4.40957e-06 9.31367 -0.000191899 9.29286 0.000200718H6.70829C6.07398 -0.0115386 5.55031 0.493132 5.53857 1.12745C5.53817 1.14825 5.53837 1.1691 5.53912 1.18991V1.84629H1.31357C1.08699 1.84629 0.90332 2.02996 0.90332 2.25654C0.90332 2.48312 1.08699 2.66678 1.31357 2.66678H14.6876C14.9142 2.66678 15.0978 2.48312 15.0978 2.25654C15.0978 2.02996 14.9141 1.84633 14.6876 1.84633ZM9.64154 1.18991V1.84629H6.35957V1.18991C6.33644 1.01013 6.46346 0.845664 6.64324 0.822539C6.66479 0.819751 6.68658 0.819162 6.70825 0.820693H9.29282C9.47362 0.807894 9.63059 0.944054 9.64339 1.12489C9.64496 1.14657 9.64433 1.16836 9.64154 1.18991Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};