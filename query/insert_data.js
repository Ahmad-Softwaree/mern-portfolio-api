//@INSERT

export const insertData = async (
  schemaName,
  schema,
  body,
  populate = false,
  population
) => {
  try {
    let data = new schema(body);
    data = await data.save();
    if (populate) {
      data = await data.populate(population);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
