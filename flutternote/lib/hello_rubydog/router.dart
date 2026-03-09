import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:banana/hello_rubydog/shell.dart';
import 'package:banana/hello_rubydog/home.dart';
import 'package:banana/hello_rubydog/lecture_list_page.dart';
import 'package:banana/hello_rubydog/video_detail_page.dart';
import 'package:banana/hello_rubydog/nomal_videos.dart';
import 'package:banana/hello_rubydog/special_videos.dart';

final router = GoRouter(
  routes: [
    ShellRoute(
      builder: (context, state, child) => AppShell(child: child),
      routes: [
        GoRoute(
          path: '/',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: HomePage(),
          ),
        ),
        GoRoute(
          path: '/intro',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: LectureListPage(category: LectureCategory.intro),
          ),
          routes: [
            GoRoute(
              path: ':index',
              pageBuilder: (context, state) {
                final index =
                    int.tryParse(state.pathParameters['index'] ?? '') ?? 0;
                final videos = nomalVideos;
                if (index < 0 || index >= videos.length) {
                  return const NoTransitionPage(child: _NotFoundPage());
                }
                return NoTransitionPage(
                  child: VideoDetailPage(
                    key: ValueKey('intro-$index'),
                    video: videos[index],
                    category: LectureCategory.intro,
                    currentIndex: index,
                    totalCount: videos.length,
                  ),
                );
              },
            ),
          ],
        ),
        GoRoute(
          path: '/special',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: LectureListPage(category: LectureCategory.special),
          ),
          routes: [
            GoRoute(
              path: ':index',
              pageBuilder: (context, state) {
                final index =
                    int.tryParse(state.pathParameters['index'] ?? '') ?? 0;
                final videos = specialVideos;
                if (index < 0 || index >= videos.length) {
                  return const NoTransitionPage(child: _NotFoundPage());
                }
                return NoTransitionPage(
                  child: VideoDetailPage(
                    key: ValueKey('special-$index'),
                    video: videos[index],
                    category: LectureCategory.special,
                    currentIndex: index,
                    totalCount: videos.length,
                  ),
                );
              },
            ),
          ],
        ),
      ],
    ),
  ],
);

class _NotFoundPage extends StatelessWidget {
  const _NotFoundPage();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(64),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'ページが見つかりません',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go('/'),
              child: const Text('ホームに戻る'),
            ),
          ],
        ),
      ),
    );
  }
}
