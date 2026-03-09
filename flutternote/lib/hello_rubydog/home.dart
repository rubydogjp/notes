import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:banana/hello_rubydog/theme.dart';
import 'package:banana/hello_rubydog/nomal_videos.dart';
import 'package:banana/hello_rubydog/special_videos.dart';
import 'package:banana/hello_rubydog/widgets.dart';
import 'package:banana/hello_rubydog/lecture_list_page.dart';

/// ランディングページ
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        _HeroSection(),
        _FeaturesSection(),
        _LecturePreviewSection(
          title: '入門シリーズ',
          subtitle: 'Flutter の基礎を 32 本の動画で学ぶ',
          category: LectureCategory.intro,
        ),
        _LecturePreviewSection(
          title: 'スペシャル',
          subtitle: '応用テーマやアプリクローンに挑戦',
          category: LectureCategory.special,
        ),
        _CtaSection(),
      ],
    );
  }
}

// ─────────────────────────────────────────
// ヒーロー
// ─────────────────────────────────────────

class _HeroSection extends StatelessWidget {
  const _HeroSection();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.sky600, Color(0xFF3B5FD9)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Stack(
        children: [
          ..._buildDecorations(width),
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 800),
              child: Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: isMobile ? 24 : 40,
                  vertical: isMobile ? 64 : 96,
                ),
                child: SelectionArea(
                  child: Column(
                    children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.2),
                        ),
                      ),
                      child: const Center(
                        child: Text(
                          'F',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'Flutter 講座',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: isMobile ? 36 : 48,
                        fontWeight: FontWeight.w800,
                        height: 1.2,
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      '動画とコードで学ぶ Flutter 開発。\n入門から応用まで、全 46 本のレッスン。',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.85),
                        fontSize: isMobile ? 15 : 17,
                        height: 1.7,
                      ),
                    ),
                    const SizedBox(height: 36),
                    Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 12,
                      runSpacing: 12,
                      children: [
                        ElevatedButton(
                          onPressed: () => context.go('/intro/0'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: AppColors.sky700,
                          ),
                          child: const Text('入門を始める'),
                        ),
                        OutlinedButton(
                          onPressed: () => context.go('/special'),
                          child: const Text('スペシャルを見る'),
                        ),
                      ],
                    ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildDecorations(double screenWidth) {
    final items = <_Deco>[
      _Deco(left: screenWidth * 0.05, top: 30, size: 60, opacity: 0.08, rotation: 15),
      _Deco(right: screenWidth * 0.08, top: 50, size: 40, opacity: 0.06, rotation: -10),
      _Deco(left: screenWidth * 0.15, bottom: 40, size: 50, opacity: 0.07, rotation: 25),
      _Deco(right: screenWidth * 0.12, bottom: 60, size: 70, opacity: 0.05, rotation: -20),
      _Deco(left: screenWidth * 0.4, top: 20, size: 35, opacity: 0.06, rotation: 45),
      _Deco(right: screenWidth * 0.3, bottom: 30, size: 45, opacity: 0.04, rotation: -35),
    ];
    return items.map((d) => Positioned(
      left: d.left, right: d.right, top: d.top, bottom: d.bottom,
      child: Transform.rotate(
        angle: d.rotation * pi / 180,
        child: Container(
          width: d.size, height: d.size,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: d.opacity),
            borderRadius: BorderRadius.circular(d.size * 0.2),
          ),
        ),
      ),
    )).toList();
  }
}

class _Deco {
  final double? left, right, top, bottom;
  final double size, opacity, rotation;
  _Deco({this.left, this.right, this.top, this.bottom, required this.size, required this.opacity, required this.rotation});
}

// ─────────────────────────────────────────
// 特徴セクション
// ─────────────────────────────────────────

