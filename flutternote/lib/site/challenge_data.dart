/// 各講座のメタデータ（説明文 + コードチャレンジ）

class LessonMeta {
  const LessonMeta({
    required this.description,
    required this.keyPoints,
    this.challenge,
  });
  final String description;
  final List<String> keyPoints;
  final CodeChallenge? challenge;
}

class CodeChallenge {
  const CodeChallenge({
    required this.instruction,
    required this.codeTemplate,
    required this.answer,
    required this.hint,
  });
  final String instruction;
  final String codeTemplate; // ___ をブランクとして使用
  final String answer;
  final String hint;
}

// ─────────────────────────────────────────
// 入門シリーズ（32本）
// ─────────────────────────────────────────

const introLessons = <int, LessonMeta>{
  // Part 01 - 環境構築
  0: LessonMeta(
    description: 'Flutter SDK のインストールと VSCode の設定を行います。'
        '開発環境を整えて、最初のプロジェクトを作成する準備をしましょう。',
    keyPoints: ['Flutter SDK', 'VSCode', 'Chrome', 'エミュレータ'],
  ),
  // Part 02 - 基本ウィジェット
  1: LessonMeta(
    description: 'Flutter の UI は「ウィジェット」の組み合わせで作ります。'
        '最も基本的な Text・Center・Scaffold・MaterialApp を学びましょう。',
    keyPoints: ['Text', 'Center', 'Scaffold', 'MaterialApp'],
    challenge: CodeChallenge(
      instruction: '文字を表示するウィジェットの名前を入れてください',
      codeTemplate: "Center(\n  child: ___('Hello World'),\n)",
      answer: 'Text',
      hint: '文字列を画面に表示するための基本ウィジェットです',
    ),
  ),
  // Part 03 - Column, Row
  2: LessonMeta(
    description: 'ウィジェットを縦に並べる Column、横に並べる Row。'
        'Flutter レイアウトの基本中の基本です。',
    keyPoints: ['Column', 'Row', 'children', 'レイアウト'],
    challenge: CodeChallenge(
      instruction: 'ウィジェットを縦に並べるウィジェット名を入れてください',
      codeTemplate:
          "___(\n  children: [\n    Text('A'),\n    Text('B'),\n  ],\n)",
      answer: 'Column',
      hint: '「列」を意味する英単語です',
    ),
  ),
  // Part 04 - Image
  3: LessonMeta(
    description: '画像を表示する方法を学びます。'
        'アセットに画像を追加し、Image ウィジェットで表示しましょう。',
    keyPoints: ['Image', 'AssetImage', 'pubspec.yaml', 'assets'],
    challenge: CodeChallenge(
      instruction: 'アセット画像を表示するコンストラクタを入れてください',
      codeTemplate: "___('assets/images/photo.png')",
      answer: 'Image.asset',
      hint: 'Image クラスの名前付きコンストラクタです',
    ),
  ),
  // Part 05 - Container
  4: LessonMeta(
    description: '背景色・余白・角丸・影など、装飾を加えるための万能ウィジェット。'
        'Container を使いこなすとデザインの幅が広がります。',
    keyPoints: ['Container', 'padding', 'margin', 'decoration'],
    challenge: CodeChallenge(
      instruction: '装飾・サイズ指定ができる万能ウィジェット名を入れてください',
      codeTemplate:
          "___(\n  color: Colors.blue,\n  padding: EdgeInsets.all(16),\n  child: Text('Hello'),\n)",
      answer: 'Container',
      hint: '「入れ物」を意味する英単語です',
    ),
  ),
  // Part 06 - StatelessWidget
  5: LessonMeta(
    description: '自分だけのウィジェットを作る方法を学びます。'
        'StatelessWidget を継承して再利用可能なコンポーネントを作りましょう。',
    keyPoints: ['StatelessWidget', 'import', 'カスタムウィジェット'],
    challenge: CodeChallenge(
      instruction: '状態を持たないカスタムウィジェットの基底クラス名を入れてください',
      codeTemplate: "class MyWidget extends ___ {\n  // ...\n}",
      answer: 'StatelessWidget',
      hint: 'Stateless (状態なし) + Widget の組み合わせです',
    ),
  ),
  // Part 07 - ElevatedButton
  6: LessonMeta(
    description: 'ボタンの使い方と関数の書き方を学びます。'
        'ElevatedButton でタップに反応する UI を作りましょう。',
    keyPoints: ['ElevatedButton', 'TextButton', 'onPressed', '関数'],
    challenge: CodeChallenge(
      instruction: '立体的なボタンのウィジェット名を入れてください',
      codeTemplate:
          "___(\n  onPressed: () { print('tap!'); },\n  child: Text('押す'),\n)",
      answer: 'ElevatedButton',
      hint: 'Elevated (浮き上がった) + Button です',
    ),
  ),
  // Part 08 - TextField
  7: LessonMeta(
    description: 'ユーザーからテキスト入力を受け取る方法を学びます。'
        'TextEditingController で入力値を管理しましょう。',
    keyPoints: ['TextField', 'TextEditingController', 'ユーザー入力'],
    challenge: CodeChallenge(
      instruction: 'テキスト入力欄のウィジェット名を入れてください',
      codeTemplate: "___(\n  controller: myController,\n  decoration: InputDecoration(\n    hintText: '入力してください',\n  ),\n)",
      answer: 'TextField',
      hint: 'Text + Field（入力欄）の組み合わせです',
    ),
  ),
  // Part 09 - Riverpod
  8: LessonMeta(
    description: 'Flutter で最も人気の状態管理パッケージ Riverpod を学びます。'
        'ConsumerWidget でプロバイダーの値を取得しましょう。',
    keyPoints: ['Riverpod', 'ConsumerWidget', 'Provider', '状態管理'],
    challenge: CodeChallenge(
      instruction: 'Riverpod でプロバイダーを使うウィジェットの基底クラス名を入れてください',
      codeTemplate:
          "class MyPage extends ___ {\n  Widget build(context, ref) {\n    final value = ref.watch(myProvider);\n  }\n}",
      answer: 'ConsumerWidget',
      hint: 'Consumer (消費者) + Widget です',
    ),
  ),
  // Part 10 - ListView
  9: LessonMeta(
    description: 'リスト表示の定番パターンを学びます。'
        'ListView.builder で効率的にスクロールリストを構築しましょう。',
    keyPoints: ['ListView', 'ListView.builder', 'itemBuilder', 'スクロール'],
    challenge: CodeChallenge(
      instruction: 'アイテムを効率的に生成するリストのコンストラクタ名を入れてください',
      codeTemplate:
          "___(\n  itemCount: items.length,\n  itemBuilder: (context, index) {\n    return Text(items[index]);\n  },\n)",
      answer: 'ListView.builder',
      hint: 'ListView の名前付きコンストラクタです',
    ),
  ),
  // Part 11 - go_router
  10: LessonMeta(
    description: '画面遷移の仕組みを学びます。'
        'go_router パッケージで宣言的にルーティングを設定しましょう。',
    keyPoints: ['go_router', 'GoRoute', 'context.go', '画面遷移'],
    challenge: CodeChallenge(
      instruction: 'ルーティング設定のクラス名を入れてください',
      codeTemplate:
          "final router = ___(\n  routes: [\n    GoRoute(path: '/', builder: ...),\n  ],\n);",
      answer: 'GoRouter',
      hint: 'Go + Router の組み合わせです',
    ),
  ),
  // Part 12 - Drawer
  11: LessonMeta(
    description: 'サイドメニュー（Drawer）の作り方を学びます。'
        'ハンバーガーメニューからスライドで開くナビゲーションです。',
    keyPoints: ['Drawer', 'DrawerHeader', 'Scaffold', 'サイドメニュー'],
    challenge: CodeChallenge(
      instruction: 'サイドメニューのウィジェット名を入れてください',
      codeTemplate: "Scaffold(\n  drawer: ___(\n    child: ListView(...),\n  ),\n)",
      answer: 'Drawer',
      hint: '引き出しを意味する英単語です',
    ),
  ),
  // Part 13 - BottomNavigationBar
  12: LessonMeta(
    description: '画面下部にタブバーを配置する方法を学びます。'
        'BottomNavigationBar で複数画面を切り替えましょう。',
    keyPoints: ['BottomNavigationBar', '下タブ', 'currentIndex'],
    challenge: CodeChallenge(
      instruction: '下部タブバーのウィジェット名を入れてください',
      codeTemplate: "Scaffold(\n  bottomNavigationBar: ___(\n    items: [...],\n  ),\n)",
      answer: 'BottomNavigationBar',
      hint: 'Bottom + Navigation + Bar です',
    ),
  ),
  // Part 14 - Switch, Slider
  13: LessonMeta(
    description: 'トグルスイッチとスライダーの使い方を学びます。'
        'ON/OFF 切り替えや数値調整の UI を作りましょう。',
    keyPoints: ['Switch', 'Slider', 'トグルスイッチ'],
    challenge: CodeChallenge(
      instruction: 'ON/OFF を切り替えるウィジェット名を入れてください',
      codeTemplate: "___(\n  value: isOn,\n  onChanged: (v) => setState(() => isOn = v),\n)",
      answer: 'Switch',
      hint: 'スイッチを意味する英単語です',
    ),
  ),
  // Part 15 - Checkbox, Radio
  14: LessonMeta(
    description: 'チェックボックスとラジオボタンの使い方を学びます。'
        '複数選択・単一選択の UI パターンを身につけましょう。',
    keyPoints: ['Checkbox', 'Radio', '選択UI'],
    challenge: CodeChallenge(
      instruction: 'チェックマーク付きの選択ボックスの名前を入れてください',
      codeTemplate: "___(\n  value: isChecked,\n  onChanged: (v) => setState(() => isChecked = v!),\n)",
      answer: 'Checkbox',
      hint: 'Check + Box の組み合わせです',
    ),
  ),
  // Part 16 - Progress Indicator
  15: LessonMeta(
    description: 'ローディング表示を作る方法を学びます。'
        '円形・線形のプログレスインジケーターを使い分けましょう。',
    keyPoints: ['CircularProgressIndicator', 'LinearProgressIndicator'],
    challenge: CodeChallenge(
      instruction: '円形のローディング表示のウィジェット名を入れてください',
      codeTemplate: "const ___(),",
      answer: 'CircularProgressIndicator',
      hint: 'Circular (円形) + Progress + Indicator です',
    ),
  ),
  // Part 17 - freezed
  16: LessonMeta(
    description: 'データクラスを安全に定義する freezed パッケージを学びます。'
        'immutable なモデルクラスをコード生成で作りましょう。',
    keyPoints: ['freezed', 'immutable', 'コード生成', 'class'],
    challenge: CodeChallenge(
      instruction: 'freezed でデータクラスを定義するアノテーションを入れてください',
      codeTemplate: "___\nclass User with _\$User {\n  factory User({required String name}) = _User;\n}",
      answer: '@freezed',
      hint: '@から始まるアノテーション（注釈）です',
    ),
  ),
  // Part 18 - PageView
  17: LessonMeta(
    description: 'スワイプで切り替えるカルーセル UI を学びます。'
        'PageView で影や角丸を使ったカード型レイアウトを作りましょう。',
    keyPoints: ['PageView', 'カルーセル', '影', '角丸'],
    challenge: CodeChallenge(
      instruction: 'スワイプでページ送りできるウィジェット名を入れてください',
      codeTemplate: "___(\n  children: [\n    Card(child: Text('Page 1')),\n    Card(child: Text('Page 2')),\n  ],\n)",
      answer: 'PageView',
      hint: 'Page + View の組み合わせです',
    ),
  ),
  // Part 19 - JSON
  18: LessonMeta(
    description: 'JSON データの扱い方を学びます。'
        'API レスポンスなどの JSON をDart オブジェクトに変換する方法です。',
    keyPoints: ['JSON', 'jsonDecode', 'fromJson', 'toJson'],
  ),
  // Part 20 - Google Fonts
  19: LessonMeta(
    description: 'アプリにカスタムフォントを適用する方法を学びます。'
        'google_fonts パッケージでおしゃれな書体を使いましょう。',
    keyPoints: ['GoogleFonts', 'フォント', 'ライセンス'],
    challenge: CodeChallenge(
      instruction: 'Google Fonts のテキストスタイルを取得するクラス名を入れてください',
      codeTemplate: "Text(\n  'バナナ美味しい',\n  style: ___.hachiMaruPop(fontSize: 30),\n)",
      answer: 'GoogleFonts',
      hint: 'Google + Fonts の組み合わせです',
    ),
  ),
  // Part 21 - フレーバー
  20: LessonMeta(
    description: '開発・ステージング・本番の環境を切り替える方法を学びます。'
        'フレーバー機能で安全にデプロイ先を管理しましょう。',
    keyPoints: ['フレーバー', 'Dev/Stg/Prd', 'if文', '環境切り替え'],
  ),
  // Part 22 - ExpansionTile
  21: LessonMeta(
    description: 'タップで展開するアコーディオン UI を学びます。'
        'ExpansionTile でコンテンツを折りたたみ表示しましょう。',
    keyPoints: ['ExpansionTile', 'コンストラクタ', '引数'],
    challenge: CodeChallenge(
      instruction: 'タップで展開するウィジェット名を入れてください',
      codeTemplate: "___(\n  title: Text('詳細を見る'),\n  children: [Text('内容')],\n)",
      answer: 'ExpansionTile',
      hint: 'Expansion (展開) + Tile です',
    ),
  ),
  // Part 23 - Firebase
  22: LessonMeta(
    description: 'Firebase の導入方法を学びます。'
        'FlutterFire CLI で初期化し、Analytics を設定しましょう。',
    keyPoints: ['Firebase', 'CLI', 'Analytics', 'FlutterFire'],
    challenge: CodeChallenge(
      instruction: 'Firebase を初期化する関数名を入れてください',
      codeTemplate: "void main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n  await ___();\n  runApp(MyApp());\n}",
      answer: 'Firebase.initializeApp',
      hint: 'Firebase クラスのメソッドです',
    ),
  ),
  // Part 24 - Authentication
  23: LessonMeta(
    description: 'Firebase Authentication でユーザー認証を実装します。'
        'メール・Google・匿名サインインを組み合わせましょう。',
    keyPoints: ['Authentication', 'サインイン', '認証プロバイダー'],
    challenge: CodeChallenge(
      instruction: 'Firebase 認証のインスタンスを取得するクラス名を入れてください',
      codeTemplate: "final auth = ___.instance;\nawait auth.signInAnonymously();",
      answer: 'FirebaseAuth',
      hint: 'Firebase + Auth の組み合わせです',
    ),
  ),
  // Part 25 - レスポンシブ
  24: LessonMeta(
    description: 'デバイスごとに UI を最適化する方法を学びます。'
        'device_preview とブレークポイントでレスポンシブデザインを実現しましょう。',
    keyPoints: ['device_preview', 'レスポンシブデザイン', 'ブレークポイント'],
    challenge: CodeChallenge(
      instruction: 'デバイスプレビューを有効にするウィジェット名を入れてください',
      codeTemplate: "runApp(\n  ___.appBuilder(\n    builder: (context) => MyApp(),\n  ),\n);",
      answer: 'DevicePreview',
      hint: 'Device + Preview の組み合わせです',
    ),
  ),
  // Part 26 - DropdownButton
  25: LessonMeta(
    description: 'ドロップダウン選択の UI を学びます。'
        'Dart 3 の switch 式と組み合わせてスマートに実装しましょう。',
    keyPoints: ['DropdownButton', 'Dart3', 'switch式'],
    challenge: CodeChallenge(
      instruction: 'ドロップダウンメニューのウィジェット名を入れてください',
      codeTemplate: "___(\n  value: selectedItem,\n  items: [...],\n  onChanged: (v) {},\n)",
      answer: 'DropdownButton',
      hint: 'Dropdown + Button の組み合わせです',
    ),
  ),
  // Part 27 - envied
  26: LessonMeta(
    description: 'API キーなどの秘密情報を安全に管理する方法を学びます。'
        'envied パッケージで .env ファイルから値を読み込みましょう。',
    keyPoints: ['envied', '秘密情報', '.env', 'API キー'],
    challenge: CodeChallenge(
      instruction: 'envied で環境変数を読み込むアノテーションを入れてください',
      codeTemplate: "___\nabstract class Env {\n  @EnviedField(varName: 'API_KEY')\n  static const String apiKey = _Env.apiKey;\n}",
      answer: '@Envied',
      hint: '@から始まるアノテーション（注釈）です',
    ),
  ),
  // Part 28 - Stack
  27: LessonMeta(
    description: 'ウィジェットを重ねて配置する方法を学びます。'
        'Stack と Positioned ではみ出しや重なりを表現しましょう。',
    keyPoints: ['Stack', 'Positioned', 'Align', '重なり'],
    challenge: CodeChallenge(
      instruction: 'ウィジェットを重ねて配置するウィジェット名を入れてください',
      codeTemplate: "___(\n  children: [\n    Image.asset('bg.png'),\n    Positioned(\n      top: 10,\n      child: Text('重ねる'),\n    ),\n  ],\n)",
      answer: 'Stack',
      hint: '「積み重ね」を意味する英単語です',
    ),
  ),
  // Part 29 - AlertDialog
  28: LessonMeta(
    description: 'ダイアログ（ポップアップ）を表示する方法を学びます。'
        'showDialog で確認画面やアラートを実装しましょう。',
    keyPoints: ['AlertDialog', 'showDialog', 'ダイアログ'],
    challenge: CodeChallenge(
      instruction: 'ダイアログを表示する関数名を入れてください',
      codeTemplate: "___(\n  context: context,\n  builder: (context) => AlertDialog(\n    title: Text('確認'),\n  ),\n);",
      answer: 'showDialog',
      hint: 'show + Dialog の組み合わせです',
    ),
  ),
  // Part 30 - SharedPreferences
  29: LessonMeta(
    description: 'アプリにデータを永続的に保存する方法を学びます。'
        'shared_preferences でキー・バリュー形式のデータを扱いましょう。',
    keyPoints: ['shared_preferences', 'データ永続化', 'KV'],
    challenge: CodeChallenge(
      instruction: 'ローカルストレージのインスタンスを取得するクラス名を入れてください',
      codeTemplate: "final prefs = await ___.getInstance();\nprefs.setString('key', 'value');",
      answer: 'SharedPreferences',
      hint: 'Shared + Preferences の組み合わせです',
    ),
  ),
  // Part 31 - Firestore
  30: LessonMeta(
    description: 'クラウドデータベース Firestore の使い方を学びます。'
        'CRUD 操作とセキュリティルールで本格的なデータ管理を実装しましょう。',
    keyPoints: ['Firestore', 'CRUD', 'セキュリティルール', 'データベース'],
    challenge: CodeChallenge(
      instruction: 'Firestore のインスタンスを取得するクラス名を入れてください',
      codeTemplate: "final db = ___.instance;\ndb.collection('users').add({'name': 'Taro'});",
      answer: 'FirebaseFirestore',
      hint: 'Firebase + Firestore の組み合わせです',
    ),
  ),
  // Part 32 - DateTime
  31: LessonMeta(
    description: '日時の扱い方とタイマー機能を学びます。'
        'DateTime と ISO8601 形式で日付を正しく管理しましょう。',
    keyPoints: ['DateTime', 'ISO8601', 'タイマー', 'intl'],
    challenge: CodeChallenge(
      instruction: '現在の日時を取得するコンストラクタを入れてください',
      codeTemplate: "final now = ___;\nprint(now.toIso8601String());",
      answer: 'DateTime.now()',
      hint: 'DateTime の名前付きコンストラクタです',
    ),
  ),
};

