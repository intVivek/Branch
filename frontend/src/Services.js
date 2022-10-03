const baseUrl = 'http://localhost:5000';

export function login (body) {
	return callPost(baseUrl + '/login', body);
}

export function register (body) {
	return callPost(baseUrl + '/register', body);
}

const callGet = (url) => {
	return fetch(url).then(handleres);
};


const callPost = (url, body) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	}).then(handleres);
};

const handleres = (res) => {
	if (res.ok) {
		return res.json();
	}
	else {
		if (res.status === 404) {
			return Promise.reject();
		} else {
			throw res.json();
		}
	}
};
