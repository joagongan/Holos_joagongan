export interface artistUser {
    firstName: string;
    username: string;
    email: string;
    phoneNumber: string;
    description: string;
    linkToSocialMedia: string;
    tableCommissionsPrice: string;
    imageProfile: string;
    numSlotsOfWork: number;
  
  }

  export interface clientUser {
    firstName: string;
    username: string;
    email: string;
    phoneNumber: string;
    description: null;
    linkToSocialMedia: null;
    tableCommissionsPrice: null;
    imageProfile: string | undefined;
    numSlotsOfWork: null;
  
  }