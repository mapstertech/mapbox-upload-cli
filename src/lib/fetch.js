import axios from "axios";

const fetch = async (...params) => {
  try {
    const data = await axios(...params);
    return data.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
    console.log(`Data: ${e}`)
  }
};

export default fetch;
