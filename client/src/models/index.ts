export enum UploadingStatus {
  UPLOADNG_PENDING,
  UPLOAD_ONGOING,
  UPLOAD_SUCCEEDED,
  UPLOAD_FAILED,
  UPLOAD_CANCELLED,
}

export interface NewFile {
  id: string;
  name: string;
  status: UploadingStatus;
  objectUrl: string;
}
