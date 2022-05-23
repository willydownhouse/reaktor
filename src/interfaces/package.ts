interface IBaseInfo {
  name?: string;
  description?: string;
  category?: string;
  optional?: boolean;
}

export interface IPackage {
  package?: IBaseInfo;
  dependencies?: string[];
  extras?: Record<string, unknown>;
}
