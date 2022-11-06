/* eslint-disable no-undef */
import pairTopTwoEmployees from "./utils/helpers";

describe("test", function () {
  it("should return undefined", function () {
    const csv = `143, 12, 2013-11-01, 2013-11-16`;
    expect(pairTopTwoEmployees(csv)).toBeUndefined();
  });
  it("should return correct top employees when 2 records", function () {
    const csv = `143, 12, 2013-11-01, 2013-11-16
    145, 12, 2013-11-01, 2013-11-16
    `;
    const pair = pairTopTwoEmployees(csv);
    const pairEmployees = [pair.employee1, pair.employee2];

    expect(pairEmployees).toEqual([143, 145]);
  });
  it("should return correct top employees when multiple records", function () {
    const csv = `143, 12, 2013-11-01, 2013-11-16
    145, 12, 2013-11-01, 2013-11-16
    145, 25, 2013-11-01, 2013-11-19
    35, 25, 2013-11-01, 2013-11-17
    `;
    const pair = pairTopTwoEmployees(csv);
    const pairEmployees = [pair.employee1, pair.employee2];

    expect(pairEmployees).toEqual([145, 35]);
  });
  it("should blabla", function () {
    const csv = `143, 12, 2013-11-01, 2014-01-05
    218, 10, 2012-05-16, NULL
    143, 10, 2009-01-01, 2011-04-27`;
    console.log(pairTopTwoEmployees(csv));
  });
});
