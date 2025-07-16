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
    name: 'St‑Jean‑Pied‑de‑Port',
    distance: 0,
    elevation: 169,
    coordinates: { lat: 43.1630, lng: -1.2377 }
  },
  {
    id: '2',
    name: 'Roncesvalles',
    distance: 25,
    elevation: 952,
    coordinates: { lat: 42.9656, lng: -1.3336 }
  },
  {
    id: '3',
    name: 'Zubiri',
    distance: 58,
    elevation: 520,
    coordinates: { lat: 42.8398, lng: -1.3606 }
  },
  {
    id: '4',
    name: 'Pamplona (Iruña)',
    distance: 67,
    elevation: 449,
    coordinates: { lat: 42.8169, lng: -1.6432 }
  },
  {
    id: '5',
    name: 'Puente la Reina',
    distance: 92,
    elevation: 346,
    coordinates: { lat: 42.6985, lng: -1.6437 }
  },
  {
    id: '6',
    name: 'Estella‑Lizarra',
    distance: 112,
    elevation: 421,
    coordinates: { lat: 42.6544, lng: -2.1693 }
  },
  {
    id: '7',
    name: 'Los Arcos',
    distance: 134,
    elevation: 444,
    coordinates: { lat: 42.5307, lng: -2.1140 }
  },
  {
    id: '8',
    name: 'Logroño',
    distance: 156,
    elevation: 384,
    coordinates: { lat: 42.4668, lng: -2.4440 }
  },
  {
    id: '9',
    name: 'Nájera',
    distance: 185,
    elevation: 496,
    coordinates: { lat: 42.4721, lng: -2.6590 }
  },
  {
    id: '10',
    name: 'Santo Domingo de la Calzada',
    distance: 205,
    elevation: 639,
    coordinates: { lat: 42.3785, lng: -2.8639 }
  },
  {
    id: '11',
    name: 'Belorado',
    distance: 230,
    elevation: 770,
    coordinates: { lat: 42.5119, lng: -3.0146 }
  },
  {
    id: '12',
    name: 'San Juan de Ortega',
    distance: 253,
    elevation: 1020,
    coordinates: { lat: 42.4262, lng: -3.1432 }
  },
  {
    id: '13',
    name: 'Burgos',
    distance: 274,
    elevation: 856,
    coordinates: { lat: 42.3439, lng: -3.6969 }
  },
  {
    id: '14',
    name: 'Hornillos del Camino',
    distance: 298,
    elevation: 950,
    coordinates: { lat: 42.4753, lng: -3.5202 }
  },
  {
    id: '15',
    name: 'Castrojeriz',
    distance: 318,
    elevation: 808,
    coordinates: { lat: 42.3760, lng: -3.4912 }
  },
  {
    id: '16',
    name: 'Frómista',
    distance: 343,
    elevation: 780,
    coordinates: { lat: 42.3544, lng: -4.6520 }
  },
  {
    id: '17',
    name: 'Carrión de los Condes',
    distance: 360,
    elevation: 840,
    coordinates: { lat: 42.3161, lng: -4.4290 }
  },
  {
    id: '18',
    name: 'Sahagún',
    distance: 394,
    elevation: 823,
    coordinates: { lat: 42.4495, lng: -5.2277 }
  },
  {
    id: '19',
    name: 'León',
    distance: 447,
    elevation: 822,
    coordinates: { lat: 42.5987, lng: -5.5671 }
  },
  {
    id: '20',
    name: 'Mansilla de las Mulas',
    distance: 470,
    elevation: 780,
    coordinates: { lat: 42.5405, lng: -5.5503 }
  },
  {
    id: '21',
    name: 'Hospital de Órbigo',
    distance: 485,
    elevation: 820,
    coordinates: { lat: 42.4690, lng: -5.8960 }
  },
  {
    id: '22',
    name: 'Astorga',
    distance: 494,
    elevation: 869,
    coordinates: { lat: 42.4560, lng: -6.0950 }
  },
  {
    id: '23',
    name: 'Rabanal del Camino',
    distance: 515,
    elevation: 1150,
    coordinates: { lat: 42.5488, lng: -6.1863 }
  },
  {
    id: '24',
    name: 'Foncebadón',
    distance: 520,
    elevation: 1505,
    coordinates: { lat: 42.5472, lng: -6.2322 }
  },
  {
    id: '25',
    name: 'Molinaseca',
    distance: 535,
    elevation: 600,
    coordinates: { lat: 42.5530, lng: -6.6300 }
  },
  {
    id: '26',
    name: 'Ponferrada',
    distance: 544,
    elevation: 534,
    coordinates: { lat: 42.5452, lng: -6.5990 }
  },
  {
    id: '27',
    name: 'Villafranca del Bierzo',
    distance: 568,
    elevation: 511,
    coordinates: { lat: 42.5981, lng: -6.7739 }
  },
  {
    id: '28',
    name: 'O Cebreiro',
    distance: 590,
    elevation: 1330,
    coordinates: { lat: 42.7011, lng: -7.0028 }
  },
  {
    id: '29',
    name: 'Triacastela',
    distance: 610,
    elevation: 670,
    coordinates: { lat: 42.7975, lng: -7.5204 }
  },
  {
    id: '30',
    name: 'Sarria',
    distance: 663,
    elevation: 454,
    coordinates: { lat: 42.7800, lng: -7.4270 }
  },
  {
    id: '31',
    name: 'Portomarín',
    distance: 685,
    elevation: 350,
    coordinates: { lat: 42.7486, lng: -7.4750 }
  },
  {
    id: '32',
    name: 'Palas de Rei',
    distance: 707,
    elevation: 565,
    coordinates: { lat: 42.7830, lng: -7.4930 }
  },
  {
    id: '33',
    name: 'Melide',
    distance: 728,
    elevation: 454,
    coordinates: { lat: 42.8575, lng: -7.6100 }
  },
  {
    id: '34',
    name: 'Arzúa',
    distance: 740,
    elevation: 390,
    coordinates: { lat: 42.8650, lng: -7.6660 }
  },
  {
    id: '35',
    name: 'O Pedrouzo',
    distance: 760,
    elevation: 260,
    coordinates: { lat: 42.8900, lng: -8.4100 }
  },
  {
    id: '36',
    name: 'Monte do Gozo (Monte Xoán)',
    distance: 772,
    elevation: 370,
    coordinates: { lat: 42.8986, lng: -8.4471 }
  },
  {
    id: '37',
    name: 'Santiago de Compostela',
    distance: 775,
    elevation: 260,
    coordinates: { lat: 42.8806, lng: -8.5452 }
  }
];
