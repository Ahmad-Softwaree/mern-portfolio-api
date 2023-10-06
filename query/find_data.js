//@query

//@find one

export const findOne = async (
  schemaName,
  schema,
  populate,
  population,
  select = ""
) => {
  try {
    const data = !populate
      ? await schema.findOne().select(select)
      : await schema.findOne().select(select).populate(population);

    if (!data) throw new Error(`${schemaName} not found`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const findAll = async (
  schemaName,
  schema,
  populate,
  population,
  select = "",
  limit = 0,
  sort = { _id: 1 }
) => {
  try {
    const data = !populate
      ? await schema.find().select(select).limit(limit).sort(sort)
      : await schema
          .find()
          .select(select)
          .limit(limit)
          .sort(sort)
          .populate(population);

    if (!data) throw new Error(`${schemaName} not found`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const findRandomly = async (
  schemaName,
  schema,
  populate,
  population,
  select = "",
  random
) => {
  try {
    const data = !populate
      ? await schema
          .find()
          .aggregate([{ $sample: { size: random } }])
          .select(select)
      : await schema
          .aggregate([{ $sample: { size: random } }])
          .find()
          .select(select)
          .populate(population);

    if (!data) throw new Error(`${schemaName} not found`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (
  schemaName,
  schema,
  id,
  populate,
  population,
  select = ""
) => {
  try {
    const data = !populate
      ? await schema.findById(id).select(select)
      : await schema.findById(id).select(select).populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const checkIfDataExist = async (schemaName, schema) => {
  try {
    const data = await schema.find({});
    return data;
  } catch (error) {
    throw error;
  }
};
export const checkIfOneDataExist = async (
  schemaName,
  schema,
  field,
  value,
  not
) => {
  try {
    const data = await schema.findOne({
      [field]: not ? { $ne: value } : value,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const findManyByField = async (
  schemaName,
  schema,
  field,
  value,
  not,
  populate,
  population,
  select = "",
  limit = 0,
  sort = 1
) => {
  try {
    const data = !populate
      ? await schema
          .find({ [field]: not ? { $ne: value } : value })
          .select(select)
          .limit(limit)
          .sort({ _id: sort })
      : await schema
          .find({ [field]: not ? { $ne: value } : value })
          .select(select)
          .limit(limit)
          .populate(population)
          .sort({ _id: sort });
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};
export const findManyByTwoField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  operand,
  populate,
  population,
  select = ""
) => {
  try {
    const data = !populate
      ? operand === "and"
        ? await schema.find({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
        : await schema.find({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
      : operand === "and"
      ? await schema
          .find({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
          .populate(population)
      : await schema
          .find({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const findManyByThreeField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  field3,
  value3,
  not3,
  operand,
  populate,
  population
) => {
  try {
    const data = !populate
      ? operand === "and"
        ? await schema.find({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          })
        : await schema.find({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          })
      : operand === "and"
      ? await schema
          .find({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          })
          .populate(population)
      : await schema
          .find({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          })
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const findOneByField = async (
  schemaName,
  schema,
  field,
  value,
  not,
  populate,
  population,
  select = ""
) => {
  try {
    const data = !populate
      ? await schema
          .findOne({ [field]: not ? { $ne: value } : value })
          .select(select)
      : await schema
          .findOne({ [field]: not ? { $ne: value } : value })
          .select(select)
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const findOneByTwoField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  operand,
  populate,
  population
) => {
  try {
    const data = !populate
      ? operand === "and"
        ? await schema.findOne({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
        : await schema.findOne({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
      : operand === "and"
      ? await schema
          .findOne({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
          .populate(population)
      : await schema
          .findOne({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
          .populate(population);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

//@already exist

export const alreadyExistById = async (schemaName, schema, id) => {
  try {
    const data = await schema.findById(id);
    if (data) throw new Error(`${schemaName} already exist`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const alreadyExistByField = async (schemaName, schema, field, value) => {
  try {
    const data = await schema.findOne({ [field]: value });
    if (data) throw new Error(`${schemaName} already exist`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const alreadyExistByTwoField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  operand
) => {
  try {
    const data =
      operand === "and"
        ? await schema.findOne({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
        : await schema.findOne({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          });
    if (data) throw new Error(`${schemaName} already exist`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const alreadyExistByThreeField = async (
  schemaName,
  schema,
  field1,
  value1,
  not1,
  field2,
  value2,
  not2,
  field3,
  value3,
  not3,
  operand
) => {
  try {
    const data =
      operand === "and"
        ? await schema.findOne({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          })
        : await schema.findOne({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
              { [field3]: not3 ? { $ne: value3 } : value3 },
            ],
          });
    if (data) throw new Error(`${schemaName} already exist`);
    else return data;
  } catch (error) {
    throw error;
  }
};
