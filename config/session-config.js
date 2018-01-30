module.exports = {
	db: 'blog',
	collection: 'session',
	key: 'NODESESSID',       //cookie存储的key
	field: {
		session: 'session',
		expires: 'expires',
		member_id: 'member_id'
	},
	time: 1000 * 60 * 60 * 24 * 1
};