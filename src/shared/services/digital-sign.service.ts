import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class DigitalSignService {

  constructor() { }

  decodeBase64Hash(code: any) {
    return atob(code); // Decodifica una cadena en base64
  }

  removeWebSafe(safeEncodedString: string) {
    return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
  }
  makeWebSafe(encodedString: string) {
    return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
  }
  encodeBase64Hash(key: string, data: string) {
    const hmac = CryptoJS.HmacSHA1(data, key);
    return CryptoJS.enc.Base64.stringify(hmac);
  }
  sign(path: string, secret: string) {
    const uri = new URL(path);
    const safeSecret = this.decodeBase64Hash(this.removeWebSafe(secret));
    const hashedSignature = this.makeWebSafe(this.encodeBase64Hash(safeSecret, uri.pathname));
    uri.searchParams.append('signature', hashedSignature);
    return uri.toString();
  }
}