// ─────────────────────────────────────────
// スペシャルシリーズ（14本）
// ─────────────────────────────────────────

const specialLessons = <int, LessonMeta>{
  // Riverpod 01
  0: LessonMeta(
    description: 'Riverpod の基本ウィジェット群を学びます。'
        'ConsumerWidget と HookConsumerWidget の使い分けをマスターしましょう。',
    keyPoints: ['ConsumerWidget', 'HookConsumerWidget', 'riverpod_hooks'],
    challenge: CodeChallenge(
      instruction: 'Riverpod の状態を参照できるウィジェットの基底クラス名を入れてください',
      codeTemplate: "class MyWidget extends ___ {\n  Widget build(context, WidgetRef ref) {\n    return Text('ここにデータが入ります');\n  }\n}",
      answer: 'ConsumerWidget',
      hint: 'Consumer + Widget の組み合わせです',
    ),
  ),
  // Riverpod 02
  1: LessonMeta(
    description: 'Riverpod のコード生成 (riverpod_generator) を学びます。'
        'Provider や AsyncNotifier を自動生成で定義する方法です。',
    keyPoints: ['riverpod_generator', 'Provider', 'AsyncNotifier'],
  ),
  // Riverpod 03
  2: LessonMeta(
    description: 'ref の3つのメソッド watch / read / listen を学びます。'
        'AsyncValue でローディング・エラー状態を安全に扱いましょう。',
    keyPoints: ['watch', 'read', 'listen', 'AsyncValue'],
    challenge: CodeChallenge(
      instruction: 'プロバイダーの値をリアクティブに監視するメソッド名を入れてください',
      codeTemplate: "Widget build(context, ref) {\n  final value = ref.___( myProvider );\n  return Text('\$value');\n}",
      answer: 'watch',
      hint: '「監視する」を意味する英単語です',
    ),
  ),
  // Riverpod 04
  3: LessonMeta(
    description: 'Riverpod の応用テクニックを学びます。'
        'Notifier で状態管理し、プロキシプロバイダーで合成しましょう。',
    keyPoints: ['Notifier', 'ProxyProvider', 'ref.watch'],
    challenge: CodeChallenge(
      instruction: '状態を管理するクラスの基底クラス名を入れてください',
      codeTemplate: "class P1Notifier extends ___ {\n  @override\n  String build() => 'み';\n  void update(String v) => state = v;\n}",
      answer: 'Notifier',
      hint: '通知する人、の意味の英単語です',
    ),
  ),
  // Hooks 入門
  4: LessonMeta(
    description: 'Flutter Hooks の基本を学びます。'
        'useState / useEffect / カスタム Hook でステート管理をシンプルに。',
    keyPoints: ['HookWidget', 'useState', 'useEffect', 'カスタムHook'],
    challenge: CodeChallenge(
      instruction: 'Hooks を使うウィジェットの基底クラス名を入れてください',
      codeTemplate: "class Counter extends ___ {\n  Widget build(context) {\n    final count = useState(0);\n  }\n}",
      answer: 'HookWidget',
      hint: 'Hook + Widget の組み合わせです',
    ),
  ),
  // VSCode 便利機能集
  5: LessonMeta(
    description: 'VSCode の便利なショートカットと拡張機能を紹介します。'
        'スニペットやキーボードショートカットで開発効率アップ。',
    keyPoints: ['スニペット', 'ショートカット', '拡張機能'],
  ),
  // フォルダ構成
  6: LessonMeta(
    description: 'Flutter プロジェクトのフォルダ構成を学びます。'
        'レイヤードアーキテクチャで保守性の高いコードを書きましょう。',
    keyPoints: ['アーキテクチャ', 'レイヤー', 'フォルダ構成'],
  ),
  // 状態管理とは
  7: LessonMeta(
    description: '状態管理の概念をゼロから解説します。'
        '宣言型 UI、Redux パターン、プロバイダーの仕組みを理解しましょう。',
    keyPoints: ['状態管理', '宣言型', 'Redux', 'プロバイダー'],
  ),
  // 非同期コード
  8: LessonMeta(
    description: '非同期処理の書き方を学びます。'
        'async / await / Future で API 通信やデータ読み込みを処理しましょう。',
    keyPoints: ['async', 'await', 'Future'],
  ),
  // WebSocket
  9: LessonMeta(
    description: 'WebSocket を使ったリアルタイム通信を学びます。'
        'HTTP との違いとハンドシェイクの仕組みを理解しましょう。',
    keyPoints: ['WebSocket', 'HTTP', 'ハンドシェイク', 'リアルタイム'],
  ),
  // pixel_color_image
  10: LessonMeta(
    description: '画像からピクセルの色を取得する方法を学びます。'
        'pixel_color_image パッケージでカラーピッカーを実装しましょう。',
    keyPoints: ['pixel_color_image', 'カラーピッカー'],
  ),
  // Q&A 01
  11: LessonMeta(
    description: '視聴者からの質問に回答するコーナーです。'
        'Push & Pop、コントローラー、BuildContext について解説します。',
    keyPoints: ['Push&Pop', 'コントローラー', 'コンテキスト'],
  ),
  // AR
  12: LessonMeta(
    description: 'AR（拡張現実）の開発について学びます。'
        'ARKit と Vision Pro の基礎知識を解説します。',
    keyPoints: ['AR', 'ARKit', 'Vision Pro', 'ARCore'],
  ),
  // Nintendo Clone
  13: LessonMeta(
    description: '「My ニンテンドー」アプリの UI をクローンします。'
        '実在するアプリを再現することで実践的な UI 構築を学びましょう。',
    keyPoints: ['UI クローン', 'BottomNavigationBar', 'デザイン再現'],
  ),
  // Clash Royale Clone
  14: LessonMeta(
    description: '「クラッシュ・ロワイヤル」のゲーム UI をクローンします。'
        'カスタムタブバーや PageController で複雑な UI を構築しましょう。',
    keyPoints: ['ゲーム UI', 'PageController', 'カスタムタブ'],
  ),
};
