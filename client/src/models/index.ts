export enum UploadingStatus {
  UPLOADNG_PENDING = "Pending",
  UPLOAD_ONGOING = "Uploading",
  UPLOAD_SUCCEEDED = "Succeeded",
  UPLOAD_FAILED = "Failed",
  UPLOAD_CANCELLED = "Cancelled",
}

export interface NewFile {
  id: string;
  name: string;
  status: UploadingStatus;
  objectUrl: string;
}
