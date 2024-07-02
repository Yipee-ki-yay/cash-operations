import { getSundayOfSameWeek } from "./date.js";

describe("date utils", () => {
  test("getSundayOfSameWeek 2016-01-05 Tuesday + 5 days", () => {
    const date = new Date("2016-01-05");

    const expectResult = new Date(date);
    expectResult.setDate(date.getDate() + 5);

    expect(getSundayOfSameWeek(date)).toEqual(expectResult);
  });

  test("getSundayOfSameWeek 2024-07-01 Monday + 6 days", () => {
    const date = new Date("2024-07-01");

    const expectResult = new Date(date);
    expectResult.setDate(date.getDate() + 6);

    expect(getSundayOfSameWeek(date)).toEqual(expectResult);
  });

  test("getSundayOfSameWeek 2024-07-01 Monday + 6 days", () => {
    const date = new Date("2024-07-01");

    const expectResult = new Date(date);
    expectResult.setDate(date.getDate() + 6);

    expect(getSundayOfSameWeek(date)).toEqual(expectResult);
  });

  test("getSundayOfSameWeek 2024-06-30 Sunday, no days added", () => {
    const date = new Date("2024-06-30");

    const expectResult = new Date(date);
    expectResult.setDate(date.getDate());

    expect(getSundayOfSameWeek(date)).toEqual(expectResult);
  });
});
