import 'package:flutter/material.dart';
import 'package:banana/hello_rubydog/theme.dart';

/// シマーアニメーション付きプレースホルダー
class ShimmerBox extends StatefulWidget {
  const ShimmerBox({
    super.key,
    this.width,
    this.height,
    this.borderRadius = BorderRadius.zero,
  });
  final double? width;
  final double? height;
  final BorderRadius borderRadius;

  @override
  State<ShimmerBox> createState() => _ShimmerBoxState();
}

class _ShimmerBoxState extends State<ShimmerBox>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final v = _controller.value;
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: widget.borderRadius,
            gradient: LinearGradient(
              begin: Alignment(-1.0 + 2.0 * v, 0),
              end: Alignment(-0.5 + 2.0 * v, 0),
              colors: const [
                AppColors.gray200,
                AppColors.gray100,
                AppColors.gray200,
              ],
            ),
          ),
        );
      },
    );
  }
}

/// 画像をシマー付きで表示（ロード完了後フェードイン）
class ImageWithShimmer extends StatelessWidget {
  const ImageWithShimmer({
    super.key,
    required this.path,
    this.fit = BoxFit.cover,
    this.borderRadius = BorderRadius.zero,
  });
  final String path;
  final BoxFit fit;
  final BorderRadius borderRadius;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: Image.asset(
        path,
        fit: fit,
        frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
          if (wasSynchronouslyLoaded || frame != null) {
            return AnimatedOpacity(
              opacity: 1.0,
              duration: const Duration(milliseconds: 300),
              child: child,
            );
          }
          return ShimmerBox(borderRadius: borderRadius);
        },
        errorBuilder: (context, error, stack) {
          return Container(
            color: AppColors.gray100,
            child: const Center(
              child: Icon(Icons.image_not_supported_outlined,
                  color: AppColors.gray400),
            ),
          );
        },
      ),
    );
  }
}
