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
});
