import { Cat, Dog } from "./animal";
import { createCatName } from "./animal";

type Animals = Cat | Dog;
const name = createCatName();

// import fs = require("fs");