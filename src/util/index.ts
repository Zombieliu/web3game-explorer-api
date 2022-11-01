// import { Repository, EntityTarget, getRepository, FindConditions } from 'typeorm';

// export async function insertOrUpdate<T>(
//   entityTarget: EntityTarget<T>,
//   entities: T[],
// ): Promise<void> {
//   try {
//     await getRepository(entityTarget).insert(entities);
//   } catch (e) {
//     await getRepository(entityTarget).save(entities);
//   }
// }

// export async function updateOrInsert<T>(
//   entityTarget: EntityTarget<T>,
//   criteria: FindConditions<T>,
//   entity: T,
// ): Promise<void> {
//   try {
//     await getRepository(entityTarget).update(criteria, entity);
//   } catch (e) {
//     await getRepository(entityTarget).insert(entity);
//   }
// }
