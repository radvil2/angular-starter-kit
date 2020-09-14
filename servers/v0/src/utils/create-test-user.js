const { User } = require('../configs/db.config');
const Role = require('../configs/role.config');

module.exports = async function createTestUser() {
	// create test user if the db is empty
	if ((await User.countDocuments({})) < 2) {
		const newAdmin = new User({
			name: 'Admin User',
			username: 'admin',
			email: 'admin@gmail.com',
			password: 'password',
			role: Role.Admin,
			updatedAt: Date.now(),
			lastLogin: Date.now(),
			photo: 'assets/portraits/1.jpg',
			coverPicture: 'assets/features/1.jpg',
			gender: 'male',
			birthday: Date.now(),
			company: 'We Dont Care',
			job: 'Web Stack Dev',
			followers: ['1212', '1212', '1212', '1212']
		});

		const newUser = new User({
			name: 'Regular User',
			username: 'user',
			email: 'user@gmail.com',
			password: 'password',
			role: Role.User,
			updatedAt: Date.now(),
			lastLogin: Date.now(),
			photo: 'assets/portraits/1.jpg',
			coverPicture: 'assets/features/1.jpg',
			gender: 'male',
			birthday: Date.now(),
			company: 'We Dont Care',
			job: 'Web Stack Dev',
			followers: ['1212', '1212', '1212', '1212']
		});

		const testUser = new User({
			name: 'Test User',
			username: 'test',
			email: 'test@gmail.com',
			password: 'password',
			role: Role.User,
			updatedAt: Date.now(),
			lastLogin: Date.now(),
			photo: 'assets/portraits/1.jpg',
			coverPicture: 'assets/features/1.jpg',
			gender: 'female',
			birthday: Date.now(),
			company: 'We Dont Care',
			job: 'Web Stack Dev',
			followers: ['1212', '1212', '1212', '1212']
		});

		await newAdmin.save();
		await newUser.save();
		await testUser.save();
	}
};
