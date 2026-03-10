import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutternote/site/theme.dart';
import 'package:flutternote/site/intro_videos.dart';
import 'package:flutternote/site/special_videos.dart';
import 'package:flutternote/site/video.dart';
import 'package:flutternote/site/widgets.dart';

enum LectureCategory {
  intro,
  special;

  String get label => switch (this) {
        LectureCategory.intro => '入門',
        LectureCategory.special => 'スペシャル',
      };

  String get basePath => switch (this) {
        LectureCategory.intro => '/intro',
        LectureCategory.special => '/special',
      };

  List<Video> get videos => switch (this) {
        LectureCategory.intro => introVideos,
        LectureCategory.special => specialVideos,
      };
}

/// 講座一覧ページ
class LectureListPage extends StatelessWidget {
  const LectureListPage({super.key, required this.category});
  final LectureCategory category;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;
    final videos = category.videos;

    int crossAxisCount;
    if (width < Breakpoints.sm) {
      crossAxisCount = 1;
    } else if (width < Breakpoints.md) {
      crossAxisCount = 2;
    } else if (width < Breakpoints.lg) {
      crossAxisCount = 3;
    } else {
      crossAxisCount = 4;
    }

    return Column(
      children: [
        _CategoryBanner(category: category),
        Container(
          color: AppColors.sky50,
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 16 : 40,
            vertical: isMobile ? 24 : 40,
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1200),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Text(
                      '全 ${videos.length} レッスン',
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppColors.gray500,
                      ),
                    ),
                  ),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: crossAxisCount,
                      crossAxisSpacing: 16,
                      mainAxisSpacing: 16,
                      childAspectRatio: 1.0,
                    ),
                    itemCount: videos.length,
                    itemBuilder: (context, index) {
                      return VideoCard(
                        video: videos[index],
                        onTap: () =>
                            context.go('${category.basePath}/$index'),
                      );
                    },
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _CategoryBanner extends StatelessWidget {
  const _CategoryBanner({required this.category});
  final LectureCategory category;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    final gradient = category == LectureCategory.intro
        ? const LinearGradient(
            colors: [AppColors.sky600, Color(0xFF3B5FD9)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          )
        : const LinearGradient(
            colors: [AppColors.indigo500, Color(0xFF7C3AED)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          );

    final icon = category == LectureCategory.intro
        ? Icons.school_rounded
        : Icons.auto_awesome_rounded;

    final description = category == LectureCategory.intro
        ? 'Flutter の基礎を一つずつ丁寧に。\nウィジェット、状態管理、Firebase まで。'
        : '応用テーマに挑戦。\nRiverpod 深堀り、アプリクローン、AR まで。';

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(gradient: gradient),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 24 : 40,
        vertical: isMobile ? 40 : 56,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 700),
          child: SelectionArea(
            child: Column(
              children: [
                Icon(icon,
                    size: 40, color: Colors.white.withValues(alpha: 0.9)),
                const SizedBox(height: 16),
                Text(
                  '${category.label}シリーズ',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: isMobile ? 28 : 36,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  description,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.85),
                    fontSize: 15,
                    height: 1.6,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
