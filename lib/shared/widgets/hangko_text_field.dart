import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

/// Figma: Form / InputField (343x72)
class HangkoTextField extends StatelessWidget {
  final String label;
  final String? hintText;
  final String? errorText;
  final bool obscureText;
  final TextEditingController? controller;
  final int maxLines;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final bool readOnly;
  final VoidCallback? onTap;

  const HangkoTextField({
    super.key,
    required this.label,
    this.hintText,
    this.errorText,
    this.obscureText = false,
    this.controller,
    this.maxLines = 1,
    this.keyboardType,
    this.onChanged,
    this.readOnly = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 343.w,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 13.sp,
              fontWeight: FontWeight.w500,
              color: const Color(0xFF6B7280),
            ),
          ),
          SizedBox(height: 8.h),
          TextField(
            controller: controller,
            obscureText: obscureText,
            maxLines: maxLines,
            keyboardType: keyboardType,
            onChanged: onChanged,
            readOnly: readOnly,
            onTap: onTap,
            decoration: InputDecoration(
              hintText: hintText,
              errorText: errorText,
              hintStyle: TextStyle(
                fontSize: 15.sp,
                color: const Color(0xFF9CA3AF),
              ),
              contentPadding: EdgeInsets.symmetric(
                horizontal: 16.w,
                vertical: 14.h,
              ),
              filled: true,
              fillColor: const Color(0xFFF9FAFB),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.r),
                borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.r),
                borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.r),
                borderSide: const BorderSide(color: Color(0xFF1A1A1A), width: 1.5),
              ),
              errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.r),
                borderSide: const BorderSide(color: Color(0xFFEF4444)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Figma: Form / TextareaField (343x128)
class HangkoTextArea extends StatelessWidget {
  final String label;
  final String? hintText;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;

  const HangkoTextArea({
    super.key,
    required this.label,
    this.hintText,
    this.controller,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return HangkoTextField(
      label: label,
      hintText: hintText,
      controller: controller,
      maxLines: 4,
      onChanged: onChanged,
    );
  }
}

/// Figma: Form / SelectBox (343x72)
class HangkoSelectBox extends StatelessWidget {
  final String label;
  final String? value;
  final VoidCallback? onTap;

  const HangkoSelectBox({
    super.key,
    required this.label,
    this.value,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return HangkoTextField(
      label: label,
      hintText: value ?? '선택하세요',
      readOnly: true,
      onTap: onTap,
    );
  }
}
