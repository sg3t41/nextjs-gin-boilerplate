import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/**
 * 各設定プロパティの詳細については以下のリンクを参照してください:
 * https://jestjs.io/docs/configuration
 */
const config: Config = {
  // テストでインポートされたすべてのモジュールを自動的にモックするかどうか
  // automock: false,

  // `n` 回失敗した後にテストの実行を停止する
  // bail: 0,

  // Jestが依存関係の情報をキャッシュするディレクトリ
  // cacheDirectory: "/tmp/jest_rs",

  // 各テストの前にモックの呼び出し、インスタンス、コンテキスト、および結果を自動的にクリアする
  clearMocks: true,

  // テストの実行中にカバレッジ情報を収集するかどうか
  collectCoverage: true,

  // カバレッジ情報を収集するためのファイルセットを示すグロブパターンの配列
  // collectCoverageFrom: undefined,

  // Jestがカバレッジファイルを出力するディレクトリ
  coverageDirectory: 'coverage',

  // カバレッジ収集をスキップするために使用される正規表現パターンの配列
  coveragePathIgnorePatterns: ['/node_modules/'],

  // カバレッジの収集に使用されるプロバイダを指定する
  coverageProvider: 'v8',

  // カバレッジレポート作成時に使用するレポータの名前リスト
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // カバレッジ結果の最小しきい値を設定するオブジェクト
  // coverageThreshold: undefined,

  // カスタム依存関係エクストラクターへのパス
  // dependencyExtractor: undefined,

  // 廃止予定のAPIを呼び出すときにエラーメッセージを表示するかどうか
  // errorOnDeprecated: false,

  // フェイクタイマーのデフォルト設定
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // 無視されたファイルからカバレッジ収集を強制するためのグロブパターンの配列
  // forceCoverageMatch: [],

  // すべてのテストスイートの前に1回だけトリガーされる非同期関数をエクスポートするモジュールへのパス
  // globalSetup: undefined,

  // すべてのテストスイートの後に1回だけトリガーされる非同期関数をエクスポートするモジュールへのパス
  // globalTeardown: undefined,

  // すべてのテスト環境で利用可能である必要があるグローバル変数のセット
  // globals: {},

  // テストを実行するために使用される最大ワーカー数。％または数値で指定可能。
  // maxWorkers: "50%",

  // 必要なモジュールの場所から再帰的に検索されるディレクトリ名の配列
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // 	使用されるモジュールのファイル拡張子の配列
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // 正規表現からモジュール名またはモジュール名の配列へのマッピング
  // moduleNameMapper: {},

  // モジュールローダーに「見える」と見なされる前に、すべてのモジュールパスに対して一致する正規表現パターンの配列
  // modulePathIgnorePatterns: [],

  // テスト結果の通知を有効にするかどうか
  // notify: false,

  // 通知モードを指定する。{ notify: true }が必要
  // notifyMode: "failure-change",

  // Jestの設定のベースとして使用されるプリセット
  // preset: undefined,

  // 1つ以上のプロジェクトからテストを実行する
  // projects: undefined,

  // Jestにカスタムレポーターを追加するための設定オプション
  // reporters: undefined,

  // 各テストの前にモック状態をリセットするかどうか
  // resetMocks: false,

  // 各テストの前にモジュールレジストリをリセットする
  // resetModules: false,

  // カスタムリゾルバーへのパス
  // resolver: undefined,

  // 各テストの前にモック状態と実装を自動的に復元するかどうか
  // restoreMocks: false,

  // Jestがテストとモジュールをスキャンするルートディレクトリ
  // rootDir: undefined,

  // Jestがファイルの検索に使用するディレクトリのパスリスト
  // roots: [
  //   "<rootDir>"
  // ],

  // Jestのデフォルトのテストランナーの代わりに使用するカスタムランナー
  // runner: "jest-runner",

  // 各テストの前にテスト環境を構成または設定するためにコードを実行するモジュールのパス
  // setupFiles: [],

  // 各テストの前にテストフレームワークを構成または設定するためにコードを実行するモジュールのパスリスト
  // setupFilesAfterEnv: [],

  // テストが遅いと見なされ、結果でそのように報告される秒数
  // slowTestThreshold: 5,

  // Jestがスナップショットテストで使用するスナップショットシリアライザーモジュールのパスリスト
  // snapshotSerializers: [],

  // テストで使用されるテスト環境
  testEnvironment: 'jsdom',

  // testEnvironmentに渡されるオプション
  // testEnvironmentOptions: {},

  // テスト結果に位置フィールドを追加するかどうか
  // testLocationInResults: false,

  // Jestがテストファイルを検出するために使用するグロブパターン
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // すべてのテストパスに対して一致する正規表現パターンの配列、一致するテストはスキップされる
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jestがテストファイルを検出するために使用する正規表現パターンまたはパターンの配列
  // testRegex: [],

  // カスタム結果プロセッサを使用するためのオプション
  // testResultsProcessor: undefined,

  // カスタムテストランナーを使用するためのオプション
  // testRunner: "jest-circus/runner",

  // 正規表現からトランスフォーマーパスへのマッピング
  // transform: undefined,

  // すべてのソースファイルパスに対して一致する正規表現パターンの配列、一致するファイルは変換をスキップする
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // モジュールローダーが自動的にモックを返す前に、すべてのモジュールに対して一致する正規表現パターンの配列
  // unmockedModulePathPatterns: undefined,

  // 実行中の各テストを報告するかどうか
  // verbose: undefined,

  // ウォッチモードでテストを再実行する前にすべてのソースファイルパスに対して一致する正規表現パターンの配列
  // watchPathIgnorePatterns: [],

  // ファイルクロールにWatchmanを使用するかどうか
  // watchman: true,
}

export default createJestConfig(config)
