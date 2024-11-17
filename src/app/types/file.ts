export type TCloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  create_at: string;
  tags: string[];
  bytes: number;
  etag: string;
  placeholder: boolean;
  rl: string;
  secure_url: string;
  folder: string;
  overwritten: boolean;
  original_filename: string;
  original_extension: string;
  api_key: string;
};

export type TFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
