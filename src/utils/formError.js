export function FormError(errors) {
  this.errors = errors;
}

FormError.prototype = Object.create(Error.prototype);
FormError.prototype.constructor = FormError;
