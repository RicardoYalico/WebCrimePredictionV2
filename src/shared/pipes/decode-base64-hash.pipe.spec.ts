import { DecodeBase64HashPipe } from './decode-base64-hash.pipe';

describe('DecodeBase64HashPipe', () => {
  it('create an instance', () => {
    const pipe = new DecodeBase64HashPipe();
    expect(pipe).toBeTruthy();
  });
});
