import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutternote/site/theme.dart';
import 'package:flutternote/site/video.dart';
import 'package:flutternote/site/video_player.dart';
import 'package:flutternote/site/lecture_list_page.dart';
import 'package:flutternote/site/challenge_data.dart';
import 'package:url_launcher/url_launcher.dart';

/// gitnote の SlideViewer レイアウトを再現した講座詳細ページ
class VideoDetailPage extends StatefulWidget {
  const VideoDetailPage({
    super.key,
    required this.video,
    required this.category,
    required this.currentIndex,
    required this.totalCount,
  });
  final Video video;
  final LectureCategory category;
  final int currentIndex;
  final int totalCount;

  @override
  State<VideoDetailPage> createState() => _VideoDetailPageState();
}

class _VideoDetailPageState extends State<VideoDetailPage> {
  final _answerController = TextEditingController();
  bool _challengeCleared = false;
  bool _showError = false;

  LessonMeta get _lesson {
    final lessons = widget.category == LectureCategory.intro
        ? introLessons
        : specialLessons;
    return lessons[widget.currentIndex] ??
        const LessonMeta(
          description: 'この講座の説明はまだ用意されていません。',
          keyPoints: [],
        );
  }

  @override
  void dispose() {
    _answerController.dispose();
    super.dispose();
  }

  void _checkAnswer() {
    final challenge = _lesson.challenge;
    if (challenge == null) return;
    final userInput = _answerController.text.trim();
    if (userInput == challenge.answer) {
      setState(() {
        _challengeCleared = true;
        _showError = false;
      });
    } else {
      setState(() => _showError = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;
    final isDesktop = width >= Breakpoints.lg;
    final basePath = widget.category.basePath;

    return Container(
      color: AppColors.sky50,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1200),
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: isMobile ? 16 : 24,
              vertical: isMobile ? 16 : 24,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // ─── Visual (左) | Narration (右) ───
                if (isDesktop)
                  IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 3,
                          child: _VisualCard(video: widget.video),
                        ),
                        const SizedBox(width: 24),
                        Expanded(
                          flex: 2,
                          child: SelectionArea(
                            child: _NarrationPanel(lesson: _lesson),
                          ),
                        ),
                      ],
                    ),
                  )
                else ...[
                  _VisualCard(video: widget.video),
                  const SizedBox(height: 20),
                  SelectionArea(
                    child: _NarrationPanel(lesson: _lesson),
                  ),
                ],

                // ─── Action セクション（常時表示）───
                const SizedBox(height: 32),
                _ActionSection(
                  lesson: _lesson,
                  video: widget.video,
                  answerController: _answerController,
                  challengeCleared: _challengeCleared,
                  showError: _showError,
                  onCheck: _checkAnswer,
                ),

                // ─── 次のステップへボタン ───
                const SizedBox(height: 32),
                _NextStepButton(
                  currentIndex: widget.currentIndex,
                  totalCount: widget.totalCount,
                  basePath: basePath,
                  videos: widget.category.videos,
                ),

                // ─── GitHub リンク ───
                if (widget.video.githubUrl != null) ...[
                  const SizedBox(height: 24),
                  _GithubLink(url: widget.video.githubUrl!),
                ],
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// ビジュアルカード（ダーク背景 + YouTube 動画）
// ─────────────────────────────────────────

