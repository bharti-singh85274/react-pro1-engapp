export const validateSignup = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {

  const errors: any = {};

  /* ---------------- Name ---------------- */

  if (!name.trim()) {

    errors.name = "Please enter your full name.";

  } else if (name.trim().length < 3) {

    errors.name =
      "Name must contain at least 3 characters.";

  } else if (!/^[A-Za-z ]+$/.test(name.trim())) {

    errors.name =
      "Name can contain only letters and spaces.";

  }

  /* ---------------- Email ---------------- */

  if (!email.trim()) {

    errors.email =
      "Please enter your email address.";

  } else {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {

      errors.email =
        "Please enter a valid email address.";

    }

  }

  /* ---------------- Password ---------------- */

  if (!password) {

    errors.password =
      "Please enter your password.";

  } else if (password.length < 8) {

    errors.password =
      "Password must be at least 8 characters.";

  }

  /* ---------------- Confirm Password ---------------- */

  if (!confirmPassword) {

    errors.password_confirmation =
      "Please confirm your password.";

  } else if (password !== confirmPassword) {

    errors.password_confirmation =
      "Passwords do not match.";

  }

  return errors;

};




export const validateLogin = (
  email: string,
  password: string
) => {

  const errors: any = {};

  /* Email */

  if (!email.trim()) {

    errors.email =
      "Please enter your email address.";

  } else {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {

      errors.email =
        "Please enter a valid email address.";

    }

  }

  /* Password */

  if (!password) {

    errors.password =
      "Please enter your password.";

  } else if (password.length < 8) {

    errors.password =
      "Password must be at least 8 characters.";

  }

  return errors;

};