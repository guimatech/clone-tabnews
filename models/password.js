import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  // todo : desafio: implementar o Pepper
  return await bcryptjs.hash(password, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providePassword, storedPassword) {
  return await bcryptjs.compare(providePassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
