export interface QrcodeDto {
  qrcode_key: string;
  url: string;
}

export interface pollLoginStatusDto {
  url: string;
  refresh_token: string;
  timestamp: number;
  code: number;
  message: string;
  cookie: Record<string, string>;
}

export interface UserInfoDto {
  mid: number;
  uname: string;
  userid: string;
  sign: string;
  birthday: string;
  sex: string;
  nick_free: boolean;
  rank: string;
  face: string;
}
