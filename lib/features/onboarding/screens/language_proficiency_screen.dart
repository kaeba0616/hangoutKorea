import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/profile/language/proficiency (3610:3748)
/// - AppBar "사용 언어"
/// - "언어 숙련도를 선택하세요" heading
/// - Language groups with 4 Radio / Control each
///   텍스트 왼쪽, 라디오 오른쪽
///   서툴러요 / 간단한 소통 OK / 잘해요 / 원어민이에요
/// - "선택 완료" 버튼
class LanguageProficiencyScreen extends StatefulWidget {
  const LanguageProficiencyScreen({super.key});

  @override
  State<LanguageProficiencyScreen> createState() =>
      _LanguageProficiencyScreenState();
}

class _LanguageProficiencyScreenState extends State<LanguageProficiencyScreen> {
  final Map<String, String?> _selectedLevels = {
    '한국어': null,
    '영어': null,
  };

  final _levels = ['서툴러요', '간단한 소통 OK', '잘해요', '원어민이에요'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const HangkoAppBar(title: '사용 언어'),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 32.h),
                  Text(
                    '언어 숙련도를 선택하세요',
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 32.h),
                  ..._selectedLevels.keys.map((lang) =>
                      _buildLanguageGroup(lang)),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '선택 완료',
            onPressed: () => context.go('/onboarding/nationality'),
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }

  Widget _buildLanguageGroup(String language) {
    return Padding(
      padding: EdgeInsets.only(bottom: 32.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            language,
            style: TextStyle(
              fontSize: 15.sp,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF1A1A1A),
            ),
          ),
          SizedBox(height: 16.h),
          ..._levels.map((level) => _buildRadioItem(language, level)),
        ],
      ),
    );
  }

  Widget _buildRadioItem(String language, String level) {
    final isSelected = _selectedLevels[language] == level;
    return InkWell(
      onTap: () => setState(() => _selectedLevels[language] = level),
      child: Container(
        width: 343.w,
        height: 48.h,
        margin: EdgeInsets.only(bottom: 8.h),
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        decoration: BoxDecoration(
          color: isSelected
              ? const Color(0xFFFFFDE7)
              : const Color(0xFFF9FAFB),
          borderRadius: BorderRadius.circular(10.r),
          border: Border.all(
            color: isSelected
                ? const Color(0xFF4CAF50)
                : const Color(0xFFE5E7EB),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                level,
                style: TextStyle(
                  fontSize: 15.sp,
                  fontWeight:
                      isSelected ? FontWeight.w600 : FontWeight.w400,
                  color: const Color(0xFF1A1A1A),
                ),
              ),
            ),
            // 라디오 오른쪽
            Container(
              width: 22.r,
              height: 22.r,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected
                      ? const Color(0xFF4CAF50)
                      : const Color(0xFFD1D5DB),
                  width: isSelected ? 6 : 2,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
