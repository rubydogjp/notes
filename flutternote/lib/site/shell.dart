import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutternote/site/theme.dart';
import 'package:flutternote/site/step_progress.dart';
import 'package:flutternote/site/lecture_list_page.dart';
import 'package:flutternote/site/intro_videos.dart';
import 'package:flutternote/site/special_videos.dart';
import 'package:url_launcher/url_launcher.dart';

/// ヘッダー + (StepProgress) + スクロール(child + フッター)
class AppShell extends StatefulWidget {
  const AppShell({super.key, required this.child});
  final Widget child;

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  final _scrollController = ScrollController();

  @override
  void didUpdateWidget(covariant AppShell oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.child != widget.child) {
      _scrollController.jumpTo(0);
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  /// ルートから詳細ページ情報を取得（なければ null）
  _DetailRoute? _parseDetail(String path) {
    final introMatch = RegExp(r'^/intro/(\d+)$').firstMatch(path);
    if (introMatch != null) {
      final index = int.parse(introMatch.group(1)!);
      if (index >= 0 && index < introVideos.length) {
        return _DetailRoute(LectureCategory.intro, index);
      }
    }
    final specialMatch = RegExp(r'^/special/(\d+)$').firstMatch(path);
    if (specialMatch != null) {
      final index = int.parse(specialMatch.group(1)!);
      if (index >= 0 && index < specialVideos.length) {
        return _DetailRoute(LectureCategory.special, index);
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final path = GoRouterState.of(context).uri.path;
    final detail = _parseDetail(path);
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    return Scaffold(
      backgroundColor: AppColors.sky50,
      endDrawer: isMobile ? const _MobileDrawer() : null,
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
            const _Header(),
            // StepProgress（詳細ページ時のみ表示）
            if (detail != null)
              StepProgress(
                category: detail.category,
                currentIndex: detail.index,
              ),
            widget.child,
            const _Footer(),
          ],
        ),
      ),
    );
  }
}

class _DetailRoute {
  const _DetailRoute(this.category, this.index);
  final LectureCategory category;
  final int index;
}

// ─────────────────────────────────────────
// ヘッダー
// ─────────────────────────────────────────

class _Header extends StatelessWidget {
  const _Header();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;
    final currentPath = GoRouterState.of(context).uri.path;

    return Container(
      decoration: BoxDecoration(
        color: AppColors.sky50.withValues(alpha: 0.9),
        border: Border(
          bottom: BorderSide(
            color: AppColors.sky200.withValues(alpha: 0.6),
          ),
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 16 : 40,
        vertical: 12,
      ),
      child: Row(
        children: [
          const _Logo(),
          const SizedBox(width: 8),
          if (!isMobile) ...[
            const Spacer(),
            _NavItem(
              label: 'ホーム',
              path: '/',
              isActive: currentPath == '/',
            ),
            const SizedBox(width: 4),
            _NavItem(
              label: '入門',
              path: '/intro',
              isActive: currentPath.startsWith('/intro'),
            ),
            const SizedBox(width: 4),
            _NavItem(
              label: 'スペシャル',
              path: '/special',
              isActive: currentPath.startsWith('/special'),
            ),
            const SizedBox(width: 24),
            const _ExternalLinkButton(
              label: 'X で質問',
              url: 'https://x.com/rubydogjp',
            ),
          ] else ...[
            const Spacer(),
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(
                  Icons.menu_rounded,
                  color: AppColors.gray600,
                ),
                onPressed: () => Scaffold.of(context).openEndDrawer(),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────
// ロゴ
// ─────────────────────────────────────────

class _Logo extends StatelessWidget {
  const _Logo();

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.go('/'),
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.sky400, AppColors.sky600],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Center(
                child: Text(
                  'F',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 10),
            const Text(
              'Flutter Note',
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w700,
                color: AppColors.gray800,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// ナビアイテム
// ─────────────────────────────────────────

class _NavItem extends StatefulWidget {
  const _NavItem({
    required this.label,
    required this.path,
    required this.isActive,
  });
  final String label;
  final String path;
  final bool isActive;

  @override
  State<_NavItem> createState() => _NavItemState();
}

class _NavItemState extends State<_NavItem> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    final bg = widget.isActive
        ? AppColors.sky100
        : _hovering
            ? AppColors.sky50
            : Colors.transparent;
    final textColor =
        widget.isActive ? AppColors.sky700 : AppColors.gray600;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go(widget.path),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            widget.label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: widget.isActive ? FontWeight.w600 : FontWeight.w500,
              color: textColor,
            ),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// 外部リンクボタン
// ─────────────────────────────────────────

class _ExternalLinkButton extends StatefulWidget {
  const _ExternalLinkButton({required this.label, required this.url});
  final String label;
  final String url;

  @override
  State<_ExternalLinkButton> createState() => _ExternalLinkButtonState();
}

class _ExternalLinkButtonState extends State<_ExternalLinkButton> {
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
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            border: Border.all(
              color: _hovering ? AppColors.sky300 : AppColors.sky200,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.open_in_new_rounded,
                  size: 14, color: AppColors.gray500),
              const SizedBox(width: 6),
              Text(
                widget.label,
                style: const TextStyle(fontSize: 13, color: AppColors.gray500),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────
// モバイルドロワー
// ─────────────────────────────────────────

class _MobileDrawer extends StatelessWidget {
  const _MobileDrawer();

  @override
  Widget build(BuildContext context) {
    final currentPath = GoRouterState.of(context).uri.path;

    return Drawer(
      backgroundColor: Colors.white,
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 16),
          children: [
            // ロゴ
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: _Logo(),
            ),
            const Divider(height: 24),
            _DrawerItem(
              label: 'ホーム',
              icon: Icons.home_rounded,
              path: '/',
              isActive: currentPath == '/',
            ),
            _DrawerItem(
              label: '入門シリーズ',
              icon: Icons.school_rounded,
              path: '/intro',
              isActive: currentPath.startsWith('/intro'),
            ),
            _DrawerItem(
              label: 'スペシャル',
              icon: Icons.auto_awesome_rounded,
              path: '/special',
              isActive: currentPath.startsWith('/special'),
            ),
            const Divider(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                '外部リンク',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppColors.gray400,
                ),
              ),
            ),
            const SizedBox(height: 8),
            _DrawerExternalItem(
              label: 'X (旧Twitter)',
              url: 'https://x.com/rubydogjp',
            ),
            _DrawerExternalItem(
              label: 'GitHub',
              url: 'https://github.com/rubydogjp',
            ),
            _DrawerExternalItem(
              label: 'Git 講座',
              url: 'https://gitnote.rubydog.jp',
            ),
          ],
        ),
      ),
    );
  }
}

class _DrawerItem extends StatelessWidget {
  const _DrawerItem({
    required this.label,
    required this.icon,
    required this.path,
    required this.isActive,
  });
  final String label;
  final IconData icon;
  final String path;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon,
          color: isActive ? AppColors.sky600 : AppColors.gray400, size: 22),
      title: Text(
        label,
        style: TextStyle(
          fontSize: 15,
          fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
          color: isActive ? AppColors.sky700 : AppColors.gray700,
        ),
      ),
      tileColor: isActive ? AppColors.sky100 : null,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
      onTap: () {
        Navigator.of(context).pop();
        context.go(path);
      },
    );
  }
}

