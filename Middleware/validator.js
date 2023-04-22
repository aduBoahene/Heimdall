const validate = (schema) => async (req, res, next) => {
	try {
	  await schema.validate({
		body: req.body,
		query: req.query,
		params: req.params,
	  });
	  return next();
	} catch (err) {
	  // More logic goes here
	  console.log("validator error", err)
	}
  };

  export default validate;