import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

/// Figma: chip (language tag with delete icon)
class HangkoChip extends StatelessWidget {
  final String label;
  final VoidCallback? onDelete;
  final bool selected;

  const HangkoChip({
    super.key,
    required this.label,
    this.onDelete,
    this.selected = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36.h,
      padding: EdgeInsets.symmetric(horizontal: 12.w),
      decoration: BoxDecoration(
        color: selected ? const Color(0xFF1A1A1A) : const Color(0xFFF3F4F6),
        borderRadius: BorderRadius.circular(18.r),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w500,
              color: selected ? Colors.white : const Color(0xFF374151),
            ),
          ),
          if (onDelete != null) ...[
            SizedBox(width: 4.w),
            GestureDetector(
              onTap: onDelete,
              child: Icon(
                Icons.close,
                size: 16.r,
                color: selected ? Colors.white70 : const Color(0xFF9CA3AF),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Figma: LanguageLevel chip (언어 + 숙련도 표시)
class LanguageLevelChip extends StatelessWidget {
  final String language;
  final String level;

  const LanguageLevelChip({
    super.key,
    required this.language,
    required this.level,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 34.h,
      padding: EdgeInsets.symmetric(horizontal: 12.w),
      decoration: BoxDecoration(
        color: const Color(0xFFF3F4F6),
        borderRadius: BorderRadius.circular(17.r),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            language,
            style: TextStyle(
              fontSize: 13.sp,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF374151),
            ),
          ),
          SizedBox(width: 6.w),
          Text(
            level,
            style: TextStyle(
              fontSize: 13.sp,
              fontWeight: FontWeight.w400,
              color: const Color(0xFF9CA3AF),
            ),
          ),
        ],
      ),
    );
  }
}
