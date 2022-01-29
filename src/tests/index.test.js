import { showHealthStatus } from "../js/index.js";
import { sortHealthStatus } from "../js/index.js";
import fetchData from "../js/http.js";
import { getLevel } from "../js/index.js";

jest.mock("../js/http");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Game functions: ", () => {

  test("showHealthStatus should return correct status", () => {
    expect(showHealthStatus({ name: "гладиатор", health: 25 })).toEqual(
      "wounded"
    );
    expect(showHealthStatus({ name: "гладиатор", health: 5 })).toEqual(
      "critical"
    );
    expect(showHealthStatus({ name: "гладиатор", health: 70 })).toEqual(
      "healthy"
    );
  });

  test("sortHealthStatus should return correct order of characters", () => {
    expect(
      sortHealthStatus([
        { name: "бард", health: 15 },
        { name: "чародей", health: 85 },
        { name: "целитель", health: 20 },
        { name: "ассассин", health: 45 },
        { name: "страж", health: 90 },
      ])
    ).toEqual([
      { name: "страж", health: 90 },
      { name: "чародей", health: 85 },
      { name: "ассассин", health: 45 },
      { name: "целитель", health: 20 },
      { name: "бард", health: 15 },
    ]);
  });

});

describe('Functions for mocking: ', () => {

    test("fetchData should be called with correct url", () => {
        fetchData.mockReturnValue(JSON.stringify({}));
        getLevel(1);
        expect(fetchData).toBeCalledWith("https://server/user/1");
      });
      
      test("getLevel should return correct response", () => {
        fetchData.mockReturnValue({ status: "ok", level: 100 });
        expect(getLevel(1)).toEqual("Ваш текущий уровень: 100");
      });
      
      test("fetchData should throw error", () => {
        expect(() => {
          fetchData("url");
        }).toThrow("Mock this!");
      });
      
})


