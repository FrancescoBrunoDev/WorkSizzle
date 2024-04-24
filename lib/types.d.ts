interface holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[] | null;
    launchYear: number | null;
    type: string;
  }
  
  interface country {
    id: number;
    alpha2: string | null;
    alpha3?: string;
    name?: string;
  }