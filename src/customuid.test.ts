import { CustomUID } from "./customuid";
describe('customuuid test', () => {
  const text = 'random_urlpath';
  let uid = new CustomUID(text);

  it('should generate an href', () => {
    expect(uid.href).toBe("http://localhost/#O-random_urlpath-1");
  });
  it('should generate an id', () => {
    expect(uid.id).toBe("O-random_urlpath-1");
  });
  it('should generate an url', () => {
    expect(uid.toString()).toBe("url(http://localhost/#O-random_urlpath-1)");
  });
});
