import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:flutternote/site/router.dart';
import 'package:flutternote/site/theme.dart';
import 'package:web/web.dart' as web;

void main() async {
  // URLからハッシュを削除
  usePathUrlStrategy();

  // OFL を守るために このコードが必要
  LicenseRegistry.addLicense(() async* {
    final license = await rootBundle.loadString('google_fonts/OFL.txt');
    yield LicenseEntryWithLineBreaks(['google_fonts'], license);
  });

  const app = MyApp();
  const scope = ProviderScope(child: app);
  runApp(scope);

  // HTML のローディング画面をフェードアウトして削除
  final loading = web.document.getElementById('loading');
  if (loading != null) {
    loading.classList.add('fade-out');
    await Future<void>.delayed(const Duration(milliseconds: 400));
    loading.remove();
  }
}

/// アプリ本体（常にライトテーマ）
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Flutter 講座',
      theme: buildLightTheme(),
      themeMode: ThemeMode.light,
      routerConfig: router,
    );
  }
}
