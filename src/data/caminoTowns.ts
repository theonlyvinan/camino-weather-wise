export interface CaminoTown {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  coordinates: { lat: number; lng: number };
}

export const caminoTowns: CaminoTown[] = [
  {
    id: '1',
    name: 'Saint-Jean-Pied-de-Port',
    distance: 0,
    elevation: 169,
    coordinates: { lat: 43.1633, lng: -1.2364 }
  },
  {
    id: '1a',
    name: 'Honto',
    distance: 8,
    elevation: 180,
    coordinates: { lat: 43.1456, lng: -1.2789 }
  },
  {
    id: '1b',
    name: 'Orisson',
    distance: 15,
    elevation: 790,
    coordinates: { lat: 43.0812, lng: -1.3054 }
  },
  {
    id: '1c',
    name: 'Borda',
    distance: 20,
    elevation: 850,
    coordinates: { lat: 43.0234, lng: -1.3187 }
  },
  {
    id: '2',
    name: 'Roncesvalles',
    distance: 25,
    elevation: 952,
    coordinates: { lat: 43.0089, lng: -1.3195 }
  },
  {
    id: '2a',
    name: 'Burguete',
    distance: 28,
    elevation: 884,
    coordinates: { lat: 43.0167, lng: -1.3333 }
  },
  {
    id: '2b',
    name: 'Espinal',
    distance: 31,
    elevation: 870,
    coordinates: { lat: 43.0234, lng: -1.3456 }
  },
  {
    id: '2c',
    name: 'Viskarret',
    distance: 45,
    elevation: 773,
    coordinates: { lat: 42.9876, lng: -1.4567 }
  },
  {
    id: '2d',
    name: 'Linzoain',
    distance: 52,
    elevation: 650,
    coordinates: { lat: 42.9234, lng: -1.5123 }
  },
  {
    id: '2e',
    name: 'Zubiri',
    distance: 58,
    elevation: 520,
    coordinates: { lat: 42.8876, lng: -1.5678 }
  },
  {
    id: '2f',
    name: 'Ilarratz',
    distance: 62,
    elevation: 480,
    coordinates: { lat: 42.8654, lng: -1.5889 }
  },
  {
    id: '3',
    name: 'Pamplona',
    distance: 67,
    elevation: 449,
    coordinates: { lat: 42.8125, lng: -1.6458 }
  },
  {
    id: '3a',
    name: 'Cizur Menor',
    distance: 72,
    elevation: 471,
    coordinates: { lat: 42.7892, lng: -1.6891 }
  },
  {
    id: '3b',
    name: 'Zariquiegui',
    distance: 78,
    elevation: 710,
    coordinates: { lat: 42.7456, lng: -1.7234 }
  },
  {
    id: '3c',
    name: 'Uterga',
    distance: 83,
    elevation: 510,
    coordinates: { lat: 42.7123, lng: -1.7567 }
  },
  {
    id: '4',
    name: 'Puente la Reina',
    distance: 92,
    elevation: 346,
    coordinates: { lat: 42.6667, lng: -1.8167 }
  },
  {
    id: '5',
    name: 'Estella',
    distance: 112,
    elevation: 421,
    coordinates: { lat: 42.6711, lng: -2.0281 }
  },
  {
    id: '6',
    name: 'Los Arcos',
    distance: 134,
    elevation: 444,
    coordinates: { lat: 42.5678, lng: -2.1858 }
  },
  {
    id: '7',
    name: 'Logroño',
    distance: 156,
    elevation: 384,
    coordinates: { lat: 42.4627, lng: -2.4449 }
  },
  {
    id: '8',
    name: 'Nájera',
    distance: 185,
    elevation: 496,
    coordinates: { lat: 42.4167, lng: -2.7333 }
  },
  {
    id: '9',
    name: 'Santo Domingo de la Calzada',
    distance: 205,
    elevation: 639,
    coordinates: { lat: 42.4394, lng: -2.9522 }
  },
  {
    id: '10',
    name: 'Belorado',
    distance: 230,
    elevation: 770,
    coordinates: { lat: 42.4264, lng: -3.1875 }
  },
  {
    id: '11',
    name: 'San Juan de Ortega',
    distance: 253,
    elevation: 1020,
    coordinates: { lat: 42.3833, lng: -3.4167 }
  },
  {
    id: '12',
    name: 'Burgos',
    distance: 274,
    elevation: 856,
    coordinates: { lat: 42.3439, lng: -3.6968 }
  },
  {
    id: '13',
    name: 'Castrojeriz',
    distance: 318,
    elevation: 808,
    coordinates: { lat: 42.2844, lng: -4.1375 }
  },
  {
    id: '14',
    name: 'Frómista',
    distance: 343,
    elevation: 780,
    coordinates: { lat: 42.2639, lng: -4.4056 }
  },
  {
    id: '15',
    name: 'Carrión de los Condes',
    distance: 360,
    elevation: 840,
    coordinates: { lat: 42.3372, lng: -4.6031 }
  },
  {
    id: '16',
    name: 'Sahagún',
    distance: 394,
    elevation: 823,
    coordinates: { lat: 42.3717, lng: -4.9406 }
  },
  {
    id: '17',
    name: 'León',
    distance: 447,
    elevation: 822,
    coordinates: { lat: 42.5987, lng: -5.5671 }
  },
  {
    id: '18',
    name: 'Astorga',
    distance: 494,
    elevation: 869,
    coordinates: { lat: 42.4569, lng: -6.0644 }
  },
  {
    id: '19',
    name: 'Ponferrada',
    distance: 544,
    elevation: 534,
    coordinates: { lat: 42.5500, lng: -6.5833 }
  },
  {
    id: '20',
    name: 'Sarria',
    distance: 663,
    elevation: 454,
    coordinates: { lat: 42.7833, lng: -7.4167 }
  },
  {
    id: '21',
    name: 'Santiago de Compostela',
    distance: 775,
    elevation: 260,
    coordinates: { lat: 42.8805, lng: -8.5456 }
  }
];