class _DrawerExternalItem extends StatelessWidget {
  const _DrawerExternalItem({required this.label, required this.url});
  final String label;
  final String url;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const Icon(Icons.open_in_new_rounded,
          color: AppColors.gray400, size: 18),
      title: Text(
        label,
        style: const TextStyle(fontSize: 14, color: AppColors.gray600),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
      onTap: () {
        Navigator.of(context).pop();
        launchUrl(Uri.parse(url), webOnlyWindowName: '_blank');
      },
    );
  }
}

// ─────────────────────────────────────────
// フッター
// ─────────────────────────────────────────

class _Footer extends StatelessWidget {
  const _Footer();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    final isMobile = width < Breakpoints.md;

    return Container(
      color: AppColors.gray900,
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 24 : 40,
        vertical: 48,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1000),
          child: SelectionArea(
            child: Column(
              children: [
                if (isMobile) _buildMobileFooter(context) else _buildDesktopFooter(context),
                const SizedBox(height: 32),
                const Divider(color: AppColors.gray700),
                const SizedBox(height: 20),
                const Text(
                  '© 2023 Rubydog JP',
                  style: TextStyle(fontSize: 13, color: AppColors.gray500),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopFooter(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Expanded(child: _FooterBrand()),
        Expanded(child: _FooterLinks(context: context)),
        const Expanded(child: _FooterExternal()),
      ],
    );
  }

  Widget _buildMobileFooter(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _FooterBrand(),
        const SizedBox(height: 32),
        _FooterLinks(context: context),
        const SizedBox(height: 32),
        const _FooterExternal(),
      ],
    );
  }
}

class _FooterBrand extends StatelessWidget {
  const _FooterBrand();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.sky400, AppColors.sky600],
                ),
                borderRadius: BorderRadius.circular(6),
              ),
              child: const Center(
                child: Text('F',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.w800)),
              ),
            ),
            const SizedBox(width: 8),
            const Text('Flutter Note',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w700)),
          ],
        ),
        const SizedBox(height: 12),
        const Text(
          '動画とコードで学ぶ\nFlutter 開発',
          style: TextStyle(color: AppColors.gray400, fontSize: 13, height: 1.6),
        ),
      ],
    );
  }
}

class _FooterLinks extends StatelessWidget {
  const _FooterLinks({required this.context});
  final BuildContext context;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('コンテンツ',
            style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600)),
        const SizedBox(height: 12),
        _FooterLinkItem(label: 'ホーム', onTap: () => this.context.go('/')),
        _FooterLinkItem(
            label: '入門', onTap: () => this.context.go('/intro')),
        _FooterLinkItem(
            label: 'スペシャル', onTap: () => this.context.go('/special')),
      ],
    );
  }
}

class _FooterExternal extends StatelessWidget {
  const _FooterExternal();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('リンク',
            style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600)),
        const SizedBox(height: 12),
        _FooterLinkItem(
          label: 'X (旧Twitter)',
          onTap: () => launchUrl(Uri.parse('https://x.com/rubydogjp'),
              webOnlyWindowName: '_blank'),
        ),
        _FooterLinkItem(
          label: 'GitHub',
          onTap: () => launchUrl(Uri.parse('https://github.com/rubydogjp'),
              webOnlyWindowName: '_blank'),
        ),
        _FooterLinkItem(
          label: 'Git 講座',
          onTap: () => launchUrl(
              Uri.parse('https://gitnote.rubydog.jp'),
              webOnlyWindowName: '_blank'),
        ),
      ],
    );
  }
}

class _FooterLinkItem extends StatefulWidget {
  const _FooterLinkItem({required this.label, required this.onTap});
  final String label;
  final VoidCallback onTap;

  @override
  State<_FooterLinkItem> createState() => _FooterLinkItemState();
}

class _FooterLinkItemState extends State<_FooterLinkItem> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Text(
            widget.label,
            style: TextStyle(
              fontSize: 13,
              color: _hovering ? AppColors.sky300 : AppColors.gray400,
            ),
          ),
        ),
      ),
    );
  }
}
