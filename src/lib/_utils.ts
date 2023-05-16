function isDict(dict: {}) {
	return dict === Object(dict) && typeof dict !== 'function' && !Array.isArray(dict);
}
export { isDict };
