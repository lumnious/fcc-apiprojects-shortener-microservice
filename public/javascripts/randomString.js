module.exports = function(val) {
	if(!isNaN(val)) {
		var list = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var randomed = '';

		while(randomed.length < val) {
  			randomed += list.charAt(Math.floor((Math.random() * (list.length - 1)) + 1));
		}
		return randomed;
	}
	return;
}
