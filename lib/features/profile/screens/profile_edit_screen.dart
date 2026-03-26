import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../shared/widgets/hangko_app_bar.dart';
import '../../../shared/widgets/hangko_avatar.dart';
import '../../../shared/widgets/hangko_text_field.dart';

/// Figma: profile/edit (3007:4724)
/// - AppBar with save action
/// - Profile image (96x96) + edit button
/// - Username + email
/// - Form: InputField, InputField, InputField, SelectBox, RadioField, InputField, TextareaField
class ProfileEditScreen extends StatelessWidget {
  const ProfileEditScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HangkoAppBar(
        title: '프로필 편집',
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              '저장',
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w600,
                color: const Color(0xFF1A1A1A),
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 32.h),
        child: Column(
          children: [
            // Profile image
            const HangkoAvatar.large(),
            SizedBox(height: 16.h),
            Text(
              '행아코',
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w500,
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
            SizedBox(height: 32.h),

            // Form fields (same as profile setup)
            const HangkoTextField(label: '이름', hintText: '행아코'),
            SizedBox(height: 16.h),
            const HangkoTextField(label: '닉네임', hintText: 'hangko_user'),
            SizedBox(height: 16.h),
            const HangkoTextField(
              label: '생년월일',
              hintText: '2001.01.15',
              keyboardType: TextInputType.datetime,
            ),
            SizedBox(height: 16.h),
            const HangkoSelectBox(label: '국적', value: '🇺🇸 미국'),
            SizedBox(height: 16.h),
            const HangkoSelectBox(label: '성별', value: 'Female'),
            SizedBox(height: 16.h),
            const HangkoTextField(
              label: '연락처',
              hintText: '010-1234-5678',
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 16.h),
            const HangkoTextArea(
              label: '자기소개',
              hintText: '안녕하세요! 한국에서 새로운 친구를 만들고 싶어요.',
            ),
            SizedBox(height: 40.h),
          ],
        ),
      ),
    );
  }
}
