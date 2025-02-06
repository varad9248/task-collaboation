// types.ts

export interface ClerkWebhookEvent {
    type: string;
    data: ClerkUserData;
  }
  
  export interface ClerkUserData {
    id: string;
    firstName: string;
    emailAddresses: { emailAddress: string }[];
    profileImageUrl: string;
  }
  