//@UPDATE

export const updateOneByField = async (
  schemaName,
  schema,
  field,
  value,
  not,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findOneAndUpdate(
            { [field]: not ? { $ne: value } : value },
            { $set: body },
            { new: true }
          )
          .select(select)
      : await schema
          .findOneAndUpdate(
            { [field]: not ? { $ne: value } : value },
            { $set: body },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};
export const updateManyByField = async (
  schemaName,
  schema,
  field,
  value,
  not,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .updateMany(
            { [field]: not ? { $ne: value } : value },
            { $set: body },
            { new: true }
          )
          .select(select)
      : await schema
          .updateMany(
            { [field]: not ? { $ne: value } : value },
            { $set: body },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const updateMany = async (
  schemaName,
  schema,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findAndUpdate({}, { $set: body }, { new: true })
          .select(select)
      : await schema
          .findAndUpdate({}, { $set: body }, { new: true })
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const pullMany = async (
  schemaName,
  schema,
  field,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .updateMany(
            {},
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
      : await schema
          .updateMany(
            {},
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const updateOneByTwoField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  body,
  operand,
  populate,
  population,
  select = ""
) => {
  try {
    const data = !populate
      ? operand === "and"
        ? await schema
            .findOneAndUpdate(
              {
                $and: [
                  {
                    [field1]: not1 ? { $ne: value1 } : value1,
                  },
                  { [field2]: not2 ? { $ne: value2 } : value2 },
                ],
              },
              { $set: body },
              { new: true }
            )
            .select(select)
        : await schema
            .findOneAndUpdate(
              {
                $or: [
                  {
                    [field1]: not1 ? { $ne: value1 } : value1,
                  },
                  { [field2]: not2 ? { $ne: value2 } : value2 },
                ],
              },
              { $set: body },
              { new: true }
            )
            .select(select)
      : operand === "and"
      ? await schema
          .findOneAndUpdate(
            {
              $and: [
                {
                  [field1]: not1 ? { $ne: value1 } : value1,
                },
                { [field2]: not2 ? { $ne: value2 } : value2 },
              ],
            },
            { $set: body },
            { new: true }
          )
          .select(select)
          .populate(population)
      : await schema
          .findOneAndUpdate(
            {
              $or: [
                {
                  [field1]: not1 ? { $ne: value1 } : value1,
                },
                { [field2]: not2 ? { $ne: value2 } : value2 },
              ],
            },
            { $set: body },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const updateOneById = async (
  schemaName,
  schema,
  id,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findByIdAndUpdate(id, { $set: body }, { new: true })
          .select(select)
      : await schema
          .findByIdAndUpdate(id, { $set: body }, { new: true })
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const pullOneById = async (
  schemaName,
  schema,
  id,
  field,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findByIdAndUpdate(
            id,
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
      : await schema
          .findByIdAndUpdate(
            id,
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const pullOneByField = async (
  schemaName,
  schema,
  findField,
  value,
  field,
  body,
  not,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findOneAndUpdate(
            { [findField]: not ? { $ne: value } : value },
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
      : await schema
          .findOneAndUpdate(
            { [findField]: not ? { $ne: value } : value },
            {
              $pull: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const pushOneById = async (
  schemaName,
  schema,
  id,
  field,
  body,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findByIdAndUpdate(
            id,
            {
              $push: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
      : await schema
          .findByIdAndUpdate(
            id,
            {
              $push: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const pushOneByField = async (
  schemaName,
  schema,
  findField,
  value,
  field,
  body,
  not,
  populate,
  population,
  select = ""
) => {
  try {
    let data = !populate
      ? await schema
          .findOneAndUpdate(
            { [findField]: not ? { $ne: value } : value },
            {
              $push: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
      : await schema
          .findOneAndUpdate(
            { [findField]: not ? { $ne: value } : value },
            {
              $push: {
                [field]: body,
              },
            },
            { new: true }
          )
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};
