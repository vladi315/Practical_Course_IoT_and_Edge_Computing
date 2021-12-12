import { call } from "./api";

class Test {
  public success: boolean = true;
}

describe("Api", () => {
  it("map json successful", () => {
    window.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        json: () => new Test(),
      });
    });

    return call<Test>("http://localhost/api").then((data) => {
      expect(data).not.toBeNull();
      expect(data.success).toBe(true);
    });
  });
});
