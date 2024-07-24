import inquirer from "inquirer";

export type DbBranches = "mongodb" | "sequelize" | "other";
const questions: any = [
  {
    type: "list",
    name: "dbSelector",
    message: "What is your DB preferred for the project?",
    choices: [
      {
        name: "MongoDB",
        value: "mongodb",
      },
      {
        name: "PostgreSQL-sequelize",
        value: "sequelize",
      },
      {
        name: "Other",
        value: "other",
      },
    ],
  },
];

export async function getDBSelector() {
  return inquirer
    .prompt(questions)
    .then((answers) => {
      const dbSelector = answers.dbSelector as DbBranches;
      return dbSelector;
    })
    .catch((error) => {
      console.error("Error creating project:", error);
      throw new Error(error);
    });
}
