import container from "../../../../src/apps/challenge/dependency-injection";
import { AddressRepository } from "../../../../src/Contexts/Challenge/Address/domain/AddressRepository";
import { EnvironmentArranger } from "../../Shared/infrastructure/arranger/EnvironmentArranger";

const repository: AddressRepository = container.get('Challenge.Address.AddressRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Challenge.EnvironmentArranger');

beforeEach(async() => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('RedisCacheAddressRepository', () => {
  it('should return null with incorrect address', async () => {
    const address = await repository.search("Test", "32", "Test", "12345", "country");
    expect(address).toBeNull();
  });
});
