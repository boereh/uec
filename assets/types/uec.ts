export type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string[];
  director: string[];
  actors: string[];
  mpaa: string;
  runtime: number;
  released: string;
  special: boolean;
  youtube: string | null;
  poster: string;
};

export type Theatre = {
  name: string;
  id: number;
  address: string;
  phone: string;
  state: string;
  features: string[];
  concessions: string[];
  timezone: string;
  pricing: {
    mantinee: {
      adult: number;
      child: number;
      senior: number;
    };
    general: {
      adult: number;
      child: number;
      senior: number;
      student?: number;
      military?: number;
      "adult-weekend"?: number;
    };
    bargain?: number;
    recliners?: number;
    "3d"?: number;
    "mega-screen"?: number;
    "first-mantinee-show"?: number;
  };
};
