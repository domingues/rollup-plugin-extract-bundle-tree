const fs = require('fs');
const path = require('path');

function mkdirp(dir) {
	const parent = path.dirname(dir);
	if (parent===dir) return;

	mkdirp(parent);

	try {
		fs.mkdirSync(dir);
	} catch (err) {
		if (err.code!=='EEXIST') throw err;
	}
}

module.exports = function svelte(options = {}) {
	const defaultPluginOptions = {
		file: 'bundle-tree.json',
	};

	const pluginOptions = Object.assign({}, defaultPluginOptions);
	Object.keys(options).forEach(key => {
		if (!(key in defaultPluginOptions))
			throw new Error(`unknown option ${key}`);
		pluginOptions[key] = options[key];
	});

	return {
		name: 'bundle-tree',

		writeBundle(options, bundle = options) {
			const tree = {};
			for (const chunk of Object.values(bundle)) {
				const node = {};
				if (chunk.type === 'asset') {
					node.isAsset = true;
				} else {
					if (chunk.isEntry===true) {
						node.isEntry = true;
					}
					if (chunk.isDynamicEntry===true) {
						node.isDynamicEntry = true;
					}
					if (chunk.imports && chunk.imports.length>0) {
						node.imports = [...chunk.imports];
					}
					if (chunk.dynamicImports && chunk.dynamicImports.length>0) {
						node.dynamicImports = [...chunk.dynamicImports];
					}
				}
				tree[chunk.fileName] = node;
			}
			mkdirp(path.dirname(pluginOptions.file));
			fs.writeFileSync(pluginOptions.file, JSON.stringify(tree, null, '  '));
		}
	};
};
