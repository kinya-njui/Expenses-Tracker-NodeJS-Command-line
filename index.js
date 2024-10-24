import fs from "fs";
import { Command } from "commander";
import chalk from "chalk";
import loadItems from "./utils/loadItems.js";

const program = new Command();

program
  .name("ExpensesTrackerApp")
  .description("A CLI to help you manage your expenses")
  .version("1.0.0");

//Add Item
program
  .command("new")
  .description("Add new item")
  .option("-t | --title <value>", "title of new item to be added ")
  .option("-q | --quantity <value>", "quantity of new item to be added")
  .option("-p | --price <value>", "price per quantity of new item to be added")
  .action(function (options) {
    const title = options.title;
    const quantity = options.quantity;
    const price = options.price;

    const newItem = {
      title: title,
      quantity: quantity,
      price: price,
    };

    const items = loadItems("./data/items.json");

    const itemExist = items.find((currentItem) => currentItem.title === title);
    if (itemExist) {
      console.log(chalk.bgRed(`Item with the title '${title}' already exist.`));
      return;
    }

    items.push(newItem);

  fs.writeFileSync("./data/items.json", JSON.stringify(items));

    console.log(chalk.green("New Item added successfully!!."));
  });

// update item
program
  .command("update")
  .description("Update an existing item")
  .option("-t, --title <value>", "title of the item to be updated")
  .option("-q, --quantity <value>", "new quantity of the item")
  .option("-p, --price <value>", "new price of the item")
  .action(function (options) {
    const title = options.title;
    const quantity = options.quantity;
    const price = options.price;

    const items = loadItems("./data/items.json");

    if (items.length === 0) {
      console.log(chalk.bgYellow("You don't have any Items yet"));
      return;
    }

    const itemToUpdate = items.find((currentItem) => currentItem.title === title);
    if (!itemToUpdate) {
      console.log(chalk.bgRed(`Item with the title '${title}' does not exist.`));
      return;
    }

    if (quantity) itemToUpdate.quantity = quantity;
    if (price) itemToUpdate.price = price;

    fs.writeFileSync("./data/items.json", JSON.stringify(items));
    console.log(chalk.bgGreen(`Updated item with title '${title}' successfully`));
  });

//Read Items
program
  .command("read")
  .description("Displays all the items")
  .option("-t, --title <value>", "title of the item to be read")
  .action(function (options) {
    const title = options.title;
    const items = loadItems("./data/items.json");

    if (items.length === 0) {
      console.log(chalk.bgYellow("You don't have any Items yet"));
      return;
    }
    if (title) {
      const item = items.find((currentItem) => currentItem.title === title);
      if (item) {
        console.log(item.title);
        console.log("-----------");
        console.log(item.quantity);
        console.log("-----------");
        console.log(item.price);
        return;
      }
      console.log(
        chalk.bgRed(`Item with the title '${title}' does not exist.`),
      );
      return;
    }
    items.forEach((currentItem) => {
      console.log(chalk.bgBlue("======="));
      console.log(currentItem.title);
      console.log("------");
      console.log(currentItem.quantity);
      console.log(chalk.bgBlue("=======\n"));
    });
  });

//Delete item
program
  .command("delete")
  .description("Delete an item")
  .option("-t, --title <value>", "title of the item to be deleted")
  .action(function (options) {
    const title = options.title;
    const items = loadItems("./data/items.json");

    if (items.length === 0) {
      console.log(chalk.bgYellow("You don't have any Items yet"));
      return;
    }
    const remainingItems = items.filter(
      (currentItem) => currentItem.title !== title,
    );

    if (remainingItems.length === items.length) {
      console.log(
        chalk.bgRed(`Item with the title '${title}' does not exist.`),
      );
      return;
    }
    fs.writeFileSync("./data/items.json", JSON.stringify(remainingItems));
    console.log(
      chalk.bgGreen(`Deleted item with title '${title}' successfully`),
    );
  });

program.parse(process.argv);
