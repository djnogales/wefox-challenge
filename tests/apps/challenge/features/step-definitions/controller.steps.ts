import { Given, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { ChallengeApp } from "../../../../../src/apps/challenge/ChallengeApp";
import container from "../../../../../src/apps/challenge/dependency-injection";
import { EnvironmentArranger } from "../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger";

let _request: request.Test;
let _response: request.Response;
let application: ChallengeApp;

Given("I send a POST request to {string} with body:", (route: string, body: string) => {
  _request = request(application.httpServer).post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

BeforeAll(async() => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.EnvironmentArranger');
  await (await environmentArranger).arrange();
  application = new ChallengeApp();
  await application.start();
});

AfterAll(async() => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});
