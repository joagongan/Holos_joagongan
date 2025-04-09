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
    description: undefined;
    linkToSocialMedia: undefined;
    tableCommissionsPrice: undefined;
    imageProfile: string | undefined;
    numSlotsOfWork: undefined;
  
  }