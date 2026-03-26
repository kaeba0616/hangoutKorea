import 'package:flutter_screenutil/flutter_screenutil.dart';

class AppSpacing {
  AppSpacing._();

  // Base spacing (Figma 375px 기준)
  static double get xs => 4.w;
  static double get sm => 8.w;
  static double get md => 12.w;
  static double get lg => 16.w;
  static double get xl => 20.w;
  static double get xxl => 24.w;
  static double get xxxl => 32.w;

  // Screen padding
  static double get screenHorizontal => 16.w;
  static double get screenVertical => 16.h;

  // Component spacing
  static double get buttonHeight => 52.h;
  static double get inputHeight => 48.h;
  static double get appBarHeight => 64.h;

  // Border radius
  static double get radiusSm => 8.r;
  static double get radiusMd => 12.r;
  static double get radiusLg => 16.r;
  static double get radiusFull => 999.r;
}