class _FeaturesSection extends StatelessWidget {
  const _FeaturesSection();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    return Container(
      width: double.infinity,
      color: AppColors.sky50,
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 40,
        vertical: isMobile ? 48 : 72,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1000),
          child: SelectionArea(
            child: Column(
            children: [
              Text(
                'Flutter 開発を、もっと身近に。',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: FontWeight.w700,
                  color: AppColors.gray800,
                ),
              ),
              const SizedBox(height: 12),
              const Text(
                'Rubydog JP の講座で、ゼロから実践レベルまで。',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 15, color: AppColors.gray500),
              ),
              const SizedBox(height: 40),
              const Wrap(
                spacing: 16,
                runSpacing: 16,
                alignment: WrapAlignment.center,
                children: [
                  _FeatureCard(
                    icon: Icons.play_circle_outline_rounded,
                    title: '動画で学べる',
                    description: 'YouTube 動画で視覚的に理解。\nコードの書き方を目で見て学ぶ。',
                  ),
                  _FeatureCard(
                    icon: Icons.code_rounded,
                    title: 'コードチャレンジ',
                    description: '重要なコードを実際に入力。\n正解するとライブサンプルが動く。',
                  ),
                  _FeatureCard(
                    icon: Icons.trending_up_rounded,
                    title: '入門から応用まで',
                    description: '基礎ウィジェットから状態管理、\nFirebase 連携まで幅広く。',
                  ),
                ],
              ),
            ],
          ),
          ),
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({
    required this.icon,
    required this.title,
    required this.description,
  });
  final IconData icon;
  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.sky200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: AppColors.sky100,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 24, color: AppColors.sky600),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: const TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w600,
              color: AppColors.gray800,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(
              fontSize: 14,
              height: 1.6,
              color: AppColors.gray500,
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// 講座プレビュー
// ─────────────────────────────────────────

class _LecturePreviewSection extends StatelessWidget {
  const _LecturePreviewSection({
    required this.title,
    required this.subtitle,
    required this.category,
  });
  final String title;
  final String subtitle;
  final LectureCategory category;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;
    final videos = category == LectureCategory.intro ? nomalVideos : specialVideos;
    final basePath = category == LectureCategory.intro ? '/intro' : '/special';
    final previewCount = isMobile ? 4 : 6;
    final preview = videos.take(previewCount).toList();

    int crossAxisCount;
    if (width < Breakpoints.sm) {
      crossAxisCount = 1;
    } else if (width < Breakpoints.md) {
      crossAxisCount = 2;
    } else {
      crossAxisCount = 3;
    }

    return Container(
      width: double.infinity,
      color: Colors.white,
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 40,
        vertical: isMobile ? 48 : 64,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1080),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: TextStyle(
                            fontSize: isMobile ? 22 : 26,
                            fontWeight: FontWeight.w700,
                            color: AppColors.gray800,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          subtitle,
                          style: const TextStyle(
                            fontSize: 14,
                            color: AppColors.gray500,
                          ),
                        ),
                      ],
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.go(basePath),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'すべて見る',
                          style: TextStyle(
                            color: AppColors.sky600,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.arrow_forward_rounded,
                            size: 16, color: AppColors.sky600),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.05,
                ),
                itemCount: preview.length,
                itemBuilder: (context, index) {
                  return VideoCard(
                    video: preview[index],
                    onTap: () => context.go('$basePath/$index'),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// CTA セクション
// ─────────────────────────────────────────

class _CtaSection extends StatelessWidget {
  const _CtaSection();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.sky700, Color(0xFF2D4BA0)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 24 : 40,
        vertical: isMobile ? 48 : 64,
      ),
      child: Center(
        child: Column(
          children: [
            Text(
              'さあ、始めよう。',
              style: TextStyle(
                color: Colors.white,
                fontSize: isMobile ? 24 : 32,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Flutter の世界へ飛び込もう',
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.8),
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 28),
            ElevatedButton(
              onPressed: () => context.go('/intro/0'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: AppColors.sky700,
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              ),
              child: const Text('入門 第1回から始める'),
            ),
          ],
        ),
      ),
    );
  }
}
