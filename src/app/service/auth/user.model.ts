export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    isAdmin?: boolean;
  }
  
  export interface Categories {
    name: string;
  }