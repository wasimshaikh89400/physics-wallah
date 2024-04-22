interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  company: string;
  location: string;
  email: string;
}

interface RepoElement {
  id: number;
  name: string;
  visibility: string;
  language: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  forks: number;
  license: {
    name: string;
    key: string;
  };
}

export type { GitHubUser, RepoElement };
