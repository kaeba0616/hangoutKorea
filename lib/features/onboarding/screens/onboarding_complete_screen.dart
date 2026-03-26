import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import '../../../shared/widgets/hangko_button.dart';

/// Figma: onboarding/complete
/// - "환영합니다. 이제 친구를 찾아볼까요?" 큰 타이틀 (중앙)
/// - 폭죽/축하 이미지
/// - "매칭 하러 가기" 버튼 (그라데이션)
class OnboardingCompleteScreen extends StatelessWidget {
  const OnboardingCompleteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 80.h),
            // 타이틀
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 32.w),
              child: Text(
                '환영합니다.\n이제 친구를 찾아볼까요?',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 26.sp,
                  fontWeight: FontWeight.w800,
                  color: const Color(0xFF1A1A1A),
                  height: 1.35,
                ),
              ),
            ),
            const Spacer(),
            // 축하 이미지 placeholder (폭죽)
            SizedBox(
              width: 200.w,
              height: 200.h,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // 폭죽 이모지 placeholder
                  Text(
                    '🎉',
                    style: TextStyle(fontSize: 100.sp),
                  ),
                ],
              ),
            ),
            const Spacer(),
            HangkoBottomButton(
              label: '매칭 하러 가기',
              onPressed: () => context.go('/profile/me'),
            ),
            SizedBox(height: MediaQuery.of(context).padding.bottom + 10.h),
          ],
        ),
      ),
    );
  }
}
