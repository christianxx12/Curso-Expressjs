function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  return typeof name === "string" && name.length >= 3;
}

function isNumeric(id) {
  const idRegex = /^[0-9]+$/;
  return typeof id === "number" && idRegex.test(id);
}

function isUniqueId(id, users) {
  return !users.some((user) => user.id === id);
}

function validateUser(user) {
  const { name, email, id } = user;

  if (!isValidName(name)) {
    return {
      isValid: false,
      error: "El nombre debe tener al menos 3 caracteres.",
    };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: "El correo electrónico no es válido." };
  }
  if (!isNumeric(id)) {
    return { isValid: false, error: "El ID debe ser numérico." };
  }

  return { isValid: true };
}

module.exports = {
  isValidEmail,
  isValidName,
  isNumeric,
  isUniqueId,
  validateUser,
};
