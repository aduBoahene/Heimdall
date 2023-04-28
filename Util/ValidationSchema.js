const yup = require('yup');

 const createUserSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required("Required")
	.min(8, "Must be 8 characters or more")
	.matches(/[a-z]+/, "One lowercase character")
	.matches(/[A-Z]+/, "One uppercase character")
	.matches(/[@$!%*#?&]+/, "One special character")
	.matches(/\d+/, "One number"),
  });


  const createAppLinkSchema = yup.object().shape({
	name: yup.string().required(),
	icon: yup.string().email().required(),
	url: yup.string().min(8).required(),
  });


  module.exports = {createUserSchema,createAppLinkSchema}