import 'package:flutter/material.dart';

/// Flutter Note カラーパレット (Sky Blue)
class AppColors {
  static const sky50 = Color(0xFFF0F9FF);
  static const sky100 = Color(0xFFE0F2FE);
  static const sky200 = Color(0xFFBAE6FD);
  static const sky300 = Color(0xFF7DD3FC);
  static const sky400 = Color(0xFF38BDF8);
  static const sky500 = Color(0xFF0EA5E9);
  static const sky600 = Color(0xFF0284C7);
  static const sky700 = Color(0xFF0369A1);
  static const sky800 = Color(0xFF075985);
  static const sky900 = Color(0xFF0C4A6E);

  static const gray50 = Color(0xFFF8FAFC);
  static const gray100 = Color(0xFFF1F5F9);
  static const gray200 = Color(0xFFE2E8F0);
  static const gray300 = Color(0xFFCBD5E1);
  static const gray400 = Color(0xFF94A3B8);
  static const gray500 = Color(0xFF64748B);
  static const gray600 = Color(0xFF475569);
  static const gray700 = Color(0xFF334155);
  static const gray800 = Color(0xFF1E293B);
  static const gray900 = Color(0xFF0F172A);
  static const gray950 = Color(0xFF020617);

  // Action (blue)
  static const action500 = Color(0xFF3B82F6);
  static const action600 = Color(0xFF2563EB);
  static const action700 = Color(0xFF1D4ED8);

  // Success (green)
  static const success500 = Color(0xFF22C55E);
  static const success600 = Color(0xFF16A34A);

  // Failure (red)
  static const failure500 = Color(0xFFEF4444);

  // Accent
  static const amber500 = Color(0xFFF59E0B);
  static const amber200 = Color(0xFFFDE68A);
  static const amber800 = Color(0xFF92400E);
  static const indigo500 = Color(0xFF6366F1);
  static const indigo600 = Color(0xFF4F46E5);
}

class Breakpoints {
  static const double sm = 640;
  static const double md = 768;
  static const double lg = 1024;
  static const double xl = 1280;
}

ThemeData buildLightTheme() {
  return ThemeData(
    useMaterial3: true,
    fontFamily: 'NotoSansJP',
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.sky50,
    colorScheme: const ColorScheme.light(
      primary: AppColors.sky500,
      onPrimary: Colors.white,
      primaryContainer: AppColors.sky100,
      onPrimaryContainer: AppColors.sky900,
      secondary: AppColors.sky300,
      onSecondary: AppColors.sky900,
      surface: Colors.white,
      onSurface: AppColors.gray900,
      surfaceContainerHighest: AppColors.gray100,
      outline: AppColors.sky200,
      error: AppColors.failure500,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      scrolledUnderElevation: 0,
    ),
    cardTheme: CardThemeData(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: AppColors.sky200, width: 1),
      ),
      color: Colors.white,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.sky500,
        foregroundColor: Colors.white,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: const TextStyle(
          fontFamily: 'NotoSansJP',
          fontSize: 15,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: const BorderSide(color: Colors.white70, width: 1.5),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: const TextStyle(
          fontFamily: 'NotoSansJP',
          fontSize: 15,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.sky200,
      thickness: 1,
    ),
  );
}
