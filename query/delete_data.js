export const deleteAll = async (schemaName, schema) => {
  try {
    const data = await schema.deleteMany();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (schemaName, schema, filed, value) => {
  try {
    const data = await schema.findOneAndDelete({ [filed]: value });
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (schemaName, schema, id) => {
  try {
    const data = await schema.findByIdAndDelete(id);
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const deleteOneByField = async (
  schemaName,
  schema,
  field,
  value,
  not
) => {
  try {
    let data = await schema.findOneAndDelete({
      [field]: not ? { $ne: value } : value,
    });
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const deleteManyByField = async (
  schemaName,
  schema,
  field,
  value,
  not
) => {
  try {
    let data = await schema.deleteMany({
      [field]: not ? { $ne: value } : value,
    });
    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteOneByTwoField = async (
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
        ? await schema.findOneAndDelete({
            $and: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          })
        : await schema.findOneAndDelete({
            $or: [
              {
                [field1]: not1 ? { $ne: value1 } : value1,
              },
              { [field2]: not2 ? { $ne: value2 } : value2 },
            ],
          });

    if (!data) throw new Error(`${schemaName} not found`);
    else return data;
  } catch (error) {
    throw error;
  }
};
