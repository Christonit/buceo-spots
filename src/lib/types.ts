export interface ContributionI {
  amount: number;
  contribution_year: number;
  funding_source: string;
  status: string;
  submission_date: {
    seconds: number;
    nanoseconds: number;
  };
  user: string;
}

export type Location = {
  lng: number;
  lat: number;
  title: string;
  description: string;
  image: string;
  [key: string]: any;
};
