module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
	  name: {
		  type: Sequelize.STRING
	  },
	  username: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.STRING
	  },
	  score: {
	  	type: Sequelize.INTEGER
		}
	});
	
	return User;
}