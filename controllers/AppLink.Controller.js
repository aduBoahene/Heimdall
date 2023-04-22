const { appLink } = require('../models')



exports.getAllLinks = async (req, res) => {
	await appLink.findAll()
		.then(result => res.status(200).json({
			_msg: "All App Links",
			data: result,
			error: null
		}
		))
		.catch(err => res.status(500).json({
			_msg: "Internal Server Error",
			data: null,
			error: err.message
		}));
}


exports.createAppLink = async (req, res) => {
	try {
		const { name, icon, url } = req.body

		const link = await appLink.create({ name, icon, url })

		res.status(201).json({
			_msg: "App Link Created Succesfully",
			data: link,
			error: null
		})
	} catch (error) {
		res.status(500).json({
			_msg: "Error creating App Link",
			data: null,
			error: error.message
		})
	}

}

exports.updateAppLink = async (req, res) => {
	try {
		const id = req.params.id;
		const toBeUpdated = await appLink.findOne({
			where: {
				id
			}
		})
		if (toBeUpdated === null) {
			res.status(404).json({
				_msg: `Link with ${id} does not exist`,
				data: "",
				error: null
			});
		}

		const updatedLink = await appLink.update(req.body, {
			where: {
				id
			}
		});

		res.status(200).json({
			_msg: "Link Updated Succesfully",
			data: updatedLink,
			error: null
		});
	} catch (err) {
		res.status(500).json({
			_msg: "Internal Server Error",
			data: null,
			error: err.message
		});
	}
}


exports.deleteAppLink = async (req, res) => {
	try {
		const id = req.params.id;
		await appLink.destroy({
			where: {
				id
			}
		});
		res.status(204).json({
			_msg: "Link Deleted Succesfully",
			data: null,
			error: null
		});
	} catch (err) {
		res.status(500).json({
			_msg: "Internal Server Error",
			data: null,
			error: err.message
		});
	}

}