import 'package:flutter/material.dart';
import 'package:banana/hello_rubydog/theme.dart';
import 'package:banana/hello_rubydog/video.dart';
import 'package:banana/hello_rubydog/shimmer.dart';

/// ビデオカード — 講座一覧・プレビューで使用（シマー付き）
class VideoCard extends StatefulWidget {
  const VideoCard({
    super.key,
    required this.video,
    required this.onTap,
  });
  final Video video;
  final VoidCallback onTap;

  @override
  State<VideoCard> createState() => _VideoCardState();
}

class _VideoCardState extends State<VideoCard> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: _hovering ? AppColors.sky300 : AppColors.sky200,
            ),
            boxShadow: _hovering
                ? [
                    BoxShadow(
                      color: AppColors.sky300.withValues(alpha: 0.2),
                      blurRadius: 16,
                      offset: const Offset(0, 4),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.04),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // サムネイル（シマー付き）
              ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(11),
                  topRight: Radius.circular(11),
                ),
                child: AspectRatio(
                  aspectRatio: 16.0 / 9.0,
                  child: AnimatedScale(
                    scale: _hovering ? 1.03 : 1.0,
                    duration: const Duration(milliseconds: 200),
                    child: ImageWithShimmer(
                      path: 'assets/images/${widget.video.thumb}',
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(11),
                        topRight: Radius.circular(11),
                      ),
                    ),
                  ),
                ),
              ),
              // タイトル + チップ
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.video.title,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.gray800,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 8),
                      Expanded(
                        child: SingleChildScrollView(
                          child: Wrap(
                            spacing: 4,
                            runSpacing: 4,
                            children: [
                              for (final w in widget.video.widgets)
                                _MiniChip(
                                  label: w,
                                  bgColor: AppColors.sky100,
                                  textColor: AppColors.sky700,
                                ),
                              for (final t in widget.video.tags)
                                _MiniChip(
                                  label: t,
                                  bgColor: const Color(0xFFFEF3C7),
                                  textColor: AppColors.amber800,
                                ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MiniChip extends StatelessWidget {
  const _MiniChip({
    required this.label,
    required this.bgColor,
    required this.textColor,
  });
  final String label;
  final Color bgColor;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w500,
          color: textColor,
        ),
      ),
    );
  }
}
