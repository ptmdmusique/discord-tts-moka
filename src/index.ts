require("dotenv").config();
import { startMokaBot } from "./moka";
import { setupEnv } from "./utils/env";

setupEnv();
startMokaBot();
