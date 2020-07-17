const multer = require('multer');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images');

/**
 *	@Desc	Handle the multer configuration.
 *	Consist of images storage configs & upload configs
 *
 *	@TODO ## try to make uploaded directory dinamically
 *
 */
const setFileName = function (req, file, cb) {
  const prefix = parseInt(Date.now() / (Math.random() * 18021995)).toString();
  file.originalname = file.originalname.toLowerCase().split('_').join('');
  
	cb(null, prefix + '-' + file.originalname);
};

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png|gif/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);
	mimeType && extName ? cb(null, true) : cb(`Error: Only images accepted!`);
};

// #region imageStorages configs
const blogImagesStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${imageDir}/blogs`);
	},
	filename: setFileName
});

const catImagesStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${imageDir}/cats`);
	},
	filename: setFileName
});

const commentImagesStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${imageDir}/comments`);
	},
	filename: setFileName
});

const userImagesStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${imageDir}/users`);
	},
	filename: setFileName
});
// #endregion

// #region uploadConfigs
const blogImageConfig = multer({
	storage: blogImagesStorage,
	limits: { fileSize: 2048 * 2048 },
	fileFilter
});

const catImageConfig = multer({
	storage: catImagesStorage,
	limits: { fileSize: 2048 * 2048 },
	fileFilter
});

const commentImageConfig = multer({
	storage: commentImagesStorage,
	limits: { fileSize: 1024 * 1024 },
	fileFilter
});

const userImageConfig = multer({
	storage: userImagesStorage,
	limits: { fileSize: 1024 * 1024 },
	fileFilter
});
// #endregion

const uploadBlogImage = blogImageConfig.single('blogImage');
const uploadCatImage = catImageConfig.single('catImage');
const uploadCommentImage = commentImageConfig.single('commentImage');
const uploadUserPhoto = userImageConfig.single('userPhoto');

module.exports = {
	uploadBlogImage,
	uploadCatImage,
	uploadCommentImage,
	uploadUserPhoto
};

