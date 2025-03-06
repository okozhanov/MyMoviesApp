const placeholders = {
  email: "example@mail.com",
  password: "password123",
  name: "Andrii Kuzmenko",
  passwordConfirm: "password123 (again)",
};

const errors = {
  default: "Something went wrong!",
  email: "Enter correct email",
  password: "Enter at least 1 letter, 1 number, min 8 length",
  name: "Min 2 length",
  passwordConfirm: "Passwords do not match",
  login: "Wrong email or password!",
};

const STRINGS = { placeholders, errors };

export default STRINGS;
