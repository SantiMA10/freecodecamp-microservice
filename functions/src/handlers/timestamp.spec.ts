import { timestampHandler } from "./timestamp";

describe("timestamp handler", () => {
  const now = Date.now();

  beforeAll(() => {
    Date.now = jest.fn(() => now);
  });

  it("should return 'new Date()' if the string if empty", () => {
    const response = timestampHandler("");

    expect(response).toHaveProperty("unix");
    expect(response).toHaveProperty("utc");

    expect(response.unix).toBe(now);
    expect(response.utc).toBe((new Date(now)).toUTCString());
  });

  it("should return a valid date, for example '2016-11-20', as unix time and utc", () => {
    const response = timestampHandler("2016-11-20");

    expect(response).toHaveProperty("unix");
    expect(response).toHaveProperty("utc");

    const date = new Date("2016-11-20");

    expect(response.unix).toBe(date.getTime());
    expect(response.utc).toBe(date.toUTCString());
  });
});
