import Joi from "joi";

export default {
  initiate: async () => {
    const {parsed, error} = require("dotenv").config({ path: ".env" })
    if (error) {
      throw error;
    }
    process.env = await Joi.object({
      PORT: Joi.number().port().required(),
      NODE_ENV: Joi.string().valid("local","development","staging","production"),
      OPEN_LIBRARY_URL: Joi.string().uri().required(),
    })
        .unknown(true)
        .validateAsync(parsed);
  }
}
