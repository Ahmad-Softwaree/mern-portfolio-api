import {
  ADMIN_INITIAL_POPULATE_SELECTION,
  CATEGORY_INITIAL_POPULATE_SELECTION,
  STACK_INITIAL_POPULATE_SELECTION,
  TYPE_INITIAL_POPULATE_SELECTION,
} from "./selectPopulation.js";

export const blogPopulation = (
  initial,
  admin,
  adminPopulationSelect,
  category,
  categoryPopulationSelect
) => {
  if (initial)
    return [
      { path: "admin", select: ADMIN_INITIAL_POPULATE_SELECTION },
      {
        path: "categories.category",
        select: CATEGORY_INITIAL_POPULATE_SELECTION,
      },
    ];
  let population = [];
  if (admin) population.push({ path: "admin", select: adminPopulationSelect });
  if (category)
    population.push({
      path: "categories.category",
      select: categoryPopulationSelect,
    });

  return population;
};

export const projectPopulation = (
  initial,
  admin,
  adminPopulationSelect,
  category,
  categoryPopulationSelect,
  type,
  typePopulationSelect
) => {
  if (initial)
    return [
      { path: "admin", select: ADMIN_INITIAL_POPULATE_SELECTION },
      ,
      { path: "stacks.stack", select: STACK_INITIAL_POPULATE_SELECTION },
      { path: "types.type", select: TYPE_INITIAL_POPULATE_SELECTION },
    ];
  let population = [];
  if (admin) population.push({ path: "admin", select: adminPopulationSelect });
  if (category)
    population.push({ path: "stacks.stack", select: categoryPopulationSelect });
  if (type)
    population.push({ path: "types.type", select: typePopulationSelect });
  return population;
};

export const certificatePopulation = (
  initial,
  admin,
  adminPopulationSelect,
  category,
  categoryPopulationSelect,
  type,
  typePopulationSelect
) => {
  if (initial)
    return [
      { path: "admin", select: ADMIN_INITIAL_POPULATE_SELECTION },
      ,
      { path: "stacks.stack", select: STACK_INITIAL_POPULATE_SELECTION },
      { path: "types.type", select: TYPE_INITIAL_POPULATE_SELECTION },
    ];
  let population = [];
  if (admin) population.push({ path: "admin", select: adminPopulationSelect });
  if (category)
    population.push({ path: "stacks.stack", select: categoryPopulationSelect });
  if (type)
    population.push({ path: "types.type", select: typePopulationSelect });
  return population;
};

export const skillPopulation = (
  initial,
  admin,
  adminPopulationSelect,
  type,
  typePopulationSelect
) => {
  if (initial)
    return [
      { path: "admin", select: ADMIN_INITIAL_POPULATE_SELECTION },
      { path: "types.type", select: TYPE_INITIAL_POPULATE_SELECTION },
    ];
  let population = [];
  if (admin) population.push({ path: "admin", select: adminPopulationSelect });
  if (type)
    population.push({ path: "types.type", select: typePopulationSelect });
  return population;
};