class _VisualCard extends StatelessWidget {
  const _VisualCard({required this.video});
  final Video video;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.gray950,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppColors.gray700.withValues(alpha: 0.5),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // タイトルバー
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: AppColors.gray900,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(10),
                topRight: Radius.circular(10),
              ),
              border: Border(
                bottom: BorderSide(
                  color: AppColors.gray700.withValues(alpha: 0.5),
                ),
              ),
            ),
            child: Row(
              children: [
                const Icon(Icons.play_circle_filled_rounded,
                    size: 18, color: AppColors.sky400),
                const SizedBox(width: 8),
                Expanded(
                  child: SelectionArea(
                    child: Text(
                      video.title,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: AppColors.gray100,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.gray800,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(
                      color: AppColors.gray700.withValues(alpha: 0.5),
                    ),
                  ),
                  child: const Text(
                    'YouTube',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                      color: AppColors.gray300,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // ビデオプレイヤー
          Padding(
            padding: const EdgeInsets.all(16),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: VideoPlayer(videoId: video.youtubeId),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// ナレーションパネル
// ─────────────────────────────────────────

class _NarrationPanel extends StatelessWidget {
  const _NarrationPanel({required this.lesson});
  final LessonMeta lesson;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isDesktop = width >= Breakpoints.lg;

    return Container(
      padding: isDesktop ? const EdgeInsets.only(left: 24) : EdgeInsets.zero,
      decoration: isDesktop
          ? const BoxDecoration(
              border: Border(
                  left: BorderSide(color: AppColors.gray200, width: 2)),
            )
          : null,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            lesson.description,
            style: const TextStyle(
              fontSize: 14,
              height: 1.8,
              color: AppColors.gray700,
            ),
          ),
          const SizedBox(height: 20),
          if (lesson.keyPoints.isNotEmpty) ...[
            const Text(
              'この講座のキーワード',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppColors.gray800,
              ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                for (final kp in lesson.keyPoints)
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: AppColors.sky100,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      kp,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: AppColors.sky700,
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// Action セクション
// ─────────────────────────────────────────

class _ActionSection extends StatelessWidget {
  const _ActionSection({
    required this.lesson,
    required this.video,
    required this.answerController,
    required this.challengeCleared,
    required this.showError,
    required this.onCheck,
  });
  final LessonMeta lesson;
  final Video video;
  final TextEditingController answerController;
  final bool challengeCleared;
  final bool showError;
  final VoidCallback onCheck;

  @override
  Widget build(BuildContext context) {
    final challenge = lesson.challenge;

    return Container(
      decoration: const BoxDecoration(
        border: Border(
          top: BorderSide(color: AppColors.sky200, width: 2),
        ),
      ),
      padding: const EdgeInsets.only(top: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SelectionArea(
            child: Row(
              children: [
                Text('🎯', style: TextStyle(fontSize: 20)),
                SizedBox(width: 8),
                Text(
                  'やってみよう！',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppColors.sky800,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          if (challenge != null) ...[
            _ChallengeCard(
              challenge: challenge,
              controller: answerController,
              cleared: challengeCleared,
              showError: showError,
              onCheck: onCheck,
            ),
            const SizedBox(height: 20),
            if (challengeCleared)
              _LiveExampleCard(example: video.example)
            else
              const _LockedCard(),
          ] else
            const _NoExampleCard(),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// コードチャレンジカード
// ─────────────────────────────────────────

class _ChallengeCard extends StatelessWidget {
  const _ChallengeCard({
    required this.challenge,
    required this.controller,
    required this.cleared,
    required this.showError,
    required this.onCheck,
  });
  final CodeChallenge challenge;
  final TextEditingController controller;
  final bool cleared;
  final bool showError;
  final VoidCallback onCheck;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.gray300),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 8,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // タイトルバー（ターミナル風）
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: AppColors.gray100,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(11),
                topRight: Radius.circular(11),
              ),
              border:
                  Border(bottom: BorderSide(color: AppColors.gray200)),
            ),
            child: Row(
              children: [
                Container(
                    width: 12,
                    height: 12,
                    decoration: const BoxDecoration(
                        color: Color(0xFFEF4444),
                        shape: BoxShape.circle)),
                const SizedBox(width: 6),
                Container(
                    width: 12,
                    height: 12,
                    decoration: const BoxDecoration(
                        color: Color(0xFFFBBF24),
                        shape: BoxShape.circle)),
                const SizedBox(width: 6),
                Container(
                    width: 12,
                    height: 12,
                    decoration: const BoxDecoration(
                        color: Color(0xFF22C55E),
                        shape: BoxShape.circle)),
                const Spacer(),
                const Text('Code Challenge',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: AppColors.gray500)),
                const Spacer(),
                const SizedBox(width: 54),
              ],
            ),
          ),
          // コードエリア
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            color: AppColors.gray950,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 指示文
                SelectionArea(
                  child: Text(
                    challenge.instruction,
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.gray400,
                      height: 1.5,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // コードテンプレート
                SelectionArea(
                  child: _CodeTemplate(template: challenge.codeTemplate),
                ),
                const SizedBox(height: 20),
                // 入力エリア / クリア表示
                if (!cleared) ...[
                  Row(
                    children: [
                      const Text(
                        '\$ ',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 14,
                          color: Color(0xFF4ADE80),
                        ),
                      ),
                      Expanded(
                        child: TextField(
                          controller: controller,
                          style: const TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 14,
                            color: AppColors.gray100,
                          ),
                          decoration: const InputDecoration(
                            hintText: '答えを入力...',
                            hintStyle: TextStyle(
                              fontFamily: 'monospace',
                              fontSize: 14,
                              color: AppColors.gray600,
                            ),
                            border: InputBorder.none,
                            isDense: true,
                            contentPadding: EdgeInsets.zero,
                          ),
                          onSubmitted: (_) => onCheck(),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      MouseRegion(
                        cursor: SystemMouseCursors.click,
                        child: GestureDetector(
                          onTap: onCheck,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: AppColors.action500,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'チェック',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      if (showError)
                        const Row(
                          children: [
                            Text('❌', style: TextStyle(fontSize: 14)),
                            SizedBox(width: 6),
                            Text(
                              'もう一度やってみよう',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: AppColors.failure500,
                              ),
                            ),
                          ],
                        ),
                    ],
                  ),
                ] else
                  const Row(
                    children: [
                      Text('✅', style: TextStyle(fontSize: 16)),
                      SizedBox(width: 8),
                      Text(
                        '正解！',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: AppColors.success500,
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
          // ヒントエリア
          SelectionArea(
            child: Container(
              width: double.infinity,
              padding:
                  const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              decoration: const BoxDecoration(
                border: Border(top: BorderSide(color: AppColors.gray200)),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(11),
                  bottomRight: Radius.circular(11),
                ),
              ),
              child: Row(
                children: [
                  const Icon(Icons.lightbulb_outline_rounded,
                      size: 14, color: AppColors.amber500),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      'ヒント: ${challenge.hint}',
                      style: const TextStyle(
                          fontSize: 12, color: AppColors.gray500),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// コードテンプレート表示（___ をハイライト）
// ─────────────────────────────────────────

class _CodeTemplate extends StatelessWidget {
  const _CodeTemplate({required this.template});
  final String template;

  @override
  Widget build(BuildContext context) {
    final parts = template.split('___');
    final spans = <InlineSpan>[];

    for (var i = 0; i < parts.length; i++) {
      if (parts[i].isNotEmpty) {
        spans.add(TextSpan(
          text: parts[i],
          style: const TextStyle(
            fontFamily: 'monospace',
            fontSize: 14,
            color: AppColors.gray300,
            height: 1.6,
          ),
        ));
      }
      if (i < parts.length - 1) {
        spans.add(WidgetSpan(
          child: Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            margin: const EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: AppColors.action500.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(4),
              border: Border.all(
                color: AppColors.action500.withValues(alpha: 0.4),
              ),
            ),
            child: const Text(
              '???',
              style: TextStyle(
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: AppColors.action500,
              ),
            ),
          ),
        ));
      }
    }

    return RichText(text: TextSpan(children: spans));
  }
}

// ─────────────────────────────────────────
// ライブサンプルカード（チャレンジクリア後）
// ─────────────────────────────────────────

class _LiveExampleCard extends StatelessWidget {
  const _LiveExampleCard({required this.example});
  final Widget Function() example;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
            color: AppColors.success500.withValues(alpha: 0.5)),
        color: Colors.white,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ヘッダー
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: AppColors.success500.withValues(alpha: 0.05),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(11),
                topRight: Radius.circular(11),
              ),
              border: Border(
                bottom: BorderSide(
                    color: AppColors.success500.withValues(alpha: 0.2)),
              ),
            ),
            child: const Row(
              children: [
                Icon(Icons.check_circle_rounded,
                    size: 18, color: AppColors.success500),
                SizedBox(width: 8),
                Text(
                  'ライブサンプル',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: AppColors.success600,
                  ),
                ),
              ],
            ),
          ),
          // ライブサンプル表示
          Container(
            width: double.infinity,
            constraints: const BoxConstraints(maxHeight: 400),
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(11),
                bottomRight: Radius.circular(11),
              ),
            ),
            clipBehavior: Clip.antiAlias,
            child: example(),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// ロック状態カード
// ─────────────────────────────────────────

class _LockedCard extends StatelessWidget {
  const _LockedCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.gray200),
        color: AppColors.gray50,
      ),
      child: const Column(
        children: [
          Icon(Icons.lock_outline_rounded,
              size: 32, color: AppColors.gray400),
          SizedBox(height: 12),
          Text(
            'コードチャレンジをクリアすると\n完成コードが表示されます',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: AppColors.gray500,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// サンプルなしカード
// ─────────────────────────────────────────

class _NoExampleCard extends StatelessWidget {
  const _NoExampleCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.gray200),
        color: Colors.white,
      ),
      child: const SelectionArea(
        child: Column(
          children: [
            Icon(Icons.videocam_rounded,
                size: 32, color: AppColors.sky400),
            SizedBox(height: 12),
            Text(
              'この講座は動画のみのコンテンツです。\n動画を視聴して学びましょう！',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                color: AppColors.gray500,
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// 次のステップへボタン
// ─────────────────────────────────────────

class _NextStepButton extends StatelessWidget {
  const _NextStepButton({
    required this.currentIndex,
    required this.totalCount,
    required this.basePath,
    required this.videos,
  });
  final int currentIndex;
  final int totalCount;
  final String basePath;
  final List<Video> videos;

  @override
  Widget build(BuildContext context) {
    final hasPrev = currentIndex > 0;
    final hasNext = currentIndex < totalCount - 1;

    return Row(
      children: [
        if (hasPrev)
          Expanded(
            child: _NavButton(
              label: videos[currentIndex - 1].title,
              direction: '前へ',
              icon: Icons.arrow_back_rounded,
              alignment: CrossAxisAlignment.start,
              onTap: () => context.go('$basePath/${currentIndex - 1}'),
            ),
          )
        else
          const Spacer(),
        const SizedBox(width: 16),
        if (hasNext)
          Expanded(
            child: _NavButton(
              label: videos[currentIndex + 1].title,
              direction: '次のステップへ',
              icon: Icons.arrow_forward_rounded,
              alignment: CrossAxisAlignment.end,
              onTap: () => context.go('$basePath/${currentIndex + 1}'),
            ),
          )
        else
          const Spacer(),
      ],
    );
  }
}

class _NavButton extends StatefulWidget {
  const _NavButton({
    required this.label,
    required this.direction,
    required this.icon,
    required this.alignment,
    required this.onTap,
  });
  final String label;
  final String direction;
  final IconData icon;
  final CrossAxisAlignment alignment;
  final VoidCallback onTap;

  @override
  State<_NavButton> createState() => _NavButtonState();
}

class _NavButtonState extends State<_NavButton> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    final isNext = widget.alignment == CrossAxisAlignment.end;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isNext
                ? (_hovering ? AppColors.action600 : AppColors.action500)
                : (_hovering ? AppColors.sky100 : Colors.white),
            borderRadius: BorderRadius.circular(12),
            border: isNext ? null : Border.all(color: AppColors.sky200),
            boxShadow: isNext
                ? [
                    BoxShadow(
                      color: AppColors.action500.withValues(alpha: 0.2),
                      blurRadius: 8,
                    ),
                  ]
                : null,
          ),
          child: Column(
            crossAxisAlignment: widget.alignment,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (!isNext)
                    Icon(widget.icon,
                        size: 14, color: AppColors.sky500),
                  if (!isNext) const SizedBox(width: 4),
                  Text(
                    widget.direction,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isNext
                          ? Colors.white.withValues(alpha: 0.8)
                          : AppColors.sky600,
                    ),
                  ),
                  if (isNext) const SizedBox(width: 4),
                  if (isNext)
                    Icon(widget.icon, size: 14, color: Colors.white),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                widget.label,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: isNext ? Colors.white : AppColors.gray700,
                ),
                textAlign: isNext ? TextAlign.right : TextAlign.left,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// GitHub リンク
// ─────────────────────────────────────────

class _GithubLink extends StatefulWidget {
  const _GithubLink({required this.url});
  final String url;

  @override
  State<_GithubLink> createState() => _GithubLinkState();
}

class _GithubLinkState extends State<_GithubLink> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => launchUrl(
          Uri.parse(widget.url),
          webOnlyWindowName: '_blank',
        ),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: _hovering ? AppColors.gray100 : Colors.white,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: AppColors.sky200),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Image.asset(
                'assets/images/github.png',
                width: 20,
                height: 20,
                color: AppColors.gray600,
              ),
              const SizedBox(width: 10),
              const Text(
                'ソースコードを見る',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppColors.gray700,
                ),
              ),
              const SizedBox(width: 6),
              const Icon(Icons.open_in_new_rounded,
                  size: 14, color: AppColors.gray500),
            ],
          ),
        ),
      ),
    );
  }
}
