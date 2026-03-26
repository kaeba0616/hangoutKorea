import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_text_field.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/profile
/// - AppBar "프로필 작성" + 더보기 아이콘
/// - 프로필 이미지 (녹색 테두리)
/// - "프로필을 작성해 주세요" + email
/// - 이메일(읽기전용), 이름, 사용 가능한 언어(선택), 생년월일(일/월/년),
///   성별(라디오), 국적(선택), 자기소개(텍스트에어리어 0/500)
/// - "완료" 버튼
class ProfileSetupScreen extends StatelessWidget {
  const ProfileSetupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: HangkoAppBar(
        title: '프로필 작성',
        actions: [
          IconButton(
            icon: const Icon(Icons.more_vert),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.w),
              child: Column(
                children: [
                  SizedBox(height: 24.h),
                  // 프로필 이미지 (녹색 원)
                  Container(
                    width: 96.r,
                    height: 96.r,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: const Color(0xFFE8F5E9),
                      border: Border.all(
                          color: const Color(0xFF4CAF50).withValues(alpha: 0.3),
                          width: 2),
                    ),
                    child: Stack(
                      children: [
                        Center(
                          child: Icon(Icons.person,
                              size: 48.r, color: const Color(0xFF81C784)),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            width: 32.r,
                            height: 32.r,
                            decoration: BoxDecoration(
                              color: const Color(0xFF4CAF50),
                              shape: BoxShape.circle,
                              border:
                                  Border.all(color: Colors.white, width: 2),
                            ),
                            child: Icon(Icons.camera_alt,
                                size: 16.r, color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 16.h),
                  Text(
                    '프로필을 작성해 주세요',
                    style: TextStyle(
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF1A1A1A),
                    ),
                  ),
                  SizedBox(height: 4.h),
                  Text(
                    'userid@gmail.com',
                    style: TextStyle(
                      fontSize: 13.sp,
                      color: const Color(0xFF9CA3AF),
                    ),
                  ),
                  SizedBox(height: 28.h),

                  // 이메일 (읽기전용)
                  const HangkoTextField(
                    label: '이메일',
                    hintText: 'userid@gmail.com',
                    readOnly: true,
                  ),
                  SizedBox(height: 16.h),

                  // 이름
                  const HangkoTextField(
                    label: '이름',
                    hintText: '이름을 입력하세요',
                  ),
                  SizedBox(height: 8.h),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      '본인인증을 진행하면 본명으로 변경됩니다',
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: const Color(0xFF9CA3AF),
                      ),
                    ),
                  ),
                  SizedBox(height: 16.h),

                  // 사용 가능한 언어
                  const HangkoSelectBox(
                    label: '사용 가능한 언어',
                    value: '한국어, 영어, 일본어 외 1개',
                  ),
                  SizedBox(height: 16.h),

                  // 생년월일 (일/월/년 드롭다운)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '생년월일',
                        style: TextStyle(
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w500,
                          color: const Color(0xFF6B7280),
                        ),
                      ),
                      SizedBox(height: 8.h),
                      Row(
                        children: [
                          _buildDropdown('일'),
                          SizedBox(width: 12.w),
                          _buildDropdown('월'),
                          SizedBox(width: 12.w),
                          _buildDropdown('년'),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 16.h),

                  // 성별 (라디오)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '성별',
                        style: TextStyle(
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w500,
                          color: const Color(0xFF6B7280),
                        ),
                      ),
                      SizedBox(height: 8.h),
                      Row(
                        children: [
                          _buildGenderRadio('남성', true),
                          SizedBox(width: 24.w),
                          _buildGenderRadio('여성', false),
                          SizedBox(width: 24.w),
                          _buildGenderRadio('기타', false),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 16.h),

                  // 국적
                  const HangkoSelectBox(
                    label: '국적',
                    value: '국적을 선택하세요',
                  ),
                  SizedBox(height: 16.h),

                  // 자기소개
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '자기소개',
                        style: TextStyle(
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w500,
                          color: const Color(0xFF6B7280),
                        ),
                      ),
                      SizedBox(height: 8.h),
                      TextField(
                        maxLines: 4,
                        maxLength: 500,
                        decoration: InputDecoration(
                          hintText: '나를 잘 나타낼 수 있는 소개말을 작성해 보세요',
                          hintStyle: TextStyle(
                            fontSize: 14.sp,
                            color: const Color(0xFF9CA3AF),
                          ),
                          filled: true,
                          fillColor: const Color(0xFFF9FAFB),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.r),
                            borderSide:
                                const BorderSide(color: Color(0xFFE5E7EB)),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.r),
                            borderSide:
                                const BorderSide(color: Color(0xFFE5E7EB)),
                          ),
                          counterStyle: TextStyle(
                            fontSize: 12.sp,
                            color: const Color(0xFF9CA3AF),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16.h),
                ],
              ),
            ),
          ),
          HangkoBottomButton(
            label: '완료',
            onPressed: () => context.go('/onboarding/language'),
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom),
        ],
      ),
    );
  }

  Widget _buildDropdown(String hint) {
    return Expanded(
      child: Container(
        height: 48.h,
        padding: EdgeInsets.symmetric(horizontal: 12.w),
        decoration: BoxDecoration(
          color: const Color(0xFFF9FAFB),
          borderRadius: BorderRadius.circular(10.r),
          border: Border.all(color: const Color(0xFFE5E7EB)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              hint,
              style: TextStyle(
                fontSize: 14.sp,
                color: const Color(0xFF9CA3AF),
              ),
            ),
            Icon(Icons.keyboard_arrow_down,
                size: 20.r, color: const Color(0xFF9CA3AF)),
          ],
        ),
      ),
    );
  }

  Widget _buildGenderRadio(String label, bool selected) {
    return Row(
      children: [
        Container(
          width: 20.r,
          height: 20.r,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: selected
                  ? const Color(0xFF4CAF50)
                  : const Color(0xFFD1D5DB),
              width: selected ? 6 : 2,
            ),
          ),
        ),
        SizedBox(width: 8.w),
        Text(
          label,
          style: TextStyle(
            fontSize: 14.sp,
            color: const Color(0xFF1A1A1A),
          ),
        ),
      ],
    );
  }
}
