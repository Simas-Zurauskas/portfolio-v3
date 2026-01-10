export type Credential = {
  title: string;
  issuer: string;
  year?: string;
};

export type Service = {
  index: string;
  title: string;
  description: string;
  tech: string[];
  projectCount: number;
  credential?: Credential;
};
