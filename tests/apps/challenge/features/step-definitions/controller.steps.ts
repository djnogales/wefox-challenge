import { Given, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { ChallengeApp } from "../../../../../src/apps/challenge/ChallengeApp";
import container from "../../../../../src/apps/challenge/dependency-injection";
import { EnvironmentArranger } from "../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger";

let _request: request.Test;
let _response: request.Response;
let application: ChallengeApp;

Given('an user with email {string} and password {string}', async (email: string, password) => {
  await request(application.httpServer).post('/user').send({
    email: email,
    password: password
  });
});

Given("I send a POST request to {string} with body:", (route: string, body: string) => {
  _request = request(application.httpServer).post(route).send(JSON.parse(body));
});

Given("I send a GET request to {string}", (route: string) => {
  _request = request(application.httpServer).get(route).send();
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

Then('the response body should have a token', () => {
  assert.notDeepStrictEqual(_response.body.token, null);
});

Then('the response body should have Weather primitives', () => {
  assert.notDeepStrictEqual(_response.body.cloudCover, null);
  assert.notDeepStrictEqual(_response.body.weather, null);
});


BeforeAll(async() => {
  const redisEnvironmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.RedisEnvironmentArranger');
  const mongoEnvironmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.MongoEnvironmentArranger');

  await (await redisEnvironmentArranger).arrange();
  await (await mongoEnvironmentArranger).arrange();
  application = new ChallengeApp();
  await application.start();
});

AfterAll(async() => {
  const redisEnvironmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.RedisEnvironmentArranger');
  const mongoEnvironmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.MongoEnvironmentArranger');

  await (await redisEnvironmentArranger).arrange();
  await (await mongoEnvironmentArranger).arrange();
  await (await redisEnvironmentArranger).close();
  await (await mongoEnvironmentArranger).close();
  await application.stop();
});
