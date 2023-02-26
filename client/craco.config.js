const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const enableAnalyze = false//process.argv.includes("--analyze")

const ignoreComponentsToTest = [
	"ErrorBoundary.tsx",
	"App.tsx",
	"src/index.tsx"
]

module.exports = {
	webpack: {
		alias: {
			"@api": path.resolve(__dirname, "src/api"),
			"@models": path.resolve(__dirname, "src/models"),
			"@routes": path.resolve(__dirname, "src/routes"),
			"@redux": path.resolve(__dirname, "src/redux"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@layouts": path.resolve(__dirname, "src/layouts"),
			"@components": path.resolve(__dirname, "src/components"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@mocks": path.resolve(__dirname, "src/mocks"),
			"@src": path.resolve(__dirname, "src"),
		},
		plugins: {
			add: [
				new CompressionPlugin({
					filename: "[path].[name].gz[query]",
					algorithm: "gzip",
					test: /\.(js|css|html|svg|png|jpg|jpeg|gif|webp|avif)$/,
					threshold: 8192,
					minRatio: 0.8
				}),
				new BundleAnalyzerPlugin({
					analyzerMode: enableAnalyze ? "static" : "disabled",
					reportFilename: "report.html"
				})
			]
		}
	},
	jest: {
		configure: {
			testEnvironment: 'jsdom',
			setupFiles: ["<rootDir>/src/setupTest.ts"],
			setupFilesAfterEnv: [
				"@testing-library/jest-dom/extend-expect"
			],
			moduleNameMapper: {
				"@api(.*)": "<rootDir>/src/api/$1",
				"axios": "<rootDir>/node_modules/axios/dist/node/axios.cjs",
				"@models(.*)": "<rootDir>/src/models/$1",
				"@routes(.*)": "<rootDir>/src/routes/$1",
				"@reduxjs(.*)": "<rootDir>/node_modules/@reduxjs/$1",
				"@redux(.*)": "<rootDir>/src/redux/$1",
				"@pages(.*)": "<rootDir>/src/pages/$1",
				"@layouts(.*)": "<rootDir>/src/layouts/$1",
				"@components(.*)": "<rootDir>/src/components/$1",
				"@hooks(.*)": "<rootDir>/src/hooks/$1",
				"@utils(.*)": "<rootDir>/src/utils/$1",
				"@assets(.*)": "<rootDir>/src/assets/$1",
				"@mocks(.*)": "<rootDir>/src/mocks/$1",
				"@src(.*)": "<rootDir>/src/$1",
			},
			transform: {
				[`^(axios).+\\.js$`]: "babel-jest",
			},
			coveragePathIgnorePatterns: [
				"<rootDir>/src/api/",
				"<rootDir>/src/redux/",
				"<rootDir>/src/models/",
				"<rootDir>/src/routes/",
				"<rootDir>/src/mocks/",
				"<rootDir>/src/theme/",
				"<rootDir>/src/pages/ComponentTesting",
				"<rootDir>/src/registerServiceWorker.ts",
				"<rootDir>/src/reportWebVitals.ts",
				"<rootDir>/src/setupProxy.js",
				...ignoreComponentsToTest
			],
			transformIgnorePatterns: ["/node_modules/(?!(axios|react-datepicker)/)"],
			testResultsProcessor: "jest-sonar-reporter",
		}
	}
}