import { expect, test } from "../../fixtures/custom-fixture";
import users from "../../test-data/users.json";

test.describe("User Authentication", () => {
  test("successful-login", async ({ loginPage, dashBoardPage }) => {
    await loginPage.navigate("/login");
    await loginPage.clickNoThanksButtonIfVisible();

    await loginPage.login(users.valid.username, users.valid.password);

    await expect(dashBoardPage.loginSuccessMessage).toBeVisible();
    await expect(dashBoardPage.loginSuccessMessage).toContainText(
      users.valid.username,
    );
  });
});
