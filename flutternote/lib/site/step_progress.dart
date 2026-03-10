import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutternote/site/theme.dart';
import 'package:flutternote/site/video.dart';
import 'package:flutternote/site/lecture_list_page.dart';

/// gitnote の StepProgress を再現したプログレスバー
class StepProgress extends StatelessWidget {
  const StepProgress({
    super.key,
    required this.category,
    required this.currentIndex,
  });
  final LectureCategory category;
  final int currentIndex;

  static const _maxVisible = 7;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;
    final videos = category.videos;
    final total = videos.length;
    final current = videos[currentIndex];

    // Windowed dots
    final half = _maxVisible ~/ 2;
    var start = currentIndex - half;
    var end = start + _maxVisible;
    if (start < 0) {
      start = 0;
      end = min(_maxVisible, total);
    }
    if (end > total) {
      end = total;
      start = max(0, total - _maxVisible);
    }
    final visibleRange = List.generate(end - start, (i) => start + i);
    final hasOverflowLeft = start > 0;
    final hasOverflowRight = end < total;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.95),
        border: const Border(
          bottom: BorderSide(
            color: AppColors.sky200,
            width: 0.5,
          ),
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 12 : 24,
        vertical: 10,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1200),
          child: Row(
            children: [
              // 左: ステップタイトル
              Expanded(
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.sky100,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        'PART ${currentIndex + 1}',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: AppColors.sky600,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    if (!isMobile)
                      Flexible(
                        child: Text(
                          current.title,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: AppColors.gray800,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                  ],
                ),
              ),
              // 中央: ドット
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (hasOverflowLeft)
                    Container(
                      width: isMobile ? 16 : 32,
                      height: 2,
                      margin: const EdgeInsets.only(right: 4),
                      decoration: BoxDecoration(
                        color: AppColors.sky300,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                  for (var i = 0; i < visibleRange.length; i++) ...[
                    _Dot(
                      index: visibleRange[i],
                      isActive: visibleRange[i] == currentIndex,
                      isDone: visibleRange[i] < currentIndex,
                      basePath: category.basePath,
                      isMobile: isMobile,
                      video: videos[visibleRange[i]],
                    ),
                    if (i < visibleRange.length - 1)
                      Container(
                        width: isMobile ? 8 : 16,
                        height: 2,
                        margin: const EdgeInsets.symmetric(horizontal: 1),
                        decoration: BoxDecoration(
                          color: visibleRange[i] < currentIndex
                              ? AppColors.success500
                              : AppColors.gray200,
                          borderRadius: BorderRadius.circular(1),
                        ),
                      ),
                  ],
                  if (hasOverflowRight)
                    Container(
                      width: isMobile ? 16 : 32,
                      height: 2,
                      margin: const EdgeInsets.only(left: 4),
                      decoration: BoxDecoration(
                        color: AppColors.gray200,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Dot extends StatefulWidget {
  const _Dot({
    required this.index,
    required this.isActive,
    required this.isDone,
    required this.basePath,
    required this.isMobile,
    required this.video,
  });
  final int index;
  final bool isActive;
  final bool isDone;
  final String basePath;
  final bool isMobile;
  final Video video;

  @override
  State<_Dot> createState() => _DotState();
}

class _DotState extends State<_Dot> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    final size = widget.isMobile ? 24.0 : 28.0;
    final fontSize = widget.isMobile ? 10.0 : 11.0;

    Color bg;
    Color fg;
    if (widget.isActive) {
      bg = AppColors.action500;
      fg = Colors.white;
    } else if (widget.isDone) {
      bg = AppColors.success500;
      fg = Colors.white;
    } else {
      bg = AppColors.gray100;
      fg = AppColors.gray400;
    }

    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go('${widget.basePath}/${widget.index}'),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              width: size,
              height: size,
              decoration: BoxDecoration(
                color: bg,
                shape: BoxShape.circle,
                boxShadow: widget.isActive
                    ? [
                        BoxShadow(
                          color: AppColors.action500.withValues(alpha: 0.4),
                          blurRadius: 8,
                          spreadRadius: 1,
                        ),
                      ]
                    : null,
              ),
              child: Center(
                child: widget.isDone
                    ? const Icon(Icons.check_rounded,
                        size: 14, color: Colors.white)
                    : Text(
                        '${widget.index + 1}',
                        style: TextStyle(
                          fontSize: fontSize,
                          fontWeight: FontWeight.w700,
                          color: fg,
                        ),
                      ),
              ),
            ),
            // ツールチップ
            if (_hovering && !widget.isMobile)
              Positioned(
                top: size + 6,
                left: size / 2,
                child: FractionalTranslation(
                  translation: const Offset(-0.5, 0),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.gray900,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.15),
                          blurRadius: 8,
                        ),
                      ],
                    ),
                    child: Text(
                      widget.video.title,
                      style: const TextStyle(
                        fontSize: 11,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
