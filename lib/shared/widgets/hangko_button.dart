import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

enum HangkoButtonType { primary, secondary, text, sns }

/// Figma 그라데이션 버튼 (초록 → 노랑)
class HangkoButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final HangkoButtonType type;
  final Widget? icon;
  final Color? backgroundColor;

  const HangkoButton({
    super.key,
    required this.label,
    this.onPressed,
    this.type = HangkoButtonType.primary,
    this.icon,
    this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case HangkoButtonType.primary:
        return _GradientButton(
          label: label,
          onPressed: onPressed,
        );
      case HangkoButtonType.secondary:
        return SizedBox(
          width: 319.w,
          height: 52.h,
          child: OutlinedButton(
            onPressed: onPressed,
            style: OutlinedButton.styleFrom(
              foregroundColor: const Color(0xFF1A1A1A),
              side: const BorderSide(color: Color(0xFFE5E7EB)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(26.r),
              ),
              textStyle: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
            child: Text(label),
          ),
        );
      case HangkoButtonType.text:
        return TextButton(
          onPressed: onPressed,
          style: TextButton.styleFrom(
            foregroundColor: const Color(0xFF4CAF50),
            textStyle: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
          child: Text(label),
        );
      case HangkoButtonType.sns:
        return SizedBox(
          width: 319.w,
          height: 52.h,
          child: ElevatedButton(
            onPressed: onPressed,
            style: ElevatedButton.styleFrom(
              backgroundColor: backgroundColor ?? Colors.white,
              foregroundColor: backgroundColor == null
                  ? const Color(0xFF1A1A1A)
                  : backgroundColor == const Color(0xFFFEE500)
                      ? const Color(0xFF3C1E1E)
                      : Colors.white,
              elevation: 0,
              side: backgroundColor == null
                  ? const BorderSide(color: Color(0xFFE5E7EB))
                  : BorderSide.none,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(26.r),
              ),
              textStyle: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                if (icon != null) ...[
                  icon!,
                  SizedBox(width: 8.w),
                ],
                Text(label),
              ],
            ),
          ),
        );
    }
  }
}

/// 그라데이션 버튼 (초록 → 노랑) - Figma 디자인
class _GradientButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;

  const _GradientButton({
    required this.label,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final enabled = onPressed != null;
    return SizedBox(
      width: 319.w,
      height: 52.h,
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: enabled
              ? const LinearGradient(
                  colors: [Color(0xFF4CAF50), Color(0xFF8BC34A), Color(0xFFCDDC39)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                )
              : null,
          color: enabled ? null : const Color(0xFFE5E7EB),
          borderRadius: BorderRadius.circular(26.r),
        ),
        child: MaterialButton(
          onPressed: onPressed,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(26.r),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: enabled ? Colors.white : const Color(0xFF9CA3AF),
            ),
          ),
        ),
      ),
    );
  }
}

/// 화면 하단 고정 버튼 영역 (Figma: Button-Fixed-Bottom)
class HangkoBottomButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;

  const HangkoBottomButton({
    super.key,
    required this.label,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        left: 28.w,
        right: 28.w,
        top: 16.h,
        bottom: 16.h,
      ),
      child: HangkoButton(
        label: label,
        onPressed: onPressed,
      ),
    );
  }
}
