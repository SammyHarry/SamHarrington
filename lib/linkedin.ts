export interface LinkedInProfile {
  name: string;
  headline?: string;
  url?: string;
}

// Placeholder util to merge LinkedIn JSON data later
export function importLinkedIn(data: LinkedInProfile) {
  return data;
}
