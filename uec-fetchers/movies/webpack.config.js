import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
	{
		entry: './movies.js',
		output: {
			path: path.resolve(__dirname, 'dist/movies'),
			filename: 'index.js',
		},
		target: 'node',
		devtool: 'source-map',
		plugins: [],
	},
	{
		entry: './showings.js',
		output: {
			path: path.resolve(__dirname, 'dist/showings'),
			filename: 'index.js',
			library: '[name]', 
			libraryTarget: 'commonjs2',
		},
		target: 'node',
		devtool: 'source-map',
		plugins: [],	
	},
]
