import { expect, test } from "../../fixtures/custom-fixture";
import users from "../../test-data/users.json";

test.describe("User Authentication", () => {
  test(
    "successful-login",
    { tag: ["@smoke", "@login"] },
    async ({ loginPage, dashBoardPage }) => {
    test.step("GIVEN USER NAVIGATES TO LOGIN PAGE", async () => {
        await loginPage.navigate("/login");
      });

      test.step("WHEN USER CLICKS 'NO THANKS' BUTTON", async () => {
        await loginPage.clickNoThanksButtonIfVisible();
      });

      test.step("AND USER PROVIDES VALID CREDENTIALS", async () => {
        await loginPage.login(users.valid.username, users.valid.password);
      });

      test.step("THEN USER SHOULD BE LOGGED IN SUCCESSFULLY", async () => {
        await expect(dashBoardPage.loginSuccessMessage).toBeVisible();
        await expect(dashBoardPage.loginSuccessMessage).toContainText(
          users.valid.username,
        );
      });
    },
  );
});
